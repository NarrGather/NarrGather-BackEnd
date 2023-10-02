const router = require("express").Router();

// controller
const Banks = require("../controller/banksController");

// middleware
// const Uploader = require("../middlewares/uploaders");
const Authentication = require("../middlewares/authenticate");
const Uploader = require("../middlewares/uploaders");

// API
router.post(
  "/create-banks",
  Authentication,
  Uploader.single("image"),
  Banks.createBanks
);
// router.get("/:id", ForYous.getForYousById);
router.get("/", Banks.getAllBanks);
// router.put("/:id", ForYous.updateForYous);
router.delete("/:id", Banks.deleteBanks);
// router.get("/search/:name", ForYous.getForYousByName);
// router.get("/search/:depart/:arrive", flightController.getFlightByAirport);

module.exports = router;
