const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await Category.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = await Category.create({ name });

    res.status(201).json(category);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};