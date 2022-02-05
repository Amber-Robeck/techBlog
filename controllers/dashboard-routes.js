const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth.js');


// /dashboard endpoint

//removed with auth for testing
router.get('/', async (req, res) => {
    // res.send('hello')
    try {
        res.render('all-posts-admin', { layout: 'dashboard' })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// /dashboard/new endpoint
// Add a new post
router.get('/new', async (req, res) => {
    try {
        res.status(200).render('new-post', { layout: 'dashboard' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
