from pydantic import BaseModel


class ProductCreate(BaseModel):
    name: str
    sku: str
    quantity: int
    price: float
    low_stock_threshold: int = 5


class ProductUpdate(BaseModel):
    name: str
    sku: str
    quantity: int
    price: float
    low_stock_threshold: int = 5


class ProductResponse(BaseModel):
    id: int
    name: str
    sku: str
    quantity: int
    price: float
    low_stock_threshold: int

    class Config:
        from_attributes = True