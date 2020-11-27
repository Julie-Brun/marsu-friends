const express = require('express');

const { getMarsusExceptOne, getMarsu, updateMarsu, getFriends, addFriend, deleteFriend } = require('../controllers/marsupilamis');

const router = express.Router();

router
    .route('/profile/:id')
    .get(getMarsu)
    .put(updateMarsu);

router
    .route('/profile/:id/friends')
    .get(getMarsusExceptOne);

router
    .get('/profile/:id/friends/all', getFriends)
    .put('/profile/:id/friends/add', addFriend)
    .put('/profile/:id/friends/delete', deleteFriend);

module.exports = router;