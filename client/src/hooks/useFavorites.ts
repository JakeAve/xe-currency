import { useState } from 'react';
import randomID from '../utils/randomID';
const localStorageKey = 'xe-currency-favorites';

export interface UseFavorites {
  addFavorite: (fav: Partial<Favorite>) => void;
  favorites: Favorite[];
  removeFavorite: (fav: Favorite) => void;
  updateFavorite: (fav: Favorite) => void;
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

  const updateFavorite = (fav: Favorite) => {
    setFavorites(favorites.map((_fav) => (_fav.identifier === fav.identifier ? fav : _fav)));
  };

  return {
    addFavorite,
    favorites,
    removeFavorite,
    updateFavorite,
  };
};

export default useFavorites;
