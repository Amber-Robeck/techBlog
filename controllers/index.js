const router = require('express').Router();
const dashboardRoute = require('./dashboard-routes');
const homeRoute = require('./home-routes');
const api = require('./api');

// router.use('/', homeRoute);
// router.use('/dashboard', dashboardRoute);
// router.use('/api', api);

router.get('/', (req, res) => {
    res.render('all-posts')
})

// router.use('*', )
router.get('/adduser', (req, res) => {
    res.render('signup')
})
router.post('/adduser', (req, res) => {
    console.log(req.body);

    res.redirect('/');
});

router.get('*', function (req, res) {
    res.render('login')

})
module.exports = router;
