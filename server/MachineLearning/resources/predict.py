from flask_restful import Resource
from models.lstm import LSTM_Model
import json

class Predict(Resource):
    def get(self, name):
        predict, original, tomm_pred, mse = LSTM_Model.LSTM_Pred(name)
        return {
            'predicted': json.dumps(predict),
            'original': json.dumps(original),
            'tommrw_prdctn': json.dumps(tomm_pred),
            'mn_sqre_err': json.dumps(mse)
        }, 200
