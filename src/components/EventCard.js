import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} />
      <h3>{event.title}</h3>
      <p>Date: {event.date}</p>
      <p>Lieu: {event.location}</p>
      <p>Prix: {event.price} €</p>
    </div>
  );
};

export default EventCard;