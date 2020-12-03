const Marsupilami = require('../models/Marsupilami'),
    Access = require('../utils'),
    mongoose = require('mongoose');

require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET_KEY;

exports.getMarsusExceptOne = function (req, res) {
    Access.checkAccess(req.token, jwt_secret, function (err, decoded) {
        if(err)
            res.status(403).json(err);
        else {
            Marsupilami.find({_id: {$ne: req.params.id}}, function (err, data) {
                if(err)
                    res.status(404).json(err);
                else 
                    res.status(200).json(data);
            });
        };
    });
};

exports.getMarsu = function (req, res) {
    Access.checkAccess(req.token, jwt_secret, function (err, decoded) {
        if(err)
            res.status(403).json(err);
        else {
            Marsupilami.find({_id: req.params.id}, function (err, data) {
                if(err)
                    res.status(404).json(err);
                else 
                    res.status(200).json(data);
            });
        };
    });
};

exports.updateMarsu = function (req, res) {
    Access.checkAccess(req.token, jwt_secret, function (err, decoded) {
        if(err)
            res.status(403).json(err);
        else {
            Marsupilami.updateOne({_id: req.params.id}, { $set: req.body }, function(err, data) {
                if(err)
                    res.status(400).json(err);
                else
                    res.status(200).json(data);
            });
        };
    });
};

exports.getFriends = function (req, res) {
    Access.checkAccess(req.token, jwt_secret, function (err, decoded) {
        if(err)
            res.status(403).json(err);
        else {
            Marsupilami.aggregate([
                {$match: {'_id': mongoose.Types.ObjectId(req.params.id)}},
                {$project: {'friends': 1}}]) 
                .exec(function (err, data) {
                if(err)
                    res.status(404).json(err);
                else 
                    res.status(200).json(data);
            });
        };
    });
};

exports.addFriend = function (req, res) {
    Access.checkAccess(req.token, jwt_secret, function (err, decoded) {
        if(err)
            res.status(403).json(err);
        else {
            Marsupilami.updateOne({_id: req.params.id}, {$push: {friends: req.body.id}}, function(err, data) {
                if(err)
                    res.status(400).json(err);
                else
                    res.status(200).json(data);
            });
        };
    });
};

exports.deleteFriend = function (req, res) {
    Access.checkAccess(req.token, jwt_secret, function (err, decoded) {
        if(err)
            res.status(403).json(err);
        else {
            Marsupilami.updateOne({_id: req.params.id}, {$pull: {friends: req.body.id}}, function(err, data) {
                if(err)
                    res.status(400).json(err);
                else
                    res.status(200).json(data);
            });
        };
    });
}; 
    
exports.createFriend = function(req, res) {
    Access.checkAccess(req.token, jwt_secret, function (err, decoded) {
        if(err) 
            res.status(403).json(err);
        else {
            Marsupilami.findOneAndUpdate({name: req.body.name}, { $set: req.body }, { upsert: true, new: true }, function(err, data) {
                if(err)
                    res.status(400).json(err);
                else {
                    Marsupilami.findOneAndUpdate({_id: req.params.id}, { $push:{ friends: data._id } }, { new: true }, function(err, data) {
                        if(err)
                            res.status(400).json(err);
                        else 
                            res.status(200).json(data);
                    });
                };
            });
        };
    });
};