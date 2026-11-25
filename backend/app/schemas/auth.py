from pydantic import BaseModel, EmailStr


class SignupSchema(BaseModel):
    name: str
    email: EmailStr
    password: str
    organization_name: str


class LoginSchema(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    organization_id: int

    class Config:
        from_attributes = True