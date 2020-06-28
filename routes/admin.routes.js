const { Router } = require("express");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/create", auth, async (req, res) => {
  try {
    const { name, theme, level, date, games, owner } = req.body;

    const existing = await Quiz.findOne({ name });

    if (existing) {
      return res.json({ link: existing });
    }

    const quiz = new Quiz({
      name,
      theme,
      level,
      date,
      games,
      owner: req.user.userId,
    });

    await quiz.save();
    res.status(201).json({ quiz });
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
