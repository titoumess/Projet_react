import React, { useState } from 'react';
import EventCard from '../components/EventCard';
import FilterBar from '../components/FilterBar';

const HomePage = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Concert de rock',
      date: '2023-12-15',
      location: 'Paris',
      price: 25,
      image: 'https://via.placeholder.com/150',
      category: 'concert',
    },
    {
      id: 2,
      title: 'Conférence sur l\'IA',
      date: '2023-11-20',
      location: 'Lyon',
      price: 10,
      image: 'https://via.placeholder.com/150',
      category: 'conference',
    },
    // Ajoutez d'autres événements ici
  ]);

  const [filteredEvents, setFilteredEvents] = useState(events);

  const handleFilterChange = (filterType, value) => {
    let updatedEvents = [...events];

    if (filterType === 'category' && value) {
      updatedEvents = updatedEvents.filter((event) => event.category === value);
    }

    if (filterType === 'price') {
      updatedEvents.sort((a, b) => (value === 'asc' ? a.price - b.price : b.price - a.price));
    }

    if (filterType === 'date') {
      const today = new Date().toISOString().split('T')[0];
      updatedEvents = updatedEvents.filter((event) =>
        value === 'upcoming' ? event.date >= today : event.date < today
      );
    }

    setFilteredEvents(updatedEvents);
  };

  const handleSearch = (searchTerm) => {
    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  return (
    <div className="home-page">
      <h1>Événements disponibles</h1>
      <FilterBar onFilterChange={handleFilterChange} onSearch={handleSearch} />
      <div className="event-list">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;