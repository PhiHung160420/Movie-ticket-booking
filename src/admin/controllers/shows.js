const Movies = require('../../models/movie');
const Theater = require('../../models/theater');
const Showtimes = require('../../models/showtimes');
const db = require('../../config/database/db');
//INDEX
exports.getIndex = async (req, res, next) => {
    if(req.session.user_role == true)
    {
        res.locals.showsList = await Showtimes.findAll({order: [['id', 'ASC']]});
        res.locals.movieList = await Movies.findAll({order: [['id', 'ASC']]});
        res.locals.theaterList = await Theater.findAll({order: [['id', 'ASC']]});
        res.render("admin/shows/index");
    }
    else
    {
        res.redirect("/user");
    }
};
exports.getAdd = async (req, res, next) => {
    if(req.session.user_role == true) {

        //get list movies
        res.locals.lstMovies = await Movies.findAll({
            attributes: [[db.fn("DISTINCT", db.col("name")), "name"], "id"],
        });

        //get list theater
        res.locals.lstTheater = await Theater.findAll({
            attributes: [[db.fn("DISTINCT", db.col("name")), "name"], "id"],
        });

        res.render("admin/shows/add");
    }
    else {
        res.redirect("/user");
    }
}

exports.postAdd = async (req, res, next) => {
    try {
        res.locals.lstMovies = await Movies.findAll({
            attributes: [[db.fn("DISTINCT", db.col("name")), "name"], "id"],
        });

        res.locals.lstTheater = await Theater.findAll({
            attributes: [[db.fn("DISTINCT", db.col("name")), "name"], "id"],
        });
        const {start, end, date, price,movieID, theaterID } = req.body;
        
        const found = await Showtimes.findOne({

            where:{
                movie_id : movieID,
                theater_id : theaterID,
                date : date,
                start_time: start,
                end_time : end,
            }

        });
        if(found) throw new Error('Suất chiếu đã tồn tại');
        
        //else
        await Showtimes.create({
            start_time : start,
            end_time : end,
            date:date,
            movie_id: movieID ,
            theater_id: theaterID,
            price: price,
        });
        req.session.toastMessage = { title: "Thành Công", msg: "Thêm suất chiếu thành công!" };
        res.redirect('/admin/shows');         
        
    } catch(e) {
        res.locals.toastMessage = { title: "Thất Bại", msg: "Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!" }; 
        res.render("admin/shows/add");      
    } 
}

//DETAIL
exports.getDetail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updateShowtime = await Showtimes.findByPk(id);
        if(!updateShowtime) throw new Error('Suất chiếu không tồn tại !');

        res.locals.Showtimes = updateShowtime;
        res.render("admin/shows/detail");
    } catch(e) {
        res.redirect("/admin/shows");
    }
}

exports.postDetail = async (req, res, next) => {
    try {
        const {date, start, end, price, movieID, theaterID} = req.body;
        

        const updateShowtime = await Showtimes.findByPk(id);
        if(!updateShowtime) throw new Error('Suất chiếu không tồn tại !');

        updateShowtime.start_time = start;
        updateShowtime.end_time = end;
        updateShowtime.movie_id = movieID;
        updateShowtime.theater_id = theaterID;
        updateShowtime.date = date;
        updateShowtime.price = price;
        await updateShowtime.save();
        req.session.toastMessage = { title: "Thành Công", msg: "Cập nhật suất chiếu thành công!" };
        res.redirect('/admin/shows'); 
    } catch (e) {
        res.locals.toastMessage = { title: "Thất Bại", msg: "Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!" };
        res.locals.Showtime = await Showtimes.findByPk(req.body.id);
        res.render("admin/shows/detail");
    }
}


//DELETE
exports.getDelete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleteShowtime = await Showtimes.findByPk(id);
        if(!deleteShowtime) throw new Error('Suất chiếu không tồn tại !');

        await deleteShowtime.destroy();
        req.session.toastMessage = { title: "Thành Công", msg: "Xóa suất chiếu thành công!" };
    } catch (e) {
        res.session.toastMessage = { title: "Thất Bại", msg: "Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!" };
    } finally {
        res.redirect("/admin/shows");
    } 
}