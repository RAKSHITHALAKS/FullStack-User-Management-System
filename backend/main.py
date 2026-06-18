from datetime import datetime

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, SessionLocal
from models import Base, User
from schemas import UserCreate
from login_schema import LoginRequest

from auth import (
    hash_password,
    verify_password,
    create_access_token
)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "API Working"}


@app.post("/signup")
def signup(user: UserCreate):

    db = SessionLocal()

    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        return {"message": "Email already exists"}

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        member_since=datetime.now().strftime("%b %Y")
    )

    db.add(new_user)
    db.commit()

    return {"message": "User registered successfully"}


@app.post("/login")
def login(user: LoginRequest):

    db = SessionLocal()

    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if not existing_user:
        return {"message": "User not found"}

    if not verify_password(
        user.password,
        existing_user.password
    ):
        return {"message": "Invalid password"}

    token = create_access_token(
        {"email": existing_user.email}
    )

    return {
        "message": "Login successful",
        "access_token": token
    }


@app.get("/profile/{email}")
def get_profile(email: str):

    db = SessionLocal()

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:
        return {
            "message": "User not found"
        }

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "member_since": user.member_since
    }