const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    userId: mongoose.ObjectId
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);