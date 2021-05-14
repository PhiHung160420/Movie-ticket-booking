var router = require("express").Router();

router.get("/movie-customer-profile", (req, res) => {
  res.render("movie-customer");
});

module.exports = router;