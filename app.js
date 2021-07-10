// express
const express = require("express");

// app
const app = express();

// express layouts
const expressLayouts = require("express-ejs-layouts");

// cookie-session
const cookieSession = require("cookie-session");

// session
const session = require("express-session");

// body parser
const bodyParser = require("body-parser");

// passport
const passport = require("passport");

// flash
const flash = require("express-flash");
app.use(flash());

//express ejs-layouts
app.use(expressLayouts);

//use ejs
app.set("view engine", "ejs");
app.set("views", "./views");

//khai báo static file
app.use(express.static(__dirname + "/public"));

//get connection database
const db = require("./src/config/database/db");

// url admin
const URL_ADMIN = "./src/admin/routes";

// url user
const URL_USER = "./src/users/routes";

/* MIDDLEWARE USER */
const authMiddlewares = require("./src/users/middlewares/auth");
const getMiddlewares = require("./src/users/middlewares/middleware");
const moment = require("./src/users/middlewares/moment");
/* MIDDLEWARE USER */

/* MIDDLEWARE ADMIN */
const setLayoutMiddleware = require("./src/admin/middlewares/set_layout");
/* MIDDLEWARE ADMIN */

// model User
const User = require("./src/models/user");

/* LOGIN FACEBOOK */
const FacebookStrategy = require("passport-facebook").Strategy;
const FACEBOOK_APP_ID = "327168129007877";
const FACEBOOK_APP_SECRET = "69f3b6032555944d0337b80b486bf403";

passport.use(
    new FacebookStrategy(
        {
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: "http://localhost:3000/user/sign-in/facebook/callback",
            profileFields: ["id", "emails", "name", "displayName"],
        },
        function (accessToken, refreshToken, profile, done) {
            User.findOne({
                where: {
                    user_email: profile.emails[0].value,
                },
            })
                .then(async function (user) {
                    console.log(user);
                    console.log(profile);
                    if (!user) {
                        user = await User.create({
                            user_email: profile.emails[0].value,
                            user_facebookid: profile.id,
                            user_name: profile.displayName,
                            user_verify: true,
                        });
                    }
                    user.user_facebookid = profile.id;
                    user.user_verify = true;
                    user.user_accessToken = accessToken;
                    await user.save();
                    done(null, user);
                })
                .catch(done);
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.user_facebookid);
});

passport.deserializeUser(function (facebookid, done) {
    User.findOne({ where: { user_facebookid: facebookid } })
        .then(function (user) {
            done(null, user);
        })
        .catch(done);
});
/* LOGIN FACEBOOK */

// use session
app.use(
    session({
        secret: "secret",
        cookie: { maxAge: 24 * 60 * 60 * 1000 },
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* use middleware for user */
app.use("/user", getMiddlewares);
app.use("/user", authMiddlewares);
app.use("/user", moment);
/* use middleware for user */

/* use middleware for admin */
app.use("/admin", setLayoutMiddleware);
app.use("/admin", moment);
/* use middleware for admin */

/* use router for admin */
app.use("/admin", require(`${URL_ADMIN}/home`));
app.use("/admin", require(`${URL_ADMIN}/login`));
app.use("/admin", require(`${URL_ADMIN}/theater_clusters`));
app.use("/admin", require(`${URL_ADMIN}/theater`));
app.use("/admin", require(`${URL_ADMIN}/movie`));
app.use("/admin", require(`${URL_ADMIN}/theater`));
app.use("/admin", require(`${URL_ADMIN}/shows`));
/* use router for admin */

/* use router for user */
app.use("/user", require(`${URL_USER}/home`));
app.use("/user", require(`${URL_USER}/movie-checkout`));
app.use("/user", require(`${URL_USER}/movie-booking-success`));
app.use("/user", require(`${URL_USER}/movie-customer`));
app.use("/user", require(`${URL_USER}/movie-detail`));
app.use("/user", require(`${URL_USER}/movie-list`));
app.use("/user", require(`${URL_USER}/cluster-list`));
app.use("/user", require(`${URL_USER}/cluster-detail`));
app.use("/user", require(`${URL_USER}/ticket-list`));
app.use("/user", require(`${URL_USER}/movie-seat-plan`));
app.use("/user", require(`${URL_USER}/movie-ticket-plan`));
app.use("/user", require(`${URL_USER}/movie-contact`));
app.use("/user", require(`${URL_USER}/sign-in`));
app.use("/user", require(`${URL_USER}/sign-up`));
app.use("/user", require(`${URL_USER}/forgot`));
app.use("/user", require(`${URL_USER}/edit-info`));
app.use("/user", require(`${URL_USER}/change-password`));
/* use router for user */

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
    })
    .catch(console.error);
