module.exports = (app) => {
    const persons = require('../controllers/person.controller.js');

    // Create a new Note
    app.post('/persons', persons.create);

    // Retrieve all Notes
    app.get('/persons', persons.findAll);

    // Retrieve a single Note with personId
    app.get('/persons/:personId', persons.findOne);

    // Update a Note with personId
    app.put('/persons/:personId', persons.update);

    // Delete a Note with personId
    app.delete('/person/:personId', persons.delete);
}