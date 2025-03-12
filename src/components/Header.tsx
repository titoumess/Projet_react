import Search from "./Search";
import { ShoppingCart } from "lucide-react";

export default function Header({ setPage, setSearchQuery }) {
    return (
        <header className="bg-neutral-800 text-white p-4 shadow-lg w-full">
            <div className="container mx-auto flex items-center">
                {/* Logo */}
                <div>
                    <img 
                        src="/public/logo_test.png" 
                        alt="Logo du site" 
                        className="h-10 cursor-pointer"
                        onClick={() => setPage('events')}
                    />
                </div>

                {/* Menu de navigation */}
                <div className="ml-4">
                    <a 
                        className="cursor-pointer text-lg"
                        onClick={() => setPage('events')}
                        aria-label="Voir les événements"
                    >
                    Événements
                    </a>
                </div>

                {/* Barre de recherche centrée sur toute la largeur */}
                <div className="flex-grow flex justify-center mx-auto">
                    <Search onSearch={setSearchQuery} className="w-full max-w-2xl" />
                </div>

                {/* Bouton Panier (logo) */}
                <div 
                    className="cursor-pointer text-2xl hover:text-indigo-400 ml-auto"
                    onClick={() => setPage('cart')} 
                    aria-label="Voir le panier"
                >
                <ShoppingCart size={24} className="text-white hover:text-indigo-400 transition-colors duration-200" />
                </div>
            </div>
        </header>
    );
}
