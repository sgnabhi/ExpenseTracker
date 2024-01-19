from flask import Flask, request,jsonify
from flask_cors import CORS
from config import config
import json
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from filter import *
from datetime import datetime
mongo_uri = config[ "URI" ] % (config[ "MONGO_USER" ], config[ "MONGO_PASSWORD" ])

# Create a new client and connect to the server
client = MongoClient(mongo_uri)

app = Flask(__name__)
CORS(app)
# Select the database and collection
db = client[ "ExpenseTracker" ]
collection = db[ "Transactions" ]


@app.route('/')
def index():
    return 'Hello, this is your Flask app!'

@app.route('/TransactionsData', methods = [ "GET" ] )
def get_data():
    # Fetch data from MongoDB
    userId = request.args.get( 'userId' )
    Query = { 'userId' : userId }
    startDate = request.args.get('startDate')    
    endDate = request.args.get( 'endDate' )
    if( startDate or endDate ):
        dateFilter = DateFilter( startDate, endDate )
        Query = { **Query, **dateFilter.getQueryDict() }
    minAmount = request.args.get( 'minAmount' )    
    maxAmount = request.args.get( 'maxAmount' )
    if( minAmount or maxAmount ):
        amountFilter = AmountFilter( minAmount, maxAmount )
        amountQuery = amountFilter.getQueryDict()
        Query = { **Query, **amountFilter.getQueryDict() }
    
    categoryList = request.args.get( 'category' )
    if( categoryList ):
        categoryFilter = ListFilter( 'category', categoryList.split(",") )
        Query = { **Query, **categoryFilter.getQueryDict() }
    
    subCategoryList = request.args.get( 'subCategory' )
    if( subCategoryList ):
        subCategoryFilter = ListFilter( 'subCategory', subCategoryList.split(",") )
        Query = { **Query, **subCategoryFilter.getQueryDict() }

    projection = { '_id' : 0 }
    data = list(collection.find(Query, projection))
    return jsonify(data)

@app.route( "/AddTransactionsData", methods = [ "POST" ] )
def post_data():
    try:
        # Get an array of user data from the request body
        transactionsData = request.json
        print( transactionsData )
        for transactionData in transactionsData:
            transactionData[ 'date' ] = datetime.strptime( transactionData[ "date" ], '%Y-%m-%d' )
            transactionData[ 'amount' ] = int( transactionData[ 'amount' ] )

        # Insert the array of transactions into the MongoDB collection
        result = collection.insert_many( transactionsData )

        # Return the inserted users' IDs
        inserted_ids = [str(inserted_id) for inserted_id in result.inserted_ids]
        return jsonify({"message": "Users added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if( __name__ == "__main__"):
    app.run(host="192.168.0.107")