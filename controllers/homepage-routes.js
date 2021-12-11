const router = require('express').Router();

//create login
router.get('/', (req, res) => {
    console.log('Homepage-routes Test');
    res.render('homepage');
});

module.exports = router;