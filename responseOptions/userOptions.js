const {
  signupUser,
  loginUser,
  logoutUser,
} = require("../controller/userController");
const protect = require("../middleware/authMiddleware");

const signupUserOpt = {
  schema: {
    body: {
      type: "object",
      required: ["name", "email", "phone", "password", "role"],
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        password: { type: "string" },
        role: { type: "string" },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          userData: {
            type: "object",
            properties: {
              _id: { type: "string" },
              name: { type: "string" },
              email: { type: "string" },
              role: { type: "string" },
              phone: { type: "number" },
              // token: { type: "string" },
            },
          },
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
  handler: signupUser,
};

const loginUserOpt = {
  schema: {
    body: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          actionType: { type: "string" },
          userData: {
            type: "object",
            properties: {
              _id: { type: "string" },
              name: { type: "string" },
              email: { type: "string" },
              role: { type: "string" },
              phone: { type: "number" },
              // token: { type: "string" },
            },
          },
        },
      },
      400: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          statusCode: { type: "number" },
          message: { type: "string" },
        },
      },
      404: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
        },
      },
    },
  },
  handler: loginUser,
};

const logoutUserOpt = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
        },
      },
      400: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          statusCode: { type: "number" },
          message: { type: "string" },
        },
      },
      404: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
        },
      },
    },
  },
  preHandler: protect,
  handler: logoutUser,
};
module.exports = {
  loginUserOpt,
  signupUserOpt,
  logoutUserOpt,
};
