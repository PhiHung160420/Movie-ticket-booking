var router = require("express").Router();
const layoutAdmin = "users/layouts/layout";

router.get("/movie-seat-plan", (req, res) => {
  res.render(layoutAdmin, { path: "../movie-seat-plan" });
});

module.exports = router;
