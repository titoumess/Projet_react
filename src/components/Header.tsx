export default function Header({ setPage }) {
    return (
        <header className="bg-neutral-800 text-white p-4 shadow-lg w-full">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo ou titre du site */}
                <h1 
                    className="text-2xl font-bold cursor-pointer"
                    onClick={() => setPage('home')} // Redirige vers la page d'accueil
                >
                    Site sympa
                </h1>
                {/* Menu de navigation */}
                <nav className="flex space-x-6 ml-8">
                    <a 
                        className="hover:text-neutral-400 cursor-pointer"
                        onClick={() => setPage('Events')}
                    >
                        Événements
                    </a>

                </nav>

                {/* Espace réservé pour la barre de recherche (à intégrer plus tard) */}
                <div className="flex-1 mx-4 lg:block">
                    {/* La barre de recherche sera ajoutée ici plus tard */}
                </div>

                {/* Bouton Panier (logo) */}
                <div 
                    className="cursor-pointer"
                    onClick={() => setPage('cart')} 
                >
                    <span className="text-2xl">🛒</span>
                </div>
            </div>
        </header>
    );
}