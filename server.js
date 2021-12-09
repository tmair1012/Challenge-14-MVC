//Dependencies
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
require('dotenv').config;

//Connect to Express
const app = express();
const PORT = process.env.PORT || 3301;


app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.use(require('./controllers'))

//Create session
const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
 
const sess = {
    secret: 'i hate secrets',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));


//middlewar
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'handlebars');


app.use(require('./controllers'));

//connection to sequelize and server
sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log('now listening on Port' + PORT));
});