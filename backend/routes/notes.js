const express = require('express');
const router = express.Router();
const Note = require('../models/Note'); // Assume Note model is in the models folder
const { protect } = require('../middleware/authMiddleware'); // Protect middleware

// Create Note
router.post('/notes', async (req, res) => {
  console.log(req.body);
  try {
    const note = new Note({
      user: req.user._id,
      title: req.body.title,
      content: req.body.content,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get User's Notes
router.get('/notes', protect, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Note
router.put('/notes/:id', protect, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Note
router.delete('/notes/:id', protect, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await note.remove();
    res.json({ message: 'Note removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
