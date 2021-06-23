const router = require("express").Router();

router.get('/shows', (req, res) => {
    res.render("admin/shows/index");
});

router.get('/shows/add', (req, res) => {
    res.render("admin/shows/add");
});

module.exports = router;