
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router
from app.routes.product import router as product_router
from app.routes.dashboard import router as dashboard_router

app = FastAPI(
    title="StockFlow API",
    description="Inventory Management System",
    version="1.0.0"
)

origins = [
     "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://stock-flow-two-orpin.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth_router)
app.include_router(product_router)
app.include_router(dashboard_router)


@app.get("/")
def home():
    return {"message": "Welcome to StockFlow"}