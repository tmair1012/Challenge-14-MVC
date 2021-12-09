const router = require('express').Router();
const sequelize = require('sequelize');
const { User, Post } = require('../../models');

//Get all Users

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbUser => res.json(dbUser))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Get Single Users
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [{
            model: Post,
            attributes: ['id', 'title', 'post_body']
        }]
    })
    .then(dbUser => res.json(dbUser))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

//create a new user
router.post('/', (req, res) => {
    User.create({
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUser => {
        req.session.save(() => {
            req.session.id = dbUser.id
            req.session.email = dbUser.email;
            req.session.loggedIn = true;

            res.json(dbUser)
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//allow user to login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUser => {
        if (!dbUser) {
            res.status(400).json({ message: 'No user using this Email'})
            return;
        }

        const valPW = dbUser.checkPassword(req.body.password)

        if(!valPW) {
            res.status(400).json({ message: 'WRONG PASSWORD' })
            return;
        }

        req.session.save(() => {
            req.session.id = dbUser.id;
            req.session.email = dbUser.email;
            req.session.loggedIn = true;

            res.json({ user: dbUser, message: 'Logged in Successfully!' });
            
        });
    });
    
});

//allow user to logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    }
    else {
        res.status(404).end();
    }
});

//update a user
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete a user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id'});
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;