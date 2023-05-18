const { upload } = require("../../middleware/files.cloudinary");
const {
  create,
  getAll,
  getById,
  getByName,
  updateUser,
  deleteUser,
} = require("../controllers/User.controllers");

const UserRoutes = require("express").Router();

UserRoutes.post("/", upload.single("image"), create);
UserRoutes.get("/", getAll);
UserRoutes.get("/:id", getById);
UserRoutes.get("/name/:name", getByName);
UserRoutes.patch("/:id", upload.single("image"), updateUser);
UserRoutes.delete("/:id", deleteUser);

module.exports = UserRoutes;
