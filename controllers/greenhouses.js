const Greenhouse = require("../models/Greenhouse");

exports.createGreenhouse = async (req, res) => {
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
      owner: req.user.userId,
    });

    await greenhouse.save();
    res.status(201).json({ greenhouse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editGreenhouse = async (req, res) => {
  try {
    const { name, description, imgData, fileName } = req.body;
    const filter = { name };
    const update = { description, imgData, fileName };
    const result = await Greenhouse.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
      rawResult: true,
    });

    if (result) {
      const greenhouses = await Greenhouse.find({ owner: req.user.userId });
      res.json(greenhouses);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGreenhouses = async (req, res) => {
  try {
    const greenhouses = await Greenhouse.find({ owner: req.user.userId });
    res.json(greenhouses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteGreenhouses = async (req, res) => {
  try {
    const greenhouses = await Greenhouse.deleteOne({ _id: req.body.id });
    res.json(greenhouses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGreenhouseById = async (req, res) => {
  try {
    const greenhouse = await Greenhouse.findById(req.params.id);
    res.json(greenhouse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
