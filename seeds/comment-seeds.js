const { Comment } = require('../models');

const commentData = [
    {
        comment_body: "not cool",
        post_id: 1,
        user_id: 2
    },
    {
        comment_body: "not cool",
        post_id: 3,
        user_id: 4
    },
    {
        comment_body: "not cool",
        post_id: 2,
        user_id: 5
    },
    {
        comment_body: "not cool",
        post_id: 4,
        user_id: 1
    },
];

const commentSeeds = () => Comment.bulkCreate(commentData);

module.exports = commentSeeds;