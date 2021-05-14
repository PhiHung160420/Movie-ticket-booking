var router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Đây là trang Admin");
});

module.exports = router;
