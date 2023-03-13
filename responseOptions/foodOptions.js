const {
  addFood,
  getAllFood,
  deleteFood,
} = require("../controller/foodController");
const protect = require("../middleware/authMiddleware");

const addFoodOpt = {
  schema: {
    response: {
      201: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          data: {},
        },
      },
      400: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
        },
      },
    },
  },
  preHandler: [protect],
  handler: addFood,
};

const getAllFoodOpt = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          data: {
            type: "array",
          },
          totalPages: { type: "number" },
        },
      },
      400: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
        },
      },
    },
  },
  preHandler: [protect],
  handler: getAllFood,
};

const deleteFoodOpt = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          data: {},
        },
      },
      400: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
        },
      },
    },
  },
  preHandler: [protect],
  handler: deleteFood,
};
module.exports = { addFoodOpt, getAllFoodOpt, deleteFoodOpt };
