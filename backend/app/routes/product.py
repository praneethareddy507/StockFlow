
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.dependencies import get_current_user
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from app.models.user import User
from sqlalchemy.exc import IntegrityError

router = APIRouter(prefix="/products", tags=["Products"])


@router.post("/", response_model=ProductResponse, status_code=201)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_product = Product(
        name=product.name,
        sku=product.sku,
        quantity=product.quantity,
        price=product.price,
        low_stock_threshold=product.low_stock_threshold,
        organization_id=current_user.organization_id
    )

    try:
        db.add(new_product)
        db.commit()
        db.refresh(new_product)

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=409,
            detail="Product conflicts with an existing record"
        )

    return new_product


@router.get("/", response_model=list[ProductResponse])
def get_products(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Product).filter(
        Product.organization_id == current_user.organization_id
    ).all()



@router.get("/{product_id}", response_model=ProductResponse)
def get_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    product = db.query(Product).filter(
        Product.id == product_id,
        Product.organization_id == current_user.organization_id
    ).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product


@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    updated_data: ProductUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    product = db.query(Product).filter(
        Product.id == product_id,
        Product.organization_id == current_user.organization_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    product.name = updated_data.name
    product.sku = updated_data.sku
    product.quantity = updated_data.quantity
    product.price = updated_data.price
    product.low_stock_threshold = updated_data.low_stock_threshold

    try:
        db.commit()
        db.refresh(product)

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=409,
            detail="Product conflicts with an existing record"
        )

    return product

@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    product = db.query(Product).filter(
        Product.id == product_id,
        Product.organization_id == current_user.organization_id
    ).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(product)
    db.commit()

    return {"message": "Product deleted successfully"}
