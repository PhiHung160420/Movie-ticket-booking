const router = require("express").Router();

router.use((req, res, next) => {
    res.locals.layout = "admin/layouts/layout";
    next();
});

router.get('/movie', (req, res) => {
    res.render("admin/movie/index");
});

router.get('/movie/add', (req, res) => {
    res.render("admin/movie/add");
});

module.exports = router;