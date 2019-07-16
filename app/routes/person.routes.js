module.exports = (app) => {
    const persons = require('../controllers/person.controller.js');

    // Create a new Person
    app.post('/persons', persons.create);

    // Retrieve all Persons
    app.get('/persons', persons.findAll);

    // Retrieve a single Person with personId
    app.get('/persons/:personId', persons.findOne);

    // Update a Person with personId
    app.put('/persons/:personId', persons.update);

    // Delete a Person with personId
    app.delete('/person/:personId', persons.delete);
}