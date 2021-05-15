var router = require("express").Router();
const layoutAdmin = "users/layouts/layout";

router.get("/sign-up", (req, res) => {
  res.render(layoutAdmin, { path: "../sign-up" });
});

module.exports = router;
