const router = require("express").Router();

router.get('/theater', (req, res) => {
    res.render("admin/theater/index");
});

router.get('/theater/add', (req, res) => {
    res.render("admin/theater/add");
});

module.exports = router;