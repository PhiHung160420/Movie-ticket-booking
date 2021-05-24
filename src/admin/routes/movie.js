const router = require("express").Router();

router.get('/movie', (req, res) => {
    res.render("admin/movie/index");
});

router.get('/movie/add', (req, res) => {
    res.render("admin/movie/add");
});

module.exports = router;