import { useEffect, useState } from "react";

export default function Events({ setPage, setEventId }) {
    const [events, setEvents] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/events')
            .then((response) => response.json())
            .then((json) => {setEvents(json)})
            .catch((error) => console.error('Erreur lors de la récupération des événements:', error));
    }, []);

    return (
        <div className="grid grid-cols-4 gap-4">
            {events &&
                events.map((event) => (
                    <div 
                        key={event.id} 
                        className="border border-neutral-200 p-4 cursor-pointer"
                        onClick={() => {
                            setEventId(event.id); setPage('details')
                        }}
                    >
                        <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-32 object-cover mb-2"
                        />
                        <h2 className="font-bold">{event.title}</h2>
                        <p>{event.date} - {event.place}</p>
                        <p>{event.price} €</p>
                        <p>{event.places_left} places restantes</p>
                    </div>
                ))}
        </div>
    );
}