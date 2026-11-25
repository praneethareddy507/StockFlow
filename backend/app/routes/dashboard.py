
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.dependencies import get_current_user
from app.models.product import Product
from app.models.user import User

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/")
def get_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    products = db.query(Product).filter(
        Product.organization_id == current_user.organization_id
    ).all()

    total_products = len(products)

    total_quantity = sum(
        product.quantity for product in products
    )

    low_stock_products = [
        product for product in products
        if product.quantity <= product.low_stock_threshold
    ]

    return {
        "total_products": total_products,
        "total_quantity": total_quantity,
        "low_stock_count": len(low_stock_products),
        "low_stock_products": low_stock_products
    }
