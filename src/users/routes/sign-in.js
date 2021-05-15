var router = require("express").Router();
const layoutAdmin = "users/layouts/layout";

router.get("/sign-in", (req, res) => {
  res.render(layoutAdmin, { path: "../sign-in" });
});

module.exports = router;
