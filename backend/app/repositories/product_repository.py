from sqlalchemy.orm import Session
from app.models.product import Product


def create_product(db: Session, product_data: dict, organization_id: int):
    product = Product(
        **product_data,
        organization_id=organization_id
    )

    db.add(product)
    db.commit()
    db.refresh(product)
    return product


def get_products(db: Session, organization_id: int):
    return db.query(Product).filter(
        Product.organization_id == organization_id
    ).all()


def get_product(db: Session, product_id: int, organization_id: int):
    return db.query(Product).filter(
        Product.id == product_id,
        Product.organization_id == organization_id
    ).first()


def update_product(db: Session, product, product_data: dict):
    for key, value in product_data.items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)
    return product


def delete_product(db: Session, product):
    db.delete(product)
    db.commit()