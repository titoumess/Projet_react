import Search from "./Search";
import Filter from "./Filter";

export default function Header({ setPage }) {
    return (
        <header className="bg-neutral-800 text-white p-4 shadow-lg w-full">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo ou titre du site */}
                <h1 
                    className="text-2xl font-bold cursor-pointer hover:text-indigo-400"
                    onClick={() => setPage('Events')} // Redirige vers la page d'accueil
                    aria-label="Retour à l'accueil"
                >
                    Site sympa
                </h1>
                
                {/* Menu de navigation */}
                <nav className="flex space-x-6 ml-8">
                    <a 
                        className="hover:text-neutral-400 cursor-pointer"
                        onClick={() => setPage('Events')}
                        aria-label="Voir les événements"
                    >
                        Événements
                    </a>
                </nav>

                {/* Barre de filtre et recherche */}
                <div className="flex items-center space-x-4">
                    {/* Composant Filter */}
                    <Filter onFilter={(query) => console.log("Filtrer par:", query)} />
                    {/* Composant Search */}
                    <div className="flex-1 mx-4 hidden lg:flex">
                        <Search onSearch={(query) => console.log("Recherche: ", query)} />
                    </div>
                </div>

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
