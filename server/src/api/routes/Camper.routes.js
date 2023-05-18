const { upload } = require("../../middleware/files.cloudinary");
const { create } = require("../controllers/Camper.Controller");

const CamperRoutes = require("express").Router();

CamperRoutes.post("/", upload.array("images", 3), create);

module.exports = CamperRoutes;
