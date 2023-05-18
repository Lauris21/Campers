const Camper = require("../models/Campers.model");

const create = async (req, res, next) => {
  try {
    const newCamper = new Camper(req.body);
    console.log(req.file);
  } catch (error) {
    return next(error);
  }
};

module.exports = { create };
