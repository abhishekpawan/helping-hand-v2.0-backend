const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const validate = require("../utils/validateData");
const generateToken = require("../utils/generateJWT");

const signupUser = async (req, reply) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return reply
        .status(400)
        .send({ success: false, message: error.details[0].message });
    }

    const { name, role, email, phone, password } = req.body;

    //checking is user alreasy exists
    const userEmailExists = await User.findOne({ email });
    const userPhoneExists = await User.findOne({ phone });

    if (userEmailExists) {
      return reply
        .status(409)
        .send({ success: false, message: "Email already exists!" });
    }
    if (userPhoneExists) {
      return reply
        .status(409)
        .send({ success: false, message: "Phone number already exists!" });
    }

    // Hash the passowrd
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email,
      phone,
      role,
      password: hashedPassword,
    });

    await user.save();

    if (user) {
      const userData = {
        _id: user._id,
        name: user.name,
        role: user.role,
        phone: user.phone,
        email: user.email,
      };
      reply
        .setCookie("token", generateToken(user._id), {
          path: "/",
          signed: true,
          httpOnly: true,
          secure: true,
          maxAge: 3600 * 24,
        })
        .status(201)
        .send({
          success: true,
          userData,
        });
    } else {
      reply.status(400).send({ success: false, message: "Invalid User Data" });
    }
  } catch (error) {
    reply.status(400).send({ success: false, message: error });
  }
};

const loginUser = async (req, reply) => {
  try {
    const { email, phone, role, password } = req.body;
    // check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const userData = {
        _id: user._id,
        name: user.name,
        role: user.role,
        phone: user.phone,
        email: user.email,
      };
      reply
        .setCookie("token", generateToken(user._id), {
          path: "/",
          signed: true,
          httpOnly: true,
          secure: true,
          maxAge: 3600 * 24,
        })
        .status(200)
        .send({
          success: true,
          userData,
        });


    } else {
      reply
        .status(400)
        .send({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    reply.status(400).send({ success: false, message: error });
  }
};

const logoutUser = async (req, reply) => {
  try {
    const _id = req.params.id;
    const user = await User.findOne({ _id });

    if (user) {
      reply.clearCookie("token", { path: "/" }).status(200).send({
        success: true,
        message: "User succesfully logged out!",
      });
    } else {
      reply.status(404).send({ success: false, message: "User not found!" });
    }
  } catch (error) {
    reply.status(400).send({ success: false, message: error });
  }
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
};
