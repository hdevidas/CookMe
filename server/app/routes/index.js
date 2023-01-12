const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.status(200).json({
        status: 'API is Working',
        message: 'Welcome!'
    });
});

module.exports = router;