from fastapi import FastAPI
from sqlalchemy import text
from app.db.database import engine


app = FastAPI()
@app.get("/")
def get_me():
    return {"message":"its working baby"}