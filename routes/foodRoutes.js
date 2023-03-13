const {
  addFoodOpt,
  getAllFoodOpt,
  deleteFoodOpt,
} = require("../responseOptions/foodOptions");

function foodRoutes(fastify, options, done) {
  fastify.post("/add", addFoodOpt);
  fastify.get("/all", getAllFoodOpt);
  fastify.delete("/delete/:id", deleteFoodOpt);

  done();
}

module.exports = foodRoutes;
