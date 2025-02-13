import { useState } from "react";

export default function Filter({ onFilter }) {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onFilter(value);
    };

    return (
        <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Rechercher un événement..."
                className="p-2 w-full focus:outline-none"
            />
            <button className="p-2 bg-neutral-800 text-white hover:bg-neutral-700">
                🔍
            </button>
        </div>
    );
}
