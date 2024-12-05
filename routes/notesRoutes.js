const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');


router.get('/', notesController.getAllNotes);


router.post('/add', notesController.addNote);


router.post('/edit', notesController.editNote);


router.post('/delete', notesController.deleteNote);

module.exports = router;




