const Event = require('../models/Event');

exports.getEventById = async (req, res) => {
  try {
    // getting the ID 
    const ID = req.params.id;
    

    // query
    const event = await Event.findById(ID)

    // total count
    res.json({event});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};