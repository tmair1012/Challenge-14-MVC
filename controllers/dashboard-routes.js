const router = require('express').Router();
const { User, Post, Comment } = require('../models/');
const { post } = require('./homepage-routes');

// get our posts for the dashboard
router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
        where: {
            user_id: req.session.id
        },
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_body', 'post_id', 'user_id']
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});


//edit posts page
router.get('/:id', (req, res) => {
    Post.findByPk(req.params.id, {
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_body', 'post_id', 'user_id']
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
                loggedIn: true
            })
        } else {
            res.status(404).end();
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;