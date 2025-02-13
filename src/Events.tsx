import { useEffect, useState } from "react";

export default function Events({ setPage, setEventId }) {
    const [events, setEvents] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/events')
            .then((response) => response.json())
            .then((json) => { setEvents(json) })
            .catch((error) => console.error('Erreur lors de la récupération des événements:', error));
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {events && events.map((event) => (
                <div 
                    key={event.id} 
                    className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
                    onClick={() => { setEventId(event.id); setPage('details'); }}
                >
                    <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-800">{event.title}</h2>
                        <p className="text-sm text-gray-500 mt-1">📅 {event.date} - 📍 {event.place}</p>
                        <p className="text-md font-bold text-indigo-600 mt-2">💰 {event.price} €</p>
                        <p className="text-sm text-green-600 mt-1">🎟️ {event.places_left} places restantes</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
