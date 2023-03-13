const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    user: {
      type: Object,
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
    foodDescription: {
      title: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      foodType: {
        type: String,
        required: true,
      },
      packaging: {
        type: Boolean,
        required: true,
      },
      foodPreprationTime: {
        type: String,
        required: true,
      },
      shortDescription: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model("food", foodSchema);

module.exports = Food;
