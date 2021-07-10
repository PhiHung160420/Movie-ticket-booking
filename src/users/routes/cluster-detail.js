const router = require("express").Router();
const clusterDetailController = require("../controllers/cluster-detail");

router.get("/cluster-detail", clusterDetailController.getClusterDetail);

module.exports = router;
