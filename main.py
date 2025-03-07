from fastapi import FastAPI
from routes.notes import router as notes_router

app = FastAPI(title="API de Gestión de Notas")

# Incluir las rutas en la aplicación
app.include_router(notes_router)

# Ruta raíz
@app.get("/")
def home():
    return {"message": "Bienvenido a la API de Gestión de Notas"}
