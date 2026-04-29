const Event = require('../models/Event');

exports.deleteEventById = async (req, res) => {
  try {
    // getting the ID 
    const ID = req.params.id;
    

    // query
    const event = await Event.findByIdAndDelete(ID)

    // total count
    res.status(204);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};