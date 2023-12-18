from flask import Flask, request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost/expensbase'

db = SQLAlchemy(app)

class Expenses(db.Model):    
    transaction_id = db.Column(db.String(30), primary_key =True)
    user_id = db.Column(db.String(30))
    timestamp = db.Column(db.DateTime(), nullable=False)
    category = db.Column(db.String(30), nullable=False)
    sub_category = db.Column(db.String(30), nullable=False)
    amount = db.Column(db.Integer(), nullable=False)    
    currency = db.Column(db.String(10), nullable=False)    
    transaction_type = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(200), nullable=False)

@app.route("/", methods = ["GET"])
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/getInfo/<string:user_id>", methods = [ "GET" ])
def getInfo(user_id):
    x = Expenses.query.filter_by(user_id=user_id).all()
    def process(y):
        y = y.__dict__
        del y[ '_sa_instance_state' ]
        return y
    x = list( map(process, x) ) 
    return x

if( __name__ == "__main__"):
    app.run(host="192.168.0.107")