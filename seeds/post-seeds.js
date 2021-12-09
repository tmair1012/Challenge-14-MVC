const { Post } = require('../models');

const postData = [
    {
        title: 'this is pizza',
        post_body: 'cool pizza',
        user_id: 1
    },
    {
        title: 'this is cookie',
        post_body: 'cool cookie',
        user_id: 3
    },
    {
        title: 'this is soda',
        post_body: 'cool soda',
        user_id: 2
    },
    {
        title: 'this is chocolate',
        post_body: 'cool chocolate',
        user_id: 5
    },
];

const postSeeds = () => Post.bulkCreate(postData);

module.exports = postSeeds;