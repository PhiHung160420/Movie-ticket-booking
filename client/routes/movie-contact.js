var router = require("express").Router();

router.get("/contact", (req, res) => {
  res.render("movie-contact");
});

module.exports = router;