const router = require("express").Router();
const homeController = require("../controllers/home");

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

//statistic theater cluster
router.post("/statistic/theater-cluster", homeController.postStatisticCluster);

//statistic movies
router.post("/statistic/movies", homeController.postStatisticMovies);

module.exports = router;
