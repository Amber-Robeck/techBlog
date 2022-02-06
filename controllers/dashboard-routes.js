// const router = require('express').Router();
// const { Post } = require('../models');
// const withAuth = require('../utils/auth.js');


// // /dashboard endpoint

// //removed with auth for testing
// router.get('/', async (req, res) => {
//     try {
//         res.render('all-posts-admin', { layout: 'dashboard' })
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

// // /dashboard/new endpoint
// // Add a new post
// router.get('/new', async (req, res) => {
//     try {
//         res.status(200).render('new-post', { layout: 'dashboard' });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });


const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
//removed with auth for testing
router.get('/', (req, res) => {
    Post.findAll({
        where: {
            user_Id: req.session.user_id
        },
        attributes: [
            'id',
            'body',
            'title',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'body', 'post_Id', 'user_Id',],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('all-posts-admin', { posts, loggedIn: true, username: req.session.username, layout: 'dashboard' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// dashboard/new endpoint for adding new post
router.get('/new', async (req, res) => {
    try {
        res.status(200).render('new-post', { layout: 'dashboard' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/edit/:id', (req, res) => {
    Post.findByPk(req.params.id, {
        attributes: [
            'id',
            'body',
            'title',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'body', 'post_Id', 'user_Id',],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });

                res.render('edit-post', {
                    post,
                    loggedIn: true,
                    username: req.session.username
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;

