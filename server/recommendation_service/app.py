from flask import Flask, request, jsonify
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

def load_data():
    client = MongoClient("mongodb://localhost:27017/")
    db = client["stockDB"]       
    collection = db["financials"]       

    data = pd.DataFrame(list(collection.find()))

    if '_id' in data.columns:
        data = data.drop('_id', axis=1)
    
    return data

features = ["Price", "Price/Earnings", "Dividend Yield", "Earnings/Share", "52 Week Low", 
            "52 Week High", "Market Cap", "EBITDA", "Price/Sales", "Price/Book"]

data = load_data()

data = data.dropna(subset=features)

data[features] = data[features].fillna(0)

scaler = StandardScaler()
data[features] = scaler.fit_transform(data[features])

similarity_matrix = cosine_similarity(data[features])


def recommend_stocks(symbol, num_recommendations=5):
    idx = data[data['Symbol'] == symbol].index[0]
    
    sim_scores = list(enumerate(similarity_matrix[idx]))
    
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    top_indices = [i[0] for i in sim_scores[1:num_recommendations+1]]
    
    recommended_stocks = data.iloc[top_indices][["Symbol", "Name", "Sector"] + features]
    return recommended_stocks.to_dict("records")

@app.route('/recommend', methods=['GET'])
def get_recommendations():

    symbol = request.args.get("symbol")
    num_recommendations = request.args.get("num", 5)
    
    if not symbol:
        return jsonify({"error": "Stock symbol is required"}), 400
    
    try:
        num_recommendations = int(num_recommendations)
    except ValueError:
        return jsonify({"error": "num must be an integer"}), 400
    
    try:
        recommendations = recommend_stocks(symbol, num_recommendations)
        return jsonify(recommendations)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5000)

