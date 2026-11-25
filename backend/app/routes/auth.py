
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.auth import SignupSchema, LoginSchema
from app.repositories.auth_repository import (
    get_user_by_email,
    create_organization,
    create_user
)
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup")
def signup(data: SignupSchema, db: Session = Depends(get_db)):

    existing_user = get_user_by_email(db, data.email)

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    organization = create_organization(db, data.organization_name)

    user = create_user(
        db,
        data.name,
        data.email,
        hash_password(data.password),
        organization.id
    )

    return {
        "message": "Signup successful",
        "user_id": user.id,
        "organization_id": organization.id
    }


@router.post("/login")
def login(data: LoginSchema, db: Session = Depends(get_db)):

    user = get_user_by_email(db, data.email)

    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": str(user.id)})

    return {
        "access_token": token,
        "token_type": "bearer"
    }
