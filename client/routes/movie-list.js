var router = require("express").Router();

router.get("/movie-list", (req, res) => {
  res.render("movie-list");
});

module.exports = router;