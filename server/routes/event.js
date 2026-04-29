const express = require('express');
const router = express.Router();

const authorization = require("../middleware/authM");
const { createEvent } = require('../controllers/event');
const { registerToEvent } = require('../controllers/registration');
const { getEvents } = require('../controllers/showEvent');
const { getEventById } = require('../controllers/showEventById');
const { deleteEventById } = require('../controllers/deleteEvent');
const { updateEventById } = require('../controllers/updateEvent');


router.get('/', getEvents);
router.get('/:id', getEventById);
router.put('/:id', updateEventById);
router.delete('/:id', deleteEventById);
router.post('/', authorization, createEvent);
router.post('/:id/register', authorization, registerToEvent);
module.exports = router;