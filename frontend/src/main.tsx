from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 🧠 App-Instanz erstellen
app = FastAPI()

# 🌐 CORS Middleware für Frontend-Zugriff
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Erlaubt dein Vite-Frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 👋 Einfacher API-Endpoint mit Namensbegrüßung
@app.get("/api/hello")
def hello(name: str = "Gast"):
    return {"message": f"Hallo, {name} 👋"}
