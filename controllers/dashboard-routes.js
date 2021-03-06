const router = require('express').Router();
const { User, Post, Comment } = require('../models/');

// get our posts for the dashboard
router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes:[
            'id',
            'post_body',
            'title'
        ],
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
        console.log(dbPostData);
        res.render('dashboard', { posts: dbPostData, loggedIn: true })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});


//edit posts page
router.get('/edit/:id', (req, res) => {
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

            res.render('edit-post', {
                posts : dbPostData,
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