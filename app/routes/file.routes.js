module.exports = (app) => {
    const fileController = require('../controllers/file.controller');

    // upload a new file
    app.post('/file-upload', fileController.uploadFile);

    // upload  multiple file
    app.post('/files-upload', fileController.uploadFiles);
}