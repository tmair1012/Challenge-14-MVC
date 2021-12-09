//import models
const Post = require('./post');
const User = require('./user');
const Comment = require('./Comment');


//Post belongsTo Users
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

//User has many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})


User.hasMany(Comment, {
    foreignKey: 'user_id'
})

Post.hasMany(Comment, {
    foreignKey: 'post_id'
})
module.exports = { User, Post, Comment };