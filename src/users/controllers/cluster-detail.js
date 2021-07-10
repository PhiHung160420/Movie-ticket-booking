const asyncHandler = require("express-async-handler");

exports.getClusterDetail = asyncHandler(async (req, res) => {
    res.render("users/cluster-detail");
});