const Marsupilami = require('../models/Marsupilami'),
    Blacklist = require('../models/Blacklist'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken');

require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET_KEY;

exports.register = function (req, res) {
    console.log(req.body);
    let hash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hash;
    Marsupilami.create(req.body, function(err, newMarsu) {
        if (err) 
            res.status(400).json(err);
        else
            res.status(201).json(newMarsu);
    });
};

exports.login = function (req, res) {
    Marsupilami.findOne({name : req.body.name}, function(err, marsu) {
        if (marsu) {
            bcrypt.compare(req.body.password, marsu.password, function(err, result) {
                if (result) {
                    let token = jwt.sign({id: marsu._id}, jwt_secret, { expiresIn: '24h'});
                    res.status(200).json({auth: true, token: token, message: 'Welcome, houba, houba !'})
                } else {
                    res.status(401).json({auth: false, message: 'Password not match, houba !'})
                };
            });
        } else if (!marsu) {
            res.status(404).json({auth: false, message: 'No Marsupilami found, houba !'});
        } else {
            res.status(400).json({auth: false, message: err});
        };
    });
};

exports.logout = function (req, res) {
    if (req.token) {
        Blacklist.create({token: req.token}, function(err, result) {
            res.status(200).json('Logout successfully, houba !')
        });
    };
};