const router = require("express").Router();

router.use((req, res, next) => {
    res.locals.layout = "admin/layouts/layout";
    next();
});

router.get('/theater', (req, res) => {
    res.render("admin/theater/index");
});

router.get('/theater/add', (req, res) => {
    res.render("admin/theater/add");
});

module.exports = router;