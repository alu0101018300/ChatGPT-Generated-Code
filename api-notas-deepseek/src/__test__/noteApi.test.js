const request = require('supertest');
const app = require('../app'); // Importa la aplicación Express

describe('API de Notas', () => {
  let noteId;

  // Prueba para crear una nota
  test('Crear una nota', async () => {
    const response = await request(app)
      .post('/notes')
      .send({
        title: 'Nota de prueba',
        content: 'Contenido de prueba',
      })
      .expect(201); // Espera un código de estado 201 (Created)

    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Nota de prueba');
    expect(response.body.content).toBe('Contenido de prueba');

    noteId = response.body.id; // Guarda el ID para usarlo en otras pruebas
  });

  // Prueba para obtener todas las notas
  test('Obtener todas las notas', async () => {
    const response = await request(app)
      .get('/notes')
      .expect(200); // Espera un código de estado 200 (OK)

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Prueba para obtener una nota por ID
  test('Obtener una nota por ID', async () => {
    const response = await request(app)
      .get(`/notes/${noteId}`)
      .expect(200); // Espera un código de estado 200 (OK)

    expect(response.body.id).toBe(noteId);
    expect(response.body.title).toBe('Nota de prueba');
    expect(response.body.content).toBe('Contenido de prueba');
  });

  // Prueba para editar una nota
  test('Editar una nota', async () => {
    const response = await request(app)
      .put(`/notes/${noteId}`)
      .send({
        title: 'Nota actualizada',
        content: 'Contenido actualizado',
      })
      .expect(200); // Espera un código de estado 200 (OK)

    expect(response.body.id).toBe(noteId);
    expect(response.body.title).toBe('Nota actualizada');
    expect(response.body.content).toBe('Contenido actualizado');
  });

  // Prueba para eliminar una nota
  test('Eliminar una nota', async () => {
    await request(app)
      .delete(`/notes/${noteId}`)
      .expect(204); // Espera un código de estado 204 (No Content)

    // Verifica que la nota ya no existe
    const response = await request(app)
      .get(`/notes/${noteId}`)
      .expect(404); // Espera un código de estado 404 (Not Found)
  });
});
