const Note = require('../models/noteModel');

exports.createNote = (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  const newNote = Note.create(title, content);
  res.status(201).json(newNote);
};

exports.getAllNotes = (req, res) => {
  const notes = Note.getAll();
  res.status(200).json(notes);
};

exports.getNoteById = (req, res) => {
  const { id } = req.params;
  const note = Note.getById(id);
  if (note) {
    res.status(200).json(note);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
};

exports.updateNote = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  const updatedNote = Note.update(id, title, content);
  if (updatedNote) {
    res.status(200).json(updatedNote);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
};

exports.deleteNote = (req, res) => {
  const { id } = req.params;
  const isDeleted = Note.delete(id);
  if (isDeleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
};