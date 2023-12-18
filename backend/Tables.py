from flask_sqlalchemy import SQLAlchemy

dummy_db = SQLAlchemy()

class Transactions(dummy_db.Model):
    def __init__(self, db):        
        transaction_id = db.Column(db.String(30), primary_key =True)
        user_id = db.Column(db.String(30))
        timestamp = db.Column(db.DateTime(), nullable=False)
        category = db.Column(db.String(30), nullable=False)
        sub_category = db.Column(db.String(30), nullable=False)
        amount = db.Column(db.Integer(40), nullable=False)    
        currency = db.Column(db.String(10), nullable=False)    
        transaction_type = db.Column(db.String(20), nullable=False)
        description = db.Column(db.String(200), nullable=False)