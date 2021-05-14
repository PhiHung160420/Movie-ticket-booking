var router = require("express").Router();

router.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

module.exports = router;