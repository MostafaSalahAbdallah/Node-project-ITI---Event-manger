const Event = require('../models/Event');
const Registration = require('../models/Regist');

exports.registerToEvent = async (req, res) => {
  try {
    const Joi = require('joi');

    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().required(),
      password: Joi.string().min(8).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }
    const eventId = req.params.id;
    const userId = req.user._id;

    //! 1. Find an Event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    //! 2. avoid registration twice in same event
    const alreadyRegistered = await Registration.findOne({
      user: userId,
      event: eventId
    });

    if (alreadyRegistered) {
      return res.status(400).json({
        message: 'You already registered for this event'
      });
    }

    //! 3. Count number of registred people in an event
    const count = await Registration.countDocuments({ event: eventId });

    if (count >= event.capacity) {
      return res.status(400).json({
        message: 'Event is full'
      });
    }

    //! 4. Create registration
    const registration = await Registration.create({
      user: userId,
      event: eventId
    });

    res.status(201).json({
      message: 'Registered successfully',
      registration
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
