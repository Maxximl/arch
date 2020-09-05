const { Router } = require("express");

const auth = require("../middleware/auth.middleware");
const router = Router();
const greenhousesController = require('../controllers/greenhouses');

router.post("/greenhouses/create", auth, greenhousesController.createGreenhouse);

router.put("/greenhouses", auth, greenhousesController.editGreenhouse);

router.get("/greenhouses", auth, greenhousesController.getGreenhouses);

router.get("/:id", auth, greenhousesController.getGreenhouseById)

router.delete("/greenhouses", auth, greenhousesController.deleteGreenhouses);

module.exports = router;
