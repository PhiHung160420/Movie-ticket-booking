var router = require("express").Router();
const layoutAdmin = "users/layouts/layout";

router.get("/movie-list", (req, res) => {
  res.render(layoutAdmin, { path: "../movie-list" });
});

module.exports = router;
