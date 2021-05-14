var router = require("express").Router();

router.get("/sign-in", (req, res) => {
  res.render("sign-in");
});

module.exports = router;