
const FileModel = require('../models/file.model');
const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });


module.exports = {
    uploadFile: uploadFileFunction,
    uploadFiles: uploadFilesFunction
};



function uploadFileFunction(req,res) {
    var uploadSingleFile = upload.single('image');
    uploadSingleFile(req,res,function(err) {
        if(err) {
            return res.send({message:"Error uploading file"});
        }
        res.send({success:true,message:"File is uploaded"});
    });
}

function uploadFilesFunction(req,res) {
    var uploadMultipleFile = upload.array('images', 100);
    uploadMultipleFile(req,res,function(err) {
        if(err) {
            return res.send({message:"Error uploading file"});
        }
        res.send({success:true,message:"Files are uploaded"});

    });
}

