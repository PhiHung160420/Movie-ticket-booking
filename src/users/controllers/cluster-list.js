const asyncHandler = require("express-async-handler");

exports.getListCluster = asyncHandler(async (req, res) => {
    res.render("users/cluster-list");
});
