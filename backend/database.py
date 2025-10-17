# db.py
from pymongo import MongoClient
import os

MONGO_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017/")
MONGO_DB = os.getenv("MONGODB_DB_NAME", "default")

client = None
db = None

def get_database():
    global client, db
    if client is None:
        client = MongoClient(MONGO_URL)
        db = client[MONGO_DB]
    return db

def close_connection():
    global client, db
    if client:
        client.close()
        client = None
    if db:
        db = None