var express =           require('express')
    , http =            require('http')
    , passport =        require('passport')
    , path =            require('path')
    , morgan =          require('morgan')
    , bodyParser =      require('body-parser')
    , methodOverride =  require('method-override')
    , cookieParser =    require('cookie-parser')
    , cookieSession =   require('cookie-session')
    , session =         require('express-session')
    , csrf =            require('csurf')
    , User =            require('./server/models/User.js');

var app = module.exports = express();

app.set('views', __dirname + '/build/');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'client')));
app.use(cookieParser());
app.use(session(
    {
        secret: process.env.COOKIE_SECRET || "Superdupersecret"
    }));

var env = process.env.NODE_ENV || 'development';
if ('development' === env || 'production' === env) {
    app.use(csrf());
    app.use(function(req, res, next) {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        next();
    });
}

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.localStrategy);


passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

require('./routes.js')(app);

app.set('port', process.env.PORT || 8000);
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});