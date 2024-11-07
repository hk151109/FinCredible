import numpy as np
import pandas as pd
from tensorflow.keras.layers import Dense, Activation, Dropout, LSTM
from tensorflow.keras.models import Sequential
import time
import datetime as dt
import urllib.request
import json
import os
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error


class LSTM_Model:

    @classmethod
    def LSTM_Pred(cls, tick):
        data_source = 'alphavantage'
        api_key = 'CWKNMTWH5XQK533C'  # Replace with your Alpha Vantage API key

        if data_source == 'alphavantage':
            # Load data from Alpha Vantage
            ticker = tick
            url_string = f"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={ticker}&outputsize=full&apikey={api_key}"
            file_to_save = f'stock_market_data-{ticker}.csv'

            if not os.path.exists(file_to_save):
                with urllib.request.urlopen(url_string) as url:
                    data = json.loads(url.read().decode())
                    data = data.get('Time Series (Daily)', {})
                    df = pd.DataFrame([
                        [dt.datetime.strptime(k, '%Y-%m-%d').date(), float(v['3. low']), float(v['2. high']),
                         float(v['4. close']), float(v['1. open'])]
                        for k, v in data.items()
                    ], columns=['Date', 'Low', 'High', 'Close', 'Open'])
                df.to_csv(file_to_save, index=False)
                print(f'Data saved to : {file_to_save}')
            else:
                print('File already exists. Loading data from CSV')
                df = pd.read_csv(file_to_save)

        # Data processing
        df = df[['Open', 'Close', 'Low', 'High']]
        df['Mid Prices'] = (df['High'] + df['Low']) / 2.0
        df_values = MinMaxScaler().fit_transform(df.values)

        # Build LSTM model
        def build_model():
            model = Sequential([
                LSTM(50, return_sequences=True, input_shape=(None, 5)),
                Dropout(0.2),
                LSTM(100, return_sequences=False),
                Dropout(0.2),
                Dense(1, activation='linear')
            ])
            model.compile(loss='mse', optimizer='rmsprop')
            return model

        # Prepare data for LSTM
        def load_data(stock, seq_len=5):
            data = np.array([stock[i:i + seq_len + 1] for i in range(len(stock) - seq_len - 1)])
            train_size = int(0.75 * data.shape[0])
            x_train, y_train = data[:train_size, :-1], data[:train_size, -1][:, -1]
            x_test, y_test = data[train_size:, :-1], data[train_size:, -1][:, -1]
            return np.reshape(x_train, (x_train.shape[0], x_train.shape[1], stock.shape[1])), y_train, \
                   np.reshape(x_test, (x_test.shape[0], x_test.shape[1], stock.shape[1])), y_test

        X_train, y_train, X_test, y_test = load_data(df_values)
        model = build_model()

        # Train the model
        model.fit(X_train, y_train, batch_size=512, epochs=20, validation_split=0.1, verbose=1)
        trainScore = model.evaluate(X_train, y_train, verbose=0)

        # Predictions
        predictions = model.predict(X_test)
        predictions = predictions.flatten().tolist()
        y_test = y_test.tolist()

        # Predict for latest day
        x_latest = np.reshape(df_values[-5:], (1, 5, df_values.shape[1]))
        latest_prediction = model.predict(x_latest).flatten()[0]
        predictions.append(latest_prediction)

        # Rescale predictions
        min_val, max_val = df['Mid Prices'].min(), df['Mid Prices'].max()
        def inverse_minmax(x): return x * (max_val - min_val) + min_val
        predictions = [inverse_minmax(p) for p in predictions]
        y_test = [inverse_minmax(y) for y in y_test]

        # Calculate error
        mse = mean_squared_error(y_test, predictions[:-1])
        rmse = np.sqrt(mse)
        print("Root Mean Squared Error:", rmse)

        # Cleanup file
        if os.path.exists(file_to_save):
            os.remove(file_to_save)

        return predictions, y_test, predictions[-1], rmse


# Example Usage:
# model = LSTM_Model()
# predictions, y_test, tomorrow_prediction, rmse = model.LSTM_Pred("TCS")
# print("Predictions:", predictions)
# print("Tomorrow's prediction:", tomorrow_prediction)
# print("RMSE:", rmse)
