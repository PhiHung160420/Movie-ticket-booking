const TheaterClusters = require('../../models/theater_clusters');
const User = require('../../models/user');
const Ticket = require('../../models/ticket');
const Booking = require('../../models/booking');
const Showtimes = require('../../models/showtimes');
const Cluster_images = require('../../models/cluster_images');
const Theater = require('../../models/theater');

//INDEX
exports.getIndex = async (req, res, next) => {
    if(req.session.user_role == true) {
        const theaterClusterList = await TheaterClusters.findAll({order: [['id', 'ASC']]});
    
        theaterClusterList.forEach((e) => {
            e.picture = Buffer.from(e.picture, "binary").toString("base64");
        });

        res.render("admin/theater-clusters/index", {theaterClusterList});
    }
    else {
        res.redirect("/user");
    }
};

// UPLOAD
let listUpload = [];

exports.postUpload = async (req, res, next) => {
    if(req.files)
    {
        const files = req.files;
        files.forEach(e => listUpload.push(e.buffer));
        res.send(files);
    }
    else
    {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
};

//ADD
exports.getAdd = (req, res, next) => {
    if(req.session.user_role == true) {
        res.render("admin/theater-clusters/add");
    }
    else {
        res.redirect("/user");
    }
}

exports.postAdd = async (req, res, next) => {
    try {
        const { name, address } = req.body;

        const found = await TheaterClusters.findOne({
            where: {
              name,
            }
        });

        if(found)
        {
            res.locals.toastMessage = { title: "Thất Bại", msg: "Đã tồn tại cụm rạp này!" }; 
            res.render("admin/theater-clusters/add"); 
        }
        else
        {
            if(listUpload.length === 0)
            {
                res.locals.toastMessage = { title: "Thất Bại", msg: "Hãy chọn tối thiểu 1 hình ảnh cho cụm rạp!" }; 
                res.render("admin/theater-clusters/add");
            }
            else if(!name || !address)
            {
                listUpload.length = 0;
                res.locals.toastMessage = { title: "Thất Bại", msg: "hãy điền đầy đủ tất cả thông tin cụm rạp!" }; 
                res.render("admin/theater-clusters/add");
            }
            else
            {
                const cluster = await TheaterClusters.create({
                    name,
                    address,
                    picture: listUpload[0]
                });

                listUpload.map( async (image) => {
                    const cluster_images = await Cluster_images.create({
                        cluster_id: cluster.id,
                        image
                    });

                });

                listUpload.length = 0;
                req.session.toastMessage = { title: "Thành Công", msg: "Thêm cụm rạp thành công!" };
                res.redirect('/admin/theater-clusters');    
            }
        }        
    } catch(e) {
        listUpload.length = 0;
        res.locals.toastMessage = { title: "Thất Bại", msg: "Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!" }; 
        res.render("admin/theater-clusters/add");      
    } 
}

//DETAIL
exports.getDetail = async (req, res, next) => {
    if(req.session.user_role == true) {
        try {
        const { id } = req.params;

        const theaterClusters = await TheaterClusters.findByPk(id);

        if(!theaterClusters)
        {
            req.session.toastMessage = { title: "Thông báo", msg: "Không tồn tại cụm rạp!" };
            res.redirect('/admin/theater-clusters');
        }
        else
        {
            theaterClusters.picture = Buffer.from(theaterClusters.picture, "binary").toString("base64");

            res.render("admin/theater-clusters/detail", {theaterClusters});
        }
        } catch(e) {
            res.redirect("/admin/theater-clusters");
        }
    }
    else {
        res.redirect("/user");
    }
}

exports.postDetail = async (req, res, next) => {
    try {
        const { id, name, address } = req.body;

        const pictureUpdate = file.buffer;

        const updateTheaterClusters = await TheaterClusters.findByPk(id);

        if(!updateTheaterClusters)
        {
            req.session.toastMessage = { title: "Thông báo", msg: "Không tồn tại cụm rạp!" };
            res.redirect('/admin/theater-clusters'); 
        }
        else
        {
            updateTheaterClusters.name = name;
            updateTheaterClusters.address = address;
            updateTheaterClusters.picture = pictureUpdate;

            await updateTheaterClusters.save();

            req.session.toastMessage = { title: "Thành Công", msg: "Cập nhật cụm rạp thành công!" };
            res.redirect('/admin/theater-clusters'); 
        }
    } catch (e) {
        res.locals.toastMessage = { title: "Thất Bại", msg: "Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!" };
        res.locals.theaterClusters = await TheaterClusters.findByPk(req.body.id);
        res.render("admin/theater-clusters/detail");
    }
}


//DELETE
exports.getDelete = async (req, res, next) => {
    if(req.session.user_role == true) {
        try 
        {
            const { id } = req.params;

            const deleteTheaterClusters = await TheaterClusters.findByPk(id);

            const theater = await Theater.findOne({
                where: {
                    theater_cluster_id: id
                }
            });

            if(!deleteTheaterClusters)
            {
                req.session.toastMessage = { title: "Thất Bại", msg: "Cụm rạp không tồn tại!" };
                res.redirect("/admin/theater-clusters");
            }
            else if(theater)
            {
                req.session.toastMessage = { title: "Thất Bại", msg: "Không thể xoá do đã tồn tại rạp thuộc cụm rạp này!" };
                res.redirect("/admin/theater-clusters");
            }
            else
            {
                await deleteTheaterClusters.destroy();
                req.session.toastMessage = { title: "Thành Công", msg: "Xóa cụm rạp thành công!" };
                res.redirect("/admin/theater-clusters");
            }
        } 
        catch (e) 
        {
            req.session.toastMessage = { title: "Thất Bại", msg: "Không thể xoá cụm rạp này do tồn tại ràng buộc dữ liệu!" };
            res.redirect("/admin/theater-clusters");
        } 
    }
    else {
        res.redirect("/user");
    }
}