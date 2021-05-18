const router = require("express").Router();

router.use((req, res, next) => {
    res.locals.layout = "admin/layouts/layout";
    next();
});

router.get('/theater-clusters', (req, res) => {
    res.render("admin/theater-clusters/index");
});

router.get('/theater-clusters/add', (req, res) => {
    res.render("admin/theater-clusters/add");
});

module.exports = router;