import React, { useState } from 'react';

const FilterBar = ({ onFilterChange, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Rechercher un événement..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select onChange={(e) => onFilterChange('category', e.target.value)}>
        <option value="">Toutes les catégories</option>
        <option value="concert">Concerts</option>
        <option value="conference">Conférences</option>
        <option value="workshop">Ateliers</option>
      </select>
      <select onChange={(e) => onFilterChange('price', e.target.value)}>
        <option value="">Trier par prix</option>
        <option value="asc">Prix croissant</option>
        <option value="desc">Prix décroissant</option>
      </select>
      <select onChange={(e) => onFilterChange('date', e.target.value)}>
        <option value="">Trier par date</option>
        <option value="upcoming">À venir</option>
        <option value="past">Passés</option>
      </select>
    </div>
  );
};

export default FilterBar;