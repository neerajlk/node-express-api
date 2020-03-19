const jwt = require("jsonwebtoken");
const User = require('../models/user.model')

exports.routeGaurd = function (req, res, next) {
    if (req.path == '/login') {
        next()
    }
    else {
        if (!req.headers.authorization)
            return res.status('401').send('Unauthorized');
        else {
            if (jwt.decode(req.headers.authorization)) {
                User.findById(jwt.decode(req.headers.authorization).user.id).then(user => {
                    if (user)
                        next()
                    else
                        return res.status('401').send('Unauthorized');
                })
            }
            else {
                return res.status('401').send('Unauthorized');
            }
        }
    }

}