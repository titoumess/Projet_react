import { useState } from "react";

// lier dynamiquement le filtrage et la barre de recherche à header ainsi qu'a events.tsx pour affficher uniquement les élements filtré ou recherché
export default function Search({ onSearch }) {
    const [query, setQuery] = useState("");

    return (
        <div className="relative w-full max-w-md">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un événement..."
                className="w-full p-2 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
                onClick={() => onSearch(query)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2  text-white p-2 rounded-lg hover:bg-indigo-600"
            >
                🔍
            </button>
        </div>
    );
}
