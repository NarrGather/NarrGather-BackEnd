const router = require("express").Router();

// controller
const Wishes = require("../controller/wishesController");

// middleware
// const Uploader = require("../middlewares/uploaders");
const Authentication = require("../middlewares/authenticate");

// API
router.post("/create-wishes", Wishes.createWishes);
router.get("/:id", Wishes.getWishesById);
router.get("/", Wishes.getAllWishes);
// router.put("/:id", ForYous.updateForYous);
router.delete("/:id", Wishes.deleteWishes);
// router.get("/search/:name", ForYous.getForYousByName);
// router.get("/search/:depart/:arrive", flightController.getFlightByAirport);

module.exports = router;
