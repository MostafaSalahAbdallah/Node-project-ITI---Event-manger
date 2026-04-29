const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    try {
        const Joi = require('joi');

        const schema = Joi.object({
            title: Joi.string().min(3).required(),
            description: Joi.string().allow(''),
            date: Joi.date().required(),
            category: Joi.string().required(),
            Limit: Joi.number().min(1).required()
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }
        const event = await Event.create({
            ...req.body,
            createdBy: req.user._id
        });

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};