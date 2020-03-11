module.exports = (app) => {
    const user = require('../controllers/registerUser.controller.js');

    // Create a new Note
    app.post('/user', user.create);

    // Retrieve all Notes
    // app.get('/notes', notes.findAll);

    // login
    app.post('/user/login', user.login)


    // Retrieve a single Note with noteId
    app.get('/user/:userId', user.findOne);


    // Update a Note with noteId
    // app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    // app.delete('/notes/:noteId', notes.delete);
}