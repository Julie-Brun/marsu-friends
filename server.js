// Déclarations des dépendances
const express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    bearerToken = require('express-bearer-token'),
    path = require('path'),
    app = express(),
    port = process.env.PORT || 3000,

    auth = require('./routes/auth'),
    marsupilami = require('./routes/marsupilamis');

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(bearerToken());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://marsu-friends.herokuapp.com/");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/front'))
};

// Initialisation de la connexion à la base de données
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/appartoo_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// Routes
app.use('/auth', auth);
app.use('/marsu', marsupilami);

app.get('/*', (req, res) => {
    console.log('Hello, world !');
    res.sendFile(path.join(__dirname, '/client/dist/front', 'index.html'));
});

// Mise en écoute de notre application
app.listen(port);
console.log('Le serveur tourne sur le port ' + port + ' !');