const router = require("express").Router();

router.use((req, res, next) => {
    res.locals.layout = "admin/layouts/layout";
    next();
});

router.get('/', (req, res) => {
    res.render("admin/index");
});

module.exports = router;