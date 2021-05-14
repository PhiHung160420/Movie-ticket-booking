var router = require("express").Router();

router.get("/movie-detail", (req, res) => {
  res.render("movie-detail");
});

module.exports = router;