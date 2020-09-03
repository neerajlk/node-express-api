const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
    url: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Files', FileSchema);