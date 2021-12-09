const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = [
    {
        email: 'tyler@gmail.com',
        username: 'tyler10',
        password: 'password'
    },
    {
        email: 'Kalee@gmail.com',
        username: 'kalee10',
        password: 'password'
    },
    {
        email: 'Adam@gmail.com',
        username: 'adam10',
        password: 'password'
    },
    {
        email: 'Kyle@gmail.com',
        username: 'kyle10',
        password: 'password'
    },
    {
        email: 'Nick@gmail.com',
        username: 'nick10',
        password: 'password'
    },
    {
        email: 'chris@gmail.com',
        username: 'chris10',
        password: 'password'
    },
]

const userSeeds = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = userSeeds;