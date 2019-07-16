const Person = require('../models/person.model.js');

function getRequestParams(model, params) {
    var query = {}
    Object.keys(model.schema.paths).forEach(key => {
        if (params[key]) {
            query[key] = params[key]
        }
    });
    return query;
}

// Create and Save a new Person
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Person Name can not be empty"
        });
    }

    // Create a Person
    const person = new Person({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        state: req.body.state
    });

    // Save Person in the database
    person.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while Registering the Person."
            });
        });
};

// Retrieve and return all Persons from the database.
exports.findAll = (req, res) => {

    if (req.query.name || req.query.age) {
        var query = getRequestParams(Person, req.query)

        Person.find(query)
            .then(persons => {
                res.send(persons);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving Person details"
                });
            });
    }
    else {
        Person.find()
            .then(persons => {
                res.send(persons);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving Persons List."
                });
            });
    }


};

// Find a single Person with a PersonId
exports.findOne = (req, res) => {
    Person.findById(req.params.personId)
        .then(person => {
            if (!person) {
                return res.status(404).send({
                    message: "Person not found with id " + req.params.personId
                });
            }
            res.send(person);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Person not found with id " + req.params.personId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Person with id " + req.params.personId
            });
        });
};

// Update a Person identified by the PersonId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Person name can not be empty"
        });
    }

    // Find Person and update it with the request body
    Person.findByIdAndUpdate(req.params.personId, {
        name: req.body.name,
        age: req.body.age,
        state: req.body.state,
        gender: req.body.gender
    }, { new: true })
        .then(person => {
            if (!person) {
                return res.status(404).send({
                    message: "person not found with id " + req.params.personId
                });
            }
            res.send(person);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Person not found with id " + req.params.personId
                });
            }
            return res.status(500).send({
                message: "Error updating Person with id " + req.params.personId
            });
        });
};

// Delete a Person with the specified PersonId in the request
exports.delete = (req, res) => {
    Person.findByIdAndRemove(req.params.personId)
        .then(person => {
            if (!person) {
                return res.status(404).send({
                    message: "Person not found with id " + req.params.personId
                });
            }
            res.send({ message: "Person deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Person not found with id " + req.params.personId
                });
            }
            return res.status(500).send({
                message: "Could not delete Person with id " + req.params.personId
            });
        });
};