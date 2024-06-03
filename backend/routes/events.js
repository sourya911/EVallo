// routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { createGoogleEvent, updateGoogleEvent, deleteGoogleEvent } = require('../services/googleCalendar');

// Create event
router.post('/events', async (req, res) => {
    try {
      const event = new Event(req.body);
      await event.save();
      
      const googleEvent = await createGoogleEvent(req.body);
      event.googleEventId = googleEvent.id;
      await event.save();
  
      res.status(201).send(event);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  

// Read events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find({});
    res.send(events);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update event
router.patch('/events/:id', async (req, res) => {
    try {
      const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!event) {
        return res.status(404).send();
      }
  
      if (event.googleEventId) {
        await updateGoogleEvent(event.googleEventId, req.body);
      }
  
      res.send(event);
    } catch (error) {
      res.status(400).send(error);
    }
  });

//  Delete event
 router.delete('/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).send();
    }

    if (event.googleEventId) {
      await deleteGoogleEvent(event.googleEventId);
    }

    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
 });

module.exports = router;
