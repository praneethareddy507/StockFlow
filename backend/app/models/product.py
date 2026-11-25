
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.database.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    sku = Column(String(50), nullable=False)
    quantity = Column(Integer, default=0)
    price = Column(Float, nullable=False)
    low_stock_threshold = Column(Integer, default=5)

    organization_id = Column(
        Integer,
        ForeignKey("organizations.id"),
        nullable=False
    )
