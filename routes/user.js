const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get User List');
});

module.exports = router;