
from sqlalchemy import Column, Integer, String, Float, ForeignKey, UniqueConstraint
from app.database.database import Base


class Product(Base):
    __tablename__ = "products"

    __table_args__ = (
        UniqueConstraint(
            "organization_id",
            "sku",
            name="uq_organization_sku"
        ),
    )

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    sku = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    low_stock_threshold = Column(Integer, default=5)

    organization_id = Column(
        Integer,
        ForeignKey("organizations.id"),
        nullable=False
    )