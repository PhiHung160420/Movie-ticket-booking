var router = require("express").Router();

router.get("/movie-ticket-plan", (req, res) => {
  res.render("movie-ticket-plan");
});

module.exports = router;