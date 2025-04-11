from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from database import engine, init_db
from models import User
from auth import create_access_token, verify_password
from datetime import timedelta
from pydantic import BaseModel

app = FastAPI()
init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    name: str
    password: str

@app.post("/api/login")
def login(data: LoginRequest):
    with Session(engine) as session:
        statement = select(User).where(User.name == data.name)
        user = session.exec(statement).first()

        if not user or not verify_password(data.password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Ungültiger Login")

        token = create_access_token(
            data={"sub": user.name},
            expires_delta=timedelta(minutes=30),
        )
        return {"access_token": token, "token_type": "bearer"}
