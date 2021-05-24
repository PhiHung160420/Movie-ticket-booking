const router = require('express').Router();
const theaterClustersController = require('../controllers/theater_clusters');
// INDEX
router.get("/theater-clusters", theaterClustersController.getIndex);

// ADD
router.get("/theater-clusters/add", theaterClustersController.getAdd);
router.post("/theater-clusters/add", theaterClustersController.postAdd);

// DETAIL
router.get("/theater-clusters/detail/:id", theaterClustersController.getDetail);
router.post("/theater-clusters/detail/:id", theaterClustersController.postDetail);

// DELETE
router.get("/theater-clusters/delete/:id", theaterClustersController.getDelete);

module.exports = router;