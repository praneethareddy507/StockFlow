
from fastapi import FastAPI

from app.database.database import Base, engine
from app.models import Organization, User, Product
from app.routes.auth import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="StockFlow API",
    description="Inventory Management System",
    version="1.0.0",
)

app.include_router(auth_router)


@app.get("/")
def home():
    return {"message": "Welcome to StockFlow"}
