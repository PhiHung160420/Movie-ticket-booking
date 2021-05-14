var router = require("express").Router();

router.get("/movie-seat-plan", (req, res) => {
  res.render("movie-seat-plan");
});

module.exports = router;