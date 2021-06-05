const TheaterClusters = require('../../models/theater_clusters');
const User = require('../../models/user');
const Ticket = require('../../models/ticket');
const Booking = require('../../models/booking');
const Showtimes = require('../../models/showtimes');

//INDEX
exports.getIndex = async (req, res, next) => {
    res.locals.theaterClusterList = await TheaterClusters.findAll({order: [['id', 'ASC']]});
    res.render("admin/theater-clusters/index");
};


//ADD
exports.getAdd = (req, res, next) => {
    res.render("admin/theater-clusters/add");
}

exports.postAdd = async (req, res, next) => {
    try {
        const { name, address } = req.body;

        const found = await TheaterClusters.findOne({
            where: {
              name: name
            }
        });
        if(found) throw new Error('Theater Clusters already exist');

        //else
        await TheaterClusters.create({
            name: name,
            address: address
        });
        req.session.toastMessage = { title: "Thành Công", msg: "Thêm cụm rạp thành công!" };
        res.redirect('/admin/theater-clusters');         
    } catch(e) {
        res.locals.toastMessage = { title: "Thất Bại", msg: "Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!" }; 
        res.render("admin/theater-clusters/add");      
    } 
}


//DETAIL
exports.getDetail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updateTheaterClusters = await TheaterClusters.findByPk(id);
        if(!updateTheaterClusters) throw new Error('Theater Clusters doesn"t exist');

        res.locals.theaterClusters = updateTheaterClusters;
        res.render("admin/theater-clusters/detail");
    } catch(e) {
        res.redirect("/admin/theater-clusters");
    }
}

exports.postDetail = async (req, res, next) => {
    try {
        const { id, name, address } = req.body;

        const updateTheaterClusters = await TheaterClusters.findByPk(id);
        if(!updateTheaterClusters) throw new Error('Theater Clusters doesn"t exist');

        updateTheaterClusters.name = name;
        updateTheaterClusters.address = address;
        await updateTheaterClusters.save();
        req.session.toastMessage = { title: "Thành Công", msg: "Cập nhật cụm rạp thành công!" };
        res.redirect('/admin/theater-clusters'); 
    } catch (e) {
        res.locals.toastMessage = { title: "Thất Bại", msg: "Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!" };
        res.locals.theaterClusters = await TheaterClusters.findByPk(req.body.id);
        res.render("admin/theater-clusters/detail");
    }
}


//DELETE
exports.getDelete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleteTheaterClusters = await TheaterClusters.findByPk(id);
        if(!deleteTheaterClusters) throw new Error('Theater Clusters doesn"t exist');

        await deleteTheaterClusters.destroy();
        req.session.toastMessage = { title: "Thành Công", msg: "Xóa cụm rạp thành công!" };
    } catch (e) {
        res.session.toastMessage = { title: "Thất Bại", msg: "Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!" };
    } finally {
        res.redirect("/admin/theater-clusters");
    } 
}