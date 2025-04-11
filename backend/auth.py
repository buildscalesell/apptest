from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

# Geheimschlüssel & Algo
SECRET_KEY = "dein-geheimer-key"  # in Produktion aus ENV lesen!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Passwort-Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_pw, hashed_pw):
    return pwd_context.verify(plain_pw, hashed_pw)

def hash_password(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
