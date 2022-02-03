const router = require('express').Router();

router.post('/adduser', (req, res) => {
    console.log(req.body);

    res.redirect('/');
});

module.exports = router;
