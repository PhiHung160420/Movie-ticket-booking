const router = require("express").Router();

// router.use((req, res, next) => {
//     res.locals.layout = "admin/layouts/layout";
//     next();
// });

router.get('/login', (req, res) => {
    res.render("admin/auth/login", {
        layout: "admin/auth/login"
    });
});

module.exports = router;