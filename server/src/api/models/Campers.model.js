const mongoose = require("mongoose");

const CamperSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    images: { type: Array },
    // image_indoor: { type: String },

    // model: { type: String, required: true, unique: true },
    // description: { type: String, required: true, unique: true },
    // price: { type: Number, required: true },
    // bail: { type: Number, required: true },
    // year: { type: Number, required: true },
    //reservas e imagenes
  },
  {
    timestamps: true,
  }
);

const Camper = mongoose.model("Camper", CamperSchema);

module.exports = Camper;
