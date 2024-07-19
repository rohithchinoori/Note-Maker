const express = require("express");
const auth = require("../middlewares/auth");
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  getArchivedNotes,
  getTrashedNotes,
  getLabelNotes,
  searchNotes,
} = require("../controllers/notesController");

const router = express.Router();

router.post("/", auth, createNote);
router.get("/", auth, getNotes);
router.put("/:id", auth, updateNote);
router.delete("/:id", auth, deleteNote);
router.get("/archived", auth, getArchivedNotes);
router.get("/trashed", auth, getTrashedNotes);
router.get("/label/:label", auth, getLabelNotes);
router.get("/search", auth, searchNotes);

module.exports = router;
