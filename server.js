const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');

//Introducing helpers
const hbs = exphbs.create({
    helpers
});

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Session Information and setting the timeouts 
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 1000 * 60 * 10, // will check every 10 minutes
        expiration: 1000 * 60 * 30 // will expire after 30 minutes
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

//Introducing Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Session is created and accessed to the public folder
app.use(session(sess));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(routes);

sequelize.sync();

//Port Listen
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});