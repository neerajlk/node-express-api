const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: Array,
    userId: mongoose.ObjectId,
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);