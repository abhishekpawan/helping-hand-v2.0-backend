const Food = require("../models/foodModel");

//add food
const addFood = async (req, reply) => {
  try {
    const newFood = new Food({
      user: req.user,
      ...req.body,
    });
    await newFood.save();
    reply.status(201).send({ success: true, data: newFood });
  } catch (error) {
    console.log(error);

    reply.status(400).send({ success: false, message: error });
  }
};

const getAllFood = async (req, reply) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    let totalFoods = await Food.count();
    const totalPages = parseInt(totalFoods / limit) + 1;

    const data = await Food.find({})
      .lean()
      .sort({ timestamp: "descending" })
      .limit(limit)
      .skip(skip);
    reply.status(200).send({ success: true, data, totalPages });
  } catch (error) {
    reply.status(400).send({ success: false, message: error });
  }
};

const deleteFood = async (req, reply) => {
  try {
    const _id = req.params.id;
    const food = await Food.findOneAndDelete({ _id });
    if (!food) {
      return reply
        .status(404)
        .send({ success: false, message: "Food not found!" });
    }
    reply.status(200).send({ success: true, data: food });
  } catch (error) {
    reply.status(400).send({ success: false, message: error });
  }
};
module.exports = { addFood, getAllFood, deleteFood };
