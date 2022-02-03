const router = require('express').Router();
const dashboardRoute = require('./dashboard-routes');
const homeRoute = require('./home-routes');
const api = require('./api');

// router.use('/', homeRoute);
// router.use('/dashboard', dashboardRoute);
// router.use('/api', api);


// router.use('*', )

router.get('*', function (req, res) {
    res.render('login')
})

router.post('/adduser', (req, res) => {
    console.log(req.body);

    res.redirect('/');
});
module.exports = router;
