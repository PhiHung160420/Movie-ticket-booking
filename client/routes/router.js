var router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Đây là trang giao diện người dùng");
});

module.exports = router;
