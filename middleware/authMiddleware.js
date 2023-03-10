const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, reply, next) => {
  // NOTE: Exclude TRACE and TRACK methods to avoid XST attacks.
  const allowedMethods = [
    "OPTIONS",
    "HEAD",
    "CONNECT",
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
  ];

  if (!allowedMethods.includes(req.method)) {
    reply.status(405).send(`${req.method} not allowed.`);
  }

  if (req.cookies.token) {
    try {
      let token;
      // Get token from header
      token = req.cookies.token;
      token = req.unsignCookie(req.cookies.token);

      if (token.valid) {
        const { value } = token;
        // Verify the token
        const decoded = jwt.verify(value, process.env.JWT_SECRET);
        // Get user from the token
        req.user = await User.findById(decoded.id);
      } else {
        throw new Error("Invalid token value");
      }
    } catch (error) {
      console.error(error);
      reply.status(401).send();
    }
  } else {
    console.error("No token provided");
    reply.status(401).send();
  }
};

module.exports = protect;
