import { useEffect, useState } from "react";
import Filter from "./components/Filter";

export default function Events({ setPage, setEventId, searchQuery }) {
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [filters, setFilters] = useState({
        sort: '',
        showOnlyAvailable: false,
        selectedPlace: '',
        selectedCategory: '' // Ajout du nouveau filtre par catégorie
    });
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 8;

    // Fonction pour convertir la date du format "DD/MM/YYYY" en objet Date
    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/');
        return new Date(`${year}-${month}-${day}`);
    };

    // Chargement des événements et catégories depuis l'API
    useEffect(() => {
        console.log("Chargement des événements...");
        // Charger les événements
        fetch('http://localhost:3000/events')
            .then((response) => response.json())
            .then((json) => {
                console.log("Événements récupérés :", json);
                setEvents(json);
                setFilteredEvents(json); // Initialiser avec tous les événements
            })
            .catch((error) => console.error('Erreur lors du chargement des événements:', error));
        
        // Charger les catégories
        fetch('http://localhost:3000/category')
            .then((response) => response.json())
            .then((json) => {
                console.log("Catégories récupérées :", json);
                setCategories(json);
            })
            .catch((error) => console.error('Erreur lors du chargement des catégories:', error));
    }, []); // Se déclenche une seule fois lors du premier rendu

    useEffect(() => {
        console.log("Filtrage des événements avec les filtres:", filters);
        if (events.length === 0) return;
    
        let newFilteredEvents = [...events];
    
        // Application des filtres de place, de catégorie et de disponibilité
        if (filters.selectedPlace) {
            newFilteredEvents = newFilteredEvents.filter(event => event.place === filters.selectedPlace);
        }
        
        // Filtre par catégorie
        if (filters.selectedCategory) {
            newFilteredEvents = newFilteredEvents.filter(event => 
                event.category_id.toString() === filters.selectedCategory
            );
        }
    
        if (filters.showOnlyAvailable) {
            newFilteredEvents = newFilteredEvents.filter(event => event.places_left > 0);
        }
    
        // Appliquer un seul tri en combinant date et prix
        newFilteredEvents.sort((a, b) => {
            const dateA = parseDate(a.date).getTime();
            const dateB = parseDate(b.date).getTime();
    
            if (filters.sort === 'dateAsc') {
                if (dateA !== dateB) return dateA - dateB;
            } else if (filters.sort === 'dateDesc') {
                if (dateA !== dateB) return dateB - dateA;
            } else if (filters.sort === 'priceAsc') {
                return a.price - b.price;
            } else if (filters.sort === 'priceDesc') {
                return b.price - a.price;
            }
    
            return 0; // Aucun changement si les dates et prix sont égaux
        });
    
        console.log("Événements triés:", newFilteredEvents);
    
        setFilteredEvents(newFilteredEvents);
        setCurrentPage(1);
    }, [filters, events]);
    

    // Fonction pour mettre à jour les filtres
    const handleFilterChange = (newFilters) => {
        console.log("Modification des filtres:", newFilters);
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilters
        }));
    };

    // Appliquer la recherche dans les événements filtrés
    const searchFilteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log("Événements après recherche :", searchFilteredEvents);

    // Paginer les événements filtrés et recherchés
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = searchFilteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
    const totalPages = Math.ceil(searchFilteredEvents.length / eventsPerPage);

    // Fonction pour changer de page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Fonction pour aller à la page suivante
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Fonction pour aller à la page précédente
    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Formater la date pour l'affichage
    const formatDateForDisplay = (dateStr) => {
        // On peut garder le format DD/MM/YYYY pour l'affichage puisque c'est déjà en format français
        return dateStr;
    };

    // Trouver le nom de la catégorie à partir de l'ID
    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id.toString() === categoryId.toString());
        return category ? category.name : '';
    };

    return (
        <div>
            <Filter 
                filters={filters}
                onFilterChange={handleFilterChange}
                events={events}
                categories={categories} // Passer les catégories au composant Filter
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {currentEvents.length > 0 ? (
                    currentEvents.map((event) => (
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
                                <p className="text-sm text-gray-500 mt-1">📅 {formatDateForDisplay(event.date)} - 📍 {event.place}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-md font-bold text-indigo-600">💰 {event.price} €</p>
                                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                                        {getCategoryName(event.category_id)}
                                    </span>
                                </div>
                                <p className={`text-sm mt-1 ${event.places_left <= 0 ? 'text-red-600 font-bold' : 'text-green-600'}`}>
                                  🎟️ {event.places_left <= 0 ? 'COMPLET' : `${event.places_left} Places restantes`}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">Aucun événement trouvé pour cette recherche.</p>
                )}
            </div>

            {/* Pagination avec style noir */}
            {searchFilteredEvents.length > 0 && (
                <div className="flex justify-center items-center space-x-3 my-8">
                    <button 
                        onClick={goToPrevPage} 
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md transition-colors duration-200 ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
                    >
                        Précédent
                    </button>
                    
                    <div className="flex space-x-2">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`w-10 h-10 rounded-full transition-colors duration-200 ${currentPage === index + 1 
                                    ? 'bg-black text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-white'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    
                    <button 
                        onClick={goToNextPage} 
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md transition-colors duration-200 ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
                    >
                        Suivant
                    </button>
                </div>
            )}
        </div>
    );
}