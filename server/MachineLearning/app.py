import sys
import io

# Set default encoding to UTF-8
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding='utf-8')



# app.py
from flask import Flask, render_template
from flask_restful import Api
from flask_cors import CORS
from resources.predict import Predict

app = Flask(__name__)
CORS(app)  # Enable CORS
api = Api(app)

@app.route('/')
def home():
    return render_template('index.html')

api.add_resource(Predict, '/predict/<string:name>')

if __name__ == '__main__':
    app.run(port=5000, debug=True)
