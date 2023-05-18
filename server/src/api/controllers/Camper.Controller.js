const Camper = require("../models/Campers.model");

const create = async (req, res, next) => {
  try {
    //const newCamper = new Camper(req.body);
    req.files.forEach((element) => {
      console.log(element.path);
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { create };
