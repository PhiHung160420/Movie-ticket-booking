const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");

const db = require('./src/config/database/db');
const setLayoutMiddleware = require('./src/admin/middlewares/set_layout');

const theaterClustersRouter = require('./src/admin/routes/theater_clusters');

const app = express();

//get connection database
const db = require("./src/config/database/db");

app.use(express.json());
//Session
app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_KEY || 'secret'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

//express ejs-layouts
app.use(expressLayouts);

//use ejs
app.set("view engine", "ejs");

app.set("views", "./views");

//use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//khai báo static file
app.use(express.static(__dirname + "/public"));

//use router for admin
app.use("/admin", setLayoutMiddleware);
app.use("/admin", require("./src/admin/routes/login"));
app.use("/admin", require("./src/admin/routes/home"));
app.use("/admin", theaterClustersRouter);
app.use("/admin", require("./src/admin/routes/theater"));
app.use("/admin", require("./src/admin/routes/movie"));
app.use("/admin", require("./src/admin/routes/shows"));

//use router for user
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

