import Search from "./Search";

export default function Header({ setPage, setSearchQuery }) {
    return (
        <header className="bg-neutral-800 text-white p-4 shadow-lg w-full">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo ou titre du site */}
                <h1 
                    className="text-2xl font-bold cursor-pointer hover:text-indigo-400"
                    onClick={() => setPage('events')} // Redirige vers la page d'accueil
                    aria-label="Retour à l'accueil"
                >
                    Site sympa
                </h1>
                
                {/* Menu de navigation */}
                <nav className="flex space-x-6 ml-8">
                    <a 
                        className="hover:text-neutral-400 cursor-pointer"
                        onClick={() => setPage('events')}
                        aria-label="Voir les événements"
                    >
                        Événements
                    </a>
                </nav>

                {/* Insérer Barre de recherche */}
                <Search onSearch={setSearchQuery} />

                {/* Bouton Panier (logo) */}
                <div 
                    className="cursor-pointer text-2xl hover:text-indigo-400"
                    onClick={() => setPage('cart')} 
                    aria-label="Voir le panier"
                >
                    🛒
                    {/* Affichage du nombre d'articles dans le panier */}
                    {/* <span className="text-sm ml-1">3</span> */}
                </div>
            </div>
        </header>
    );
}
