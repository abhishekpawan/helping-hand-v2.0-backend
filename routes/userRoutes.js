const {
  loginUserOpt,
  signupUserOpt,
  logoutUserOpt,
} = require("../responseOptions/userOptions");

function userRoutes(fastify, options, done) {
  fastify.post("/login", loginUserOpt);
  fastify.post("/signup", signupUserOpt);
  fastify.post("/logout/:id", logoutUserOpt);

  done();
}

module.exports = userRoutes;
