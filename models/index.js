//import models
const Post = require('./post');
const User = require('./user');

//Post belongsTo Users
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

//User has many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
})