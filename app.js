const express = require("express");

const app = express();

const expressLayouts = require("express-ejs-layouts");

const bodyParser = require("body-parser");

app.use(express.json());

//express ejs-layouts
app.use(expressLayouts);
app.set('layout', './layouts/layout');

//use ejs
app.set("view engine", "ejs");

app.set("views", "./client/views");

//use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//khai báo static file
app.use('/User', express.static(__dirname + '/public'));

//use router for admin
app.use("/admin", require("./server/routes/router"));

//use router for user
app.use("/user", require("./client/routes/home"));
app.use("/user", require("./client/routes/movie-checkout"));
app.use("/user", require("./client/routes/movie-customer"));
app.use("/user", require("./client/routes/movie-detail"));
app.use("/user", require("./client/routes/movie-list"));
app.use("/user", require("./client/routes/movie-seat-plan"));
app.use("/user", require("./client/routes/movie-ticket-plan"));
app.use("/user", require("./client/routes/movie-contact")); 
app.use("/user", require("./client/routes/sign-in"));
app.use("/user", require("./client/routes/sign-up")); 


app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
