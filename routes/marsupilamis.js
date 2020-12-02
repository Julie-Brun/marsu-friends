const express = require('express');

const { getMarsusExceptOne, getMarsu, updateMarsu, getFriends, addFriend, deleteFriend, createFriend } = require('../controllers/marsupilamis');

const router = express.Router();

router
    .get('/profile/:id', getMarsu)
    .put('/profile/:id/update', updateMarsu)
    .get('/profile/:id/friends', getMarsusExceptOne)
    .get('/profile/:id/friends/all', getFriends)
    .put('/profile/:id/friends/add', addFriend)
    .put('/profile/:id/friends/delete', deleteFriend)
    .put('/profile/:id/friends/create', createFriend);

module.exports = router;