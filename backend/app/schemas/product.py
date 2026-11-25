from pydantic import BaseModel, Field


class ProductCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    sku: str = Field(..., min_length=2, max_length=50)
    quantity: int = Field(..., ge=0)
    price: float = Field(..., ge=0)
    low_stock_threshold: int = Field(default=5, ge=0)


class ProductUpdate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    sku: str = Field(..., min_length=2, max_length=50)
    quantity: int = Field(..., ge=0)
    price: float = Field(..., ge=0)
    low_stock_threshold: int = Field(default=5, ge=0)


class ProductResponse(BaseModel):
    id: int
    name: str
    sku: str
    quantity: int
    price: float
    low_stock_threshold: int
    organization_id: int

    class Config:
        from_attributes = True