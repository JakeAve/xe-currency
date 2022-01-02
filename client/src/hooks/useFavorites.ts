import { useState } from 'react';
import randomID from '../utils/randomID';
const localStorageKey = 'xe-currency-favorites';

interface UseFavorites {
  favorites: Favorite[];
  addFavorite: (fav: Partial<Favorite>) => void;
  removeFavorite: (fav: Favorite) => void;
}

const useFavorites = (): UseFavorites => {
  const lsFavorites = localStorage.getItem(localStorageKey) || '[]';
  const [favorites, _setFavorites] = useState<Favorite[]>(JSON.parse(lsFavorites));

  const setFavorites = (favorites: Favorite[]) => {
    localStorage.setItem(localStorageKey, JSON.stringify(favorites));
    _setFavorites(favorites);
  };

  const addFavorite = (fav: Partial<Favorite>) => {
    const newFav = { ...fav, id: randomID() } as Favorite;
    setFavorites([...favorites, newFav]);
  };

  const removeFavorite = ({ identifier }: Favorite) => {
    setFavorites(favorites.filter(({ identifier: _id }) => _id !== identifier));
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
  };
};

export default useFavorites;
