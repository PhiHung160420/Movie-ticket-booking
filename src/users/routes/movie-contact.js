var router = require("express").Router();
const layoutAdmin = "users/layouts/layout";

router.get("/contact", (req, res) => {
  res.render(layoutAdmin, { path: "../movie-contact" });
});

module.exports = router;
