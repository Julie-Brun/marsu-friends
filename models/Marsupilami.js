const mongoose = require('mongoose');

let MarsupilamiSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please, add a name'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please, add a password']
    },
    age: {
        type: Number
    },
    family: {
        type: String
    },
    race: {
        type: String
    },
    food: {
        type: String
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marsupilami'
    }]
});

module.exports = mongoose.model('Marsupilami', MarsupilamiSchema);