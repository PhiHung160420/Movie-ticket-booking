module.exports = (req, res, next) => {
    res.locals.layout = "users/layouts/layout";
    const {listShowtimes} = req.session;
    res.locals.getListShowtimes = null;

    if(listShowtimes)
    {
        res.locals.getListShowtimes = listShowtimes;
        req.getListShowtimes = listShowtimes;
        req.session.listShowtimes = null;
        next();
    }
    else
    {
        req.session.listShowtimes = null;
        res.locals.errors = req.flash('info');
        next();
    }
};