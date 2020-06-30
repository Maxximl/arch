const { Router } = require("express");
const Greenhouse = require("../models/Greenhouse");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/greenhouses/create", auth, async (req, res) => {
  try {
    const { name, description, imgData, fileName } = req.body;
    const existing = await Greenhouse.findOne({ name });

    if (existing) {
      return res.json({ greenhouse: existing });
    }

    const greenhouse = new Greenhouse({
      name,
      description,
      imgData,
      fileName,
      owner: req.user.userId
    });

    await greenhouse.save();
    res.status(201).json({ greenhouse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/greenhouses/edit", auth, async (req, res) => {
  try {
    const { name, description, imgData, fileName } = req.body;
    const filter = {name};
    const update = {description, imgData, fileName};
    const result = await Greenhouse.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
      rawResult: true // Return the raw result from the MongoDB driver
    })
    
    if (result) {
      return res.json({ greenhouse: result });
    }

    // const greenhouse = new Greenhouse({
    //   name,
    //   description,
    //   imgData,
    //   fileName,
    //   owner: req.user.userId
    // });

    // await greenhouse.save();
    // res.status(201).json({ greenhouse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {  
    const quizes = await Quiz.find({ owner: req.user.userId });
    res.json(quizes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
