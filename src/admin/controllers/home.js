const { Op } = require('sequelize');
const db = require("../../config/database/db");
const asyncHandler = require("express-async-handler");
const moment = require('moment');
const Theater_clusters = require("../../models/theater_clusters");
const Movies = require("../../models/movie");
const Ticket = require("../../models/ticket");
const Booking = require("../../models/booking");
const Showtimes = require("../../models/showtimes");
const Theater = require("../../models/theater");

exports.getIndex = asyncHandler(async (req, res) => {
  //get list theater_clusters
  res.locals.lstTheaterCluster = await Theater_clusters.findAll({
    attributes: [[db.fn("DISTINCT", db.col("name")), "name"], 'id'],
  });

  //get list movies
  res.locals.lstMovies = await Movies.findAll({
    attributes: [[db.fn("DISTINCT", db.col("name")), "name"], 'id'],
  });
  res.render("admin/index");
});

//post statistics theater cluster
exports.postStatisticCluster = asyncHandler(async (req, res) => {
    const date_start_cluster = req.body.date_start;
    const date_end_cluster = req.body.date_end;
    const select_cluster = req.body.select_cluster;
    
    //get list theater by theater cluster id
    const getListTheater = await Theater.findAll({
      attributes: ['id', 'name'],
      where: {
        theater_cluster_id: select_cluster
      }
    });

    const listTheater = [];
    getListTheater.forEach(item => listTheater.push(item.id));

    const listBooking = await Booking.findAll({
      attributes: [
        [db.fn('COUNT', db.col('booking.id')), 'AmountTicket'],
        [db.fn('SUM', db.col('booking_price')), 'TotalPrice']
      ],
      include: [
        {
          model: Showtimes,
          where: {
            theater_id: listTheater
          },
          attributes: []
        }
      ],
      where: {
        booking_time: {
          [Op.between]: [date_start_cluster, date_end_cluster]
        }
      },
      group: ['booking.user_id'],
      raw:true
    });

    const lstResult = {};

    let ticket = 0;
    let price = 0;

    for (var i = 0; i < listBooking.length; i++) {
      ticket += parseInt(listBooking[i].AmountTicket);
      price += parseFloat(listBooking[i].TotalPrice);
    }

    lstResult.ticketTotal = String(ticket).replace(/(.)(?=(\d{3})+$)/g,'$1,');
    lstResult.priceTotal = price.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});

    return res.status(200).json(lstResult);
});
