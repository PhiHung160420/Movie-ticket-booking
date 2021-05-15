var router = require("express").Router();
const layoutAdmin = "users/layouts/layout";

router.get("/movie-detail", (req, res) => {
  res.render(layoutAdmin, { path: "../movie-detail" });
});

module.exports = router;
