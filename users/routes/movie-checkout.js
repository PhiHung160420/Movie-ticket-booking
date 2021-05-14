var router = require("express").Router();

router.get("/movie-checkout", (req, res) => {
  res.render("movie-checkout");
});

module.exports = router;