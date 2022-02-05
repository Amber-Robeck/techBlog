const router = require('express').Router();
// Import the custom middleware
// const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('all-posts');
});

router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
    // res.redirect('/');
    // return;
    // }

    res.render('login');
});
router.get('/signup', (req, res) => {
    // if (req.session.loggedIn) {
    // res.redirect('/');
    // return;
    // }

    res.render('signup');
});

module.exports = router;



