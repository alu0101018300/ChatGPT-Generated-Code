import pytest
from fastapi.testclient import TestClient
from main import app  # Importa la API principal

client = TestClient(app)

# Prueba: Crear una nota
def test_create_note():
    response = client.post("/notes/", json={"title": "Nota 1", "content": "Contenido de la nota 1"})
    assert response.status_code == 201
    assert response.json()["title"] == "Nota 1"
    assert response.json()["content"] == "Contenido de la nota 1"

# Prueba: Obtener la lista de notas
def test_get_notes():
    response = client.get("/notes/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

# Prueba: Obtener una nota por ID
def test_get_note_by_id():
    # Creamos una nota primero
    note = client.post("/notes/", json={"title": "Nota 2", "content": "Contenido de la nota 2"}).json()
    note_id = note["id"]

    # Ahora intentamos obtenerla
    response = client.get(f"/notes/{note_id}")
    assert response.status_code == 200
    assert response.json()["id"] == note_id

# Prueba: Editar una nota existente
def test_update_note():
    note = client.post("/notes/", json={"title": "Nota 3", "content": "Contenido original"}).json()
    note_id = note["id"]

    updated_data = {"title": "Nota 3 actualizada", "content": "Nuevo contenido"}
    response = client.put(f"/notes/{note_id}", json=updated_data)

    assert response.status_code == 200
    assert response.json()["title"] == "Nota 3 actualizada"
    assert response.json()["content"] == "Nuevo contenido"

# Prueba: Eliminar una nota por ID
def test_delete_note():
    note = client.post("/notes/", json={"title": "Nota 4", "content": "Contenido a eliminar"}).json()
    note_id = note["id"]

    response = client.delete(f"/notes/{note_id}")
    assert response.status_code == 204  # No Content

    # Verificar que ya no existe
    response = client.get(f"/notes/{note_id}")
    assert response.status_code == 404