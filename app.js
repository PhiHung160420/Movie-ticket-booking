const express = require("express");

const app = express();

const expressLayouts = require("express-ejs-layouts");

const bodyParser = require("body-parser");

app.use(express.json());

//express ejs-layouts
app.use(expressLayouts);

//use ejs
app.set("view engine", "ejs");

app.set("views", "./views");

//use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public", express.static("public"));

//use router admin
app.use("/admin", require("./server/routes/router"));

//use router client
app.use("/home", require("./client/routes/router"));

app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
