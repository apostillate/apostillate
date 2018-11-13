//
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors');
const passport = require('passport');
const http = require('http');
const passportMethods = require('./actions/passport');
const app = require('express')();
const routes = require('./routes/index');
const path = require('path');
require('dotenv').config({
    path: path.resolve(process.cwd(), '../.env')
})
//

passport.use(passportMethods.authStrategy);
passport.serializeUser(passportMethods.serializeUser);
passport.deserializeUser(passportMethods.deserializeUser);
/*app.use(cors({
    credentials: true,
    origin: 'http://localhost:9000'
}));*/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
       
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new (require('connect-pg-simple')(session))({
        pool:require('./middlewares/database').pool
    }),
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
const server = http.createServer(app);
server.listen(process.env.PORT ? process.env.PORT : 8000);