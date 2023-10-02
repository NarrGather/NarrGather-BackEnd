const router = require("express").Router();

// import package swagger
const swaggerUi = require("swagger-ui-express");
// import file json
const swaggerDocument = require("../docs/swagger.json");

// api docs
router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

const Users = require("./users");
const Invitations = require("./invitations");
const ForYous = require("./foryous");
const Stories = require("./stories");
const Wishes = require("./wishes");
const Banks = require("./banks");

// API
router.use("/api/v1/user", Users);
router.use("/api/v1/invitation", Invitations);
router.use("/api/v1/foryous", ForYous);
router.use("/api/v1/stories", Stories);
router.use("/api/v1/wishes", Wishes);
router.use("/api/v1/banks", Banks);

module.exports = router;
