const express = require("express");
const itemExpressRoute = express.Router();
let ItemSchema = require("../models/item.model");

// Get Remaining Days
itemExpressRoute
  .route("/getRemainingDays/:idBook")
  .put(async (req, res, next) => {
    let item = await ItemSchema.findOne({ idBook: req.params.idBook });
    if (!item) {
      item = await ItemSchema.create({ idBook: req.params.idBook });
    }

    // let order = {};

    // fetch(`www.exemple.com/getLastOrderByIdBook/${req.params.idBook}`)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     order = data;
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

    const order = {
      dateFin: '2023-12-11'
    }

    const updatedItem = {
      _id: item._id,
      idBook: req.params.idBook,
      daysRemaining: Math.floor(
        (new Date(order.dateFin).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      ),
    };

    if (updatedItem.daysRemaining < 0) {
      return await ItemSchema.findByIdAndDelete(item._id)
        .then(() => {
          res.json({ msg: "This Book is Available." });
        })
        .catch((err) => {
          return next(err);
        });
    } else {
      return await ItemSchema.findByIdAndUpdate(item._id, { $set: updatedItem })
        .then(() => {
          res.json(updatedItem);
        })
        .catch((err) => {
          return next(err);
        });
    }
  });

module.exports = itemExpressRoute;
