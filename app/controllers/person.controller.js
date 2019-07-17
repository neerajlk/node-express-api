const Person = require('../models/person.model.js');
const responseHandler = require('../misc/responseHandler.js')

function getRequestParams(model, params) {
    var query = {}
    Object.keys(model.schema.paths).forEach(key => {
        if (params[key]) {
            if (model.schema.paths[key].instance == 'Number') query[key] = parseInt(params[key])
            else
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
            var errMessage = {
                message: err.message || "Some error occurred while Registering the Person."
            }
            responseHandler.errorCallback(500, errMessage, res)
        });
};

// Retrieve and return all Persons from the database.
exports.findAll = (req, res) => {
    var query = getRequestParams(Person, req.query)
    Person.find(query, null, { sort: { age: 1 } })
        .then(persons => {
            res.send(persons);
        }).catch(err => {
            var errMessage = {
                message: err.message || "Some error occurred while retrieving Person details"
            }
            responseHandler.errorCallback(500, errMessage, res)

        });
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
                var errMessage = {
                    message: "Person not found with id " + req.params.personId
                }
                responseHandler.errorCallback(404, errMessage, res)

            }
            var errMessage = {
                message: "Error retrieving Person with id " + req.params.personId
            }
            responseHandler.errorCallback(500, errMessage, res)
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
                var errMessage = {
                    message: err.message || "Person not found with id "
                }
                responseHandler.errorCallback(404, errMessage, res)
            }
            var errMessage = {
                message: err.message || "Error updating Person with id "
            }
            responseHandler.errorCallback(500, errMessage, res)
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
                var errMessage = {
                    message: err.message || "Person not found with id "
                }
                responseHandler.errorCallback(404, errMessage, res)
            }
            var errMessage = {
                message: err.message || "Could not delete Person with id "
            }
            responseHandler.errorCallback(500, errMessage, res)
        });
};