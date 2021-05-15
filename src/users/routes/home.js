var router = require("express").Router();
const layoutAdmin = "users/layouts/layout";

router.get("/home", (req, res) => {
  res.render(layoutAdmin, { path: "../home" });
});

module.exports = router;
