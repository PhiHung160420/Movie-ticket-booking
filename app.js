const express = require("express");

const expressLayouts = require("express-ejs-layouts");

const cookieSession = require("cookie-session");

const bodyParser = require("body-parser");

const passport = require('passport');

const authMiddlewares = require("./src/users/middlewares/auth");

const setLayoutMiddleware = require("./src/admin/middlewares/set_layout");

const flash = require('express-flash');

const theaterClustersRouter = require("./src/admin/routes/theater_clusters");

const theaterRouter = require("./src/admin/routes/theater");

const movieRouter = require("./src/admin/routes/movie");

const app = express();

var session = require('express-session')

const User = require("./src/models/user");


const FacebookStrategy = require('passport-facebook').Strategy;
const FACEBOOK_APP_ID = '327168129007877';
const FACEBOOK_APP_SECRET = '69f3b6032555944d0337b80b486bf403';


passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/user/sign-in/facebook/callback",
  profileFields: ['id', 'emails', 'name', 'displayName']
},
function(accessToken, refreshToken, profile, done) {
  User.findOne({
      where: {
          user_email: profile.emails[0].value,
      },
  }).then(async function (user) {
    console.log(user);
    console.log(profile);
      if(!user)
      {
          user = await User.create({
              user_email:  profile.emails[0].value,
              user_facebookid: profile.id,
              user_name: profile.displayName,
              user_verify: true
          });
      }
      user.user_facebookid = profile.id;
      user.user_verify = true;
      user.user_accessToken = accessToken;
      await user.save();
      done(null, user);
  }).catch(done);
}
));

passport.serializeUser(function(user, done) {
  done(null, user.user_facebookid);
});

passport.deserializeUser(function(facebookid, done) {
  User.findOne({where:{"user_facebookid":facebookid}}).then(function (user){
      done(null, user);
  }).catch(done); 
});

app.use(session({
    secret: 'secret', 
    cookie: { maxAge: 24*60*60*1000  }})); 
app.use(passport.initialize());
app.use(passport.session());

//get connection database
const db = require("./src/config/database/db");

app.use(express.json());
app.use(express.urlencoded({extended: false})); 

//session 
// app.use(cookieSession({
//   name: 'session',
//   keys: [process.env.COOKIE_KEY || 'secret'],
//   maxAge: 24*60*60*1000
// }));

app.use(flash());

//get middlewares 
const getMiddlewares = require('./src/users/middlewares/middleware');
app.use(getMiddlewares);

app.use(authMiddlewares);

//express ejs-layouts
app.use(expressLayouts);

//use ejs
app.set("view engine", "ejs");

app.set("views", "./views");

//khai báo static file
app.use(express.static(__dirname + "/public"));

// use body-parser
// app.use(bodyParser.urlencoded({  extended: false })); 
// app.use(bodyParser.json());


//use router for admin
app.use("/admin", setLayoutMiddleware);
app.use("/admin", require("./src/admin/routes/login"));
app.use("/admin", require("./src/admin/routes/home"));
app.use("/admin", theaterClustersRouter);
app.use("/admin", theaterRouter);
app.use("/admin", movieRouter);
app.use("/admin", require("./src/admin/routes/theater"));
app.use("/admin", require("./src/admin/routes/shows"));

//use router for user
//app.use("/user", getMiddlewares);
app.use("/user", require("./src/users/routes/home"));
app.use("/user", require("./src/users/routes/movie-checkout"));
app.use("/user", require("./src/users/routes/movie-customer"));
app.use("/user", require("./src/users/routes/movie-detail"));
app.use("/user", require("./src/users/routes/movie-list"));
app.use("/user", require("./src/users/routes/movie-seat-plan"));
app.use("/user", require("./src/users/routes/movie-ticket-plan"));
app.use("/user", require("./src/users/routes/movie-contact"));
app.use("/user", require("./src/users/routes/sign-in"));
app.use("/user", require("./src/users/routes/sign-up"));
app.use("/user", require("./src/users/routes/forgot"));
app.use("/user", require("./src/users/routes/edit-info"));
app.use("/user", require("./src/users/routes/change-password"));

//connect to postgres
db.sync()
  .then(function () {
    app.listen(process.env.PORT || 3000, function () {
      console.log(
        "Express server listening on port %d in %s mode",
        this.address().port,
        app.settings.env
      );
    });
  }).catch(console.error);
