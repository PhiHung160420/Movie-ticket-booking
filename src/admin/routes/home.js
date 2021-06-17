const router = require("express").Router();

router.get('/', (req, res) => {
    console.log(req.session.user_role);
    if(req.session.user_role == true)
    {
        res.render("admin/index");
    }
    else
    {
        res.redirect("/user");
    }
});

module.exports = router;