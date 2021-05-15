var router = require("express").Router();
const layoutAdmin = "users/layouts/layout";

router.get("/movie-ticket-plan", (req, res) => {
  res.render(layoutAdmin, { path: "../movie-ticket-plan" });
});

module.exports = router;
