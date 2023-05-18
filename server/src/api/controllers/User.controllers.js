const { deleteImgCloudinary } = require("../../middleware/files.cloudinary.js");
const User = require("../models/User.model.js");

const create = async (req, res, next) => {
  try {
    await User.syncIndexes();
    const newUser = new User(req.body);
    newUser.image = req.file.path;

    const saveUser = await newUser.save();

    if (saveUser) {
      return res.status(200).json(saveUser);
    } else {
      return res.status(400).json("Error en la creación del usuario");
    }
  } catch (error) {
    if (req.path.file) {
      deleteImgCloudinary(req.path.file);
    }
    return next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const allUser = await User.find();
    if (allUser) {
      return res.status(200).json(allUser);
    } else {
      return res.status(404).json("Not found all users");
    }
  } catch (error) {
    return next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userById = await User.findById(id);
    if (userById) {
      return res.status(200).json(userById);
    } else {
      return res.status(404).json("User by ID not found ❌");
    }
  } catch (error) {
    return next(error);
  }
};

const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;

    const userByName = await User.find({ name });

    if (userByName) {
      return res.status(200).json(userByName);
    } else {
      res.status(404).json("User by Name not found ❌");
    }
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  let catchImage = req.file?.path;
  try {
    const { id } = req.params;

    const userById = await User.findById(id);

    const oldImage = userById.image;

    if (userById) {
      const updateUser = new User(req.body);
      updateUser._id = id;

      if (req.file) {
        updateUser.image = req.file.path;
      } else {
        updateUser.image = oldImage;
      }

      const saveUSer = await User.findByIdAndUpdate(id, updateUser);

      if (saveUSer) {
        if (oldImage) {
          deleteImgCloudinary(oldImage);
        }

        return res.status(200).json(await User.findById(id));
      } else {
        return res.status(404).json("Dont update User ❌");
      }
    } else {
      return res.status(404).json("Dont found user ❌");
    }
  } catch (error) {
    if (req.file) {
      deleteImgCloudinary(catchImage);
    }
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteUser = await User.findByIdAndDelete(id);

    if (deleteUser) {
      if (await User.findById(id)) {
        next("Error of delete image");
      } else {
        deleteImgCloudinary(deleteUser.image);
      }
      return res.status(200).json({
        deleteObject: deleteUser,
        test: (await User.findById(id)) ? "Delete Error ❌" : "Delete OK ✅",
      });
    } else {
      return res.status(404).json("Not found user, delete ERROR ❌");
    }
  } catch (error) {
    return next(error);
  }
};
module.exports = { create, getAll, getById, getByName, updateUser, deleteUser };
