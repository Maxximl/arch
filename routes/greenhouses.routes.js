const { Router } = require("express");
const Greenhouse = require("../models/Greenhouse");
const auth = require("../middleware/auth.middleware");

const router = Router();

router.get("/", auth, async (req, res) => {
  try {
      console.log(req.user.userId);
      
    const greenhouses = await Greenhouse.find({owner: req.user.userId});
    res.json(greenhouses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", auth, async (req, res) => {
    try {
        console.log(req.body.name);
        
      const greenhouses = await Greenhouse.deleteOne({name: req.body.name});
      res.json(greenhouses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// router.get("/:id", auth,  async (req, res) => {
//   try {
//     const link = await Link.findById(req.params.id);
//     res.json(link);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });



module.exports = router;
