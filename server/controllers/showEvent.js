const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  try {
    // pagination params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    // filtering
    let filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // query
    const events = await Event.find(filter)
      .populate('category', 'name')
      .populate('createdBy', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // total count
    const total = await Event.countDocuments(filter);

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalEvents: total,
      events
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};