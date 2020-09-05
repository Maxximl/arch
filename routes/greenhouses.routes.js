const { Router } = require("express");
const Greenhouse = require("../models/Greenhouse");
const auth = require("../middleware/auth.middleware");

const router = Router();
const greenhousesController = require("../controllers/greenhouses");

router.get("/", auth, greenhousesController.getGreenhouses);

router.get("/:id", auth, greenhousesController.getGreenhouseById);

module.exports = router;
