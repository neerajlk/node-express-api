module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/note', notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve Notes created by user with userId
    app.get('/user/:userId/notes', notes.findAllById);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);
}