var router = require("express").Router();
const layoutAdmin = "users/layouts/layout";

router.get("/movie-customer-profile", (req, res) => {
  res.render(layoutAdmin, { path: "../movie-customer" });
});

module.exports = router;
