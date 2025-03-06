const { v4: uuidv4 } = require('uuid');

let notes = [];

class Note {
  constructor(title, content) {
    this.id = uuidv4();
    this.title = title;
    this.content = content;
  }

  static getAll() {
    return notes;
  }

  static getById(id) {
    return notes.find(note => note.id === id);
  }

  static create(title, content) {
    const newNote = new Note(title, content);
    notes.push(newNote);
    return newNote;
  }

  static update(id, title, content) {
    const note = notes.find(note => note.id === id);
    if (note) {
      note.title = title;
      note.content = content;
    }
    return note;
  }

  static delete(id) {
    const index = notes.findIndex(note => note.id === id);
    if (index !== -1) {
      notes.splice(index, 1);
      return true;
    }
    return false;
  }
}

module.exports = Note;