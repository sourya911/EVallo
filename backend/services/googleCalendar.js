// services/googleCalendar.js
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

const oAuth2Client = new OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'YOUR_REDIRECT_URL'
);

// services/googleCalendar.js

const createGoogleEvent = async (eventData) => {
  const event = {
    summary: eventData.title,
    description: eventData.description,
    start: {
      dateTime: new Date(eventData.date).toISOString(),
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: new Date(eventData.date).toISOString(),
      timeZone: 'America/Los_Angeles',
    },
    attendees: eventData.participants.map(email => ({ email })),
  };

  const response = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
  });

  return response.data;
};

const updateGoogleEvent = async (eventId, eventData) => {
  const event = {
    summary: eventData.title,
    description: eventData.description,
    start: {
      dateTime: new Date(eventData.date).toISOString(),
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: new Date(eventData.date).toISOString(),
      timeZone: 'America/Los_Angeles',
    },
    attendees: eventData.participants.map(email => ({ email })),
  };

  const response = await calendar.events.update({
    calendarId: 'primary',
    eventId: eventId,
    resource: event,
  });

  return response.data;
};

const deleteGoogleEvent = async (eventId) => {
  await calendar.events.delete({
    calendarId: 'primary',
    eventId: eventId,
  });
};

module.exports = { createGoogleEvent, updateGoogleEvent, deleteGoogleEvent };

module.exports = oAuth2Client;
