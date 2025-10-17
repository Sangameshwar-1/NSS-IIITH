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
        try:
            print(f"[Database] Connecting to MongoDB: {MONGO_URL}")
            client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=5000)
            # Test the connection
            client.admin.command('ping')
            db = client[MONGO_DB]
            print(f"[Database] Successfully connected to database: {MONGO_DB}")
        except Exception as e:
            print(f"[Database] Failed to connect: {e}")
            client = None
            db = None
            raise
    return db

def close_connection():
    global client, db
    if client is not None:
        client.close()
        client = None
        db = None