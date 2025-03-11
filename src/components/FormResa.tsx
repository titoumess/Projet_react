import { useState } from "react";

export default function FormResa({ event }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [places, setPlaces] = useState(1);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Vérification des champs
    if (!name.trim()) {
      newErrors.name = "Le nom est obligatoire";
    }

    if (!validateEmail(email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (places < 1) {
      newErrors.places = "Vous devez réserver au moins 1 place";
    }

    if (places > event.places_left) {
      newErrors.places = `Il ne reste que ${event.places_left} places disponibles`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Stockage dans le localStorage
    const reservation = {
      eventId: event.id,
      places: places
    };
    
    // Récupération des réservations existantes ou création d'un nouveau tableau
    const currentReservations = JSON.parse(localStorage.getItem("reservations")) || [];
    localStorage.setItem("reservations", JSON.stringify([...currentReservations, reservation]));
    
    // Reset du formulaire et affichage du message de succès
    setName("");
    setEmail("");
    setPlaces(1);
    setErrors({});
    setSuccess(true);
    
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="mt-6 bg-gray-100 p-4 rounded">
      <h2 className="text-xl font-bold mb-4">Réserver des places</h2>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Réservation effectuée avec succès !
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="places" className="block text-sm font-medium text-gray-700">Nombre de places</label>
          <input
            type="number"
            id="places"
            min="1"
            max={event.places_left}
            value={places}
            onChange={(e) => setPlaces(parseInt(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.places && <p className="text-red-500 text-sm mt-1">{errors.places}</p>}
        </div>
        
        <div className="mt-4">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Réserver
          </button>
        </div>
      </form>
    </div>
  );
}