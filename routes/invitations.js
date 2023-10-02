const router = require("express").Router();

// controller
const Invitations = require("../controller/invitationsController");

// middleware
// const Uploader = require("../middlewares/uploaders");
const Uploader = require("../middlewares/uploaders");
const Authentication = require("../middlewares/authenticate");

// API
// router.get("/byUrlCouple", Invitations.getInvitationByUrlCouple);
router.get("/search/:urlCouple", Invitations.getInvitationByUrlCouple);

router.post(
  "/create-invitations",
  Authentication,
  Uploader.single("image"),
  Invitations.createInvitations
);
router.get("/:id", Invitations.getInvitationsById);
router.get("/", Authentication, Invitations.getAllInvitations);
router.put(
  "/:id",
  Authentication,
  Uploader.single("image"),
  Invitations.updateInvitations
);
router.delete("/:id", Authentication, Invitations.deleteInvitations);

// router.get("/search/:depart/:arrive", flightController.getFlightByAirport);

module.exports = router;
