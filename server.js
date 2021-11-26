//Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
require('dotenv').config;

//Connect to Express
const app = express();
const PORT = process.env.PORT || 3301;


app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(require('./controllers'))

//Create session
const SequelizeStore = require('connect-session-sequelize')(session.store);

const sess = {
    secret: 'i hate secrets',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(session.sess));

//middleware
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//connection to sequelize and server
sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, function() { console.log('now listening on Port' + PORT)});
});