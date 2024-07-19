const { Op } = require("sequelize");
const Note = require("../models/Note");

// Helper function for common error responses
const handleError = (res, err) => {
  console.error(err);
  res.status(400).send({ error: err.message || "An error occurred" });
};

exports.createNote = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debugging

    const { title, content, tags, isArchived, isDeleted } = req.body;
    if (!title || !content) {
      return res.status(400).send({ error: "Title and content are required" });
    }

    const note = await Note.create({
      userId: req.userId,
      title,
      content,
      tags,
      isArchived,
      isDeleted,
    });

    res.status(201).send(note);
  } catch (err) {
    console.error("Error creating note:", err);
    res.status(400).send({ error: err.message || "Error creating note" });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: { userId: req.userId, isDeleted: false },
    });
    res.send(notes);
  } catch (err) {
    handleError(res, err);
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      where: { id: req.params.id, userId: req.userId },
    });
    if (!note) {
      return res.status(404).send({ error: "Note not found" });
    }
    await note.update(req.body);
    res.send(note);
  } catch (err) {
    handleError(res, err);
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      where: { id: req.params.id, userId: req.userId },
    });
    if (!note) {
      return res.status(404).send({ error: "Note not found" });
    }
    await note.update({ isDeleted: true, deletedAt: new Date() });
    res.send(note);
  } catch (err) {
    handleError(res, err);
  }
};

exports.getArchivedNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: { userId: req.userId, isArchived: true, isDeleted: false },
    });
    res.send(notes);
  } catch (err) {
    handleError(res, err);
  }
};

exports.getTrashedNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: {
        userId: req.userId,
        isDeleted: true,
        deletedAt: {
          [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    });
    res.send(notes);
  } catch (err) {
    handleError(res, err);
  }
};

exports.getLabelNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: {
        userId: req.userId,
        tags: { [Op.like]: `%${req.params.label}%` },
        isDeleted: false,
      },
    });
    res.send(notes);
  } catch (err) {
    handleError(res, err);
  }
};

exports.searchNotes = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).send({ error: "Query parameter is required" });
    }
    const notes = await Note.findAll({
      where: {
        userId: req.userId,
        isDeleted: false,
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { content: { [Op.like]: `%${query}%` } },
        ],
      },
    });
    res.send(notes);
  } catch (err) {
    handleError(res, err);
  }
};
