var router = require("express").Router();
const layoutAdmin = "users/layouts/layout";

router.get("/movie-checkout", (req, res) => {
  res.render(layoutAdmin, { path: "../movie-checkout" });
});

module.exports = router;
