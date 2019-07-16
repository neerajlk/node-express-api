const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    name: String,
    age: Number,
    state: String,
    gender: String
}, {
        timestamps: true
    });

module.exports = mongoose.model('Person', PersonSchema);