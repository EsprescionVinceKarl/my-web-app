const db = require('../models/notesModel');

exports.getAllNotes = (req, res) => {
    db.all("SELECT * FROM items", [], (err, rows) => {
        if (err) {
            console.error('Error fetching notes:', err);
            res.status(500).send("Error fetching notes");
        } else {
            res.render('index', { notes: rows });
        }
    });
};

exports.addNote = (req, res) => {
    const { name, description } = req.body;
    const date_created = new Date().toISOString();
    if (name && description) {
        db.run("INSERT INTO items (name, description, date_created) VALUES (?, ?, ?)", [name, description, date_created], function(err) {
            if (err) {
                console.error('Error adding note:', err);
                res.status(500).send("Error adding note");
            } else {
                res.redirect('/');
            }
        });
    } else {
        res.status(400).send("Name and description are required");
    }
};

exports.editNote = (req, res) => {
    const { id, name, description } = req.body;
    if (id && name && description) {
        db.run("UPDATE items SET name = ?, description = ? WHERE id = ?", [name, description, id], function(err) {
            if (err) {
                console.error('Error updating note:', err);
                res.status(500).send("Error updating note");
            } else {
                res.redirect('/');
            }
        });
    } else {
        res.status(400).send("ID, name, and description are required");
    }
};

exports.deleteNote = (req, res) => {
    const { id } = req.body;
    if (id) {
        db.run("DELETE FROM items WHERE id = ?", [id], function(err) {
            if (err) {
                console.error('Error deleting note:', err);
                res.status(500).send("Error deleting note");
            } else {
                res.redirect('/');
            }
        });
    } else {
        res.status(400).send("ID is required to delete a note");
    }
};

