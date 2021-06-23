const Movie = require('../../models/movie');
const Theater = require('../../models/theater');
const Showtimes = require('../../models/showtimes');

//INDEX
exports.getIndex = async(req, res, next) => {
    res.locals.showsList = await Showtimes.findAll({order: [['id', 'ASC']]});
    res.locals.movieList = await Movie.findAll({order: [['id', 'ASC']]});
    res.locals.theaterList = await Theater.findAll({order: [['id', 'ASC']]});
    res.render("admin/shows/index");
};
exports.getAdd = (req, res, next) => {
    res.render("admin/shows/add");
}

exports.postAdd = async (req, res, next) => {
    try {
        const {start, end, price,movieID, theaterID } = req.body;
        
        const found = await Showtimes.findOne({

            where:{
                movie_id : movieID,
                theater_id : theaterID,
                // date : date,
                start : start,
                end : end
            }

        });
        if(found) throw new Error('Suất chiếu đã tồn tại');
        
        //else
        await Showtimes.create({
            start: start,
            end: end,
            // date:date,
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

        // updateTheater.theater_cluster_id = theater_cluster_id;
        updateShowtime.start = start;
        updateShowtime.end = end;
        updateShowtime.movie_id = movieID;
        updateShowtime.theater_id = theaterID;
        // updateShowtime.date = date;
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