const router = require('express').Router();
let User = require('../models/User');

router.route('/').post(async (req, res) => {
  const { id, name, picture } = req.body;

  try {
    let user = await User.findOne({ id });

    if (user) {
        res.status(201).json('User exists!');
    } else {
      const newUser = new User({ id, name, picture });
      await newUser.save();
      res.status(201).json('User added!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;