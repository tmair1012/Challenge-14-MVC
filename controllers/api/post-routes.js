const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

//get all posts
router.get('/', (req, res) => {
    Post.findAll({
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_body', 'user_id'],
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//get a post by its id

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_body', 'user_id'],
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
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this ID'})
            return;
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//create a new post
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        comment: req.body.comment,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

//update a post
router.put('/upvote', (req, res) => {
    post.update(
        {
            title: req.body.title
        },
        {
        where: {
            id: req.params.id
        }
    }
    )
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json ({ message: 'NO POST WITH THIS ID'})
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No POST WITH THIS ID'})
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;