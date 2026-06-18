from app.core.config import supabase,DATABASE_URL
from sqlalchemy.orm import sessionmaker,declarative_base
from sqlalchemy import create_engine

engine = create_engine(DATABASE_URL)
sessioLocal = sessionmaker(bind=engine,autoflush=False,autocommit=False)
Base = declarative_base()
def get_db():
    db = sessioLocal()
    try:
        yield db
    finally:
        db.close()