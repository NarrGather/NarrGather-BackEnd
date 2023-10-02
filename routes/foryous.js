const router = require("express").Router();

// controller
const ForYous = require("../controller/foryousController");

// middleware
// const Uploader = require("../middlewares/uploaders");
const Authentication = require("../middlewares/authenticate");

// API
router.post("/create-foryous", Authentication, ForYous.createForYous);
router.get("/:id", ForYous.getForYousById);
router.get("/", ForYous.getAllForYous);
router.put("/:id", ForYous.updateForYous);
router.delete("/:id", ForYous.deleteForYous);
router.get("/search/:name", ForYous.getForYousByName);
// router.get("/search/:depart/:arrive", flightController.getFlightByAirport);

module.exports = router;
