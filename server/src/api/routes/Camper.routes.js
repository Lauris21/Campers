const { upload } = require("../../middleware/files.cloudinary");
const { create } = require("../controllers/Camper.Controller");

const CamperRoutes = require("express").Router();

CamperRoutes.post("/", upload.single("image"), create);

module.exports = CamperRoutes;
