from sqlmodel import SQLModel, create_engine, Session
from models import User
from auth import hash_password

# Datenbankpfad
DATABASE_URL = "sqlite:///./db.sqlite"

engine = create_engine(DATABASE_URL, echo=True)

# DB & Tabellen erstellen + User hinzufügen (zum Test)
def init_db():
    SQLModel.metadata.create_all(engine)

    with Session(engine) as session:
        # Optional: Demo-User anlegen
        if not session.exec(User.select()).first():
            user = User(name="janis", hashed_password=hash_password("geheim123"))
            session.add(user)
            session.commit()
