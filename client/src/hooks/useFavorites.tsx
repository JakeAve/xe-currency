import { useState } from 'react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { SingleFavorite } from '../components/SingleFavorite/SingleFavorite';
import randomID from '../utils/randomID';
const localStorageKey = 'xe-currency-favorites';
const resetLocalStorage = () => localStorage.setItem(localStorageKey, JSON.stringify([]));

export interface UseFavorites {
  addFavorite: (fav: Partial<Favorite>) => void;
  favorites: Favorite[];
  favoritesJSX: JSX.Element;
  removeFavorite: (identifier: string) => void;
  updateFavorite: (fav: Favorite) => void;
}

// this might be redundant because of what is happening in favoritesJSX
const getFavesFromLocalStorage = () => {
  const stringedFavorites = localStorage.getItem(localStorageKey) || '[]';
  let defaultFavs: Favorite[] = [];
  try {
    const attempt = JSON.parse(stringedFavorites);
    if (!Array.isArray(attempt)) throw new Error('Favorites are not an array');
    defaultFavs = attempt;
  } catch {
    resetLocalStorage();
  }

  return defaultFavs;
};

const useFavorites = (): UseFavorites => {
  const [favorites, _setFavorites] = useState<Favorite[]>(getFavesFromLocalStorage());

  const setFavorites = (favorites: Favorite[]) => {
    localStorage.setItem(localStorageKey, JSON.stringify(favorites));
    _setFavorites(favorites);
  };

  const addFavorite = (fav: Partial<Favorite>) => {
    const newFav = { ...fav, identifier: randomID() } as Favorite;
    setFavorites([...favorites, newFav]);
  };

  const removeFavorite = (identifier: string) => {
    setFavorites(favorites.filter(({ identifier: _id }) => _id !== identifier));
  };

  const updateFavorite = (fav: Favorite) => {
    setFavorites(favorites.map((_fav) => (_fav.identifier === fav.identifier ? fav : _fav)));
  };

  const favoritesJSX: JSX.Element = (
    <ErrorBoundary onError={resetLocalStorage}>
      {favorites.map((favorite) => (
        <SingleFavorite key={favorite.identifier} {...favorite} />
      ))}
    </ErrorBoundary>
  );

  return {
    addFavorite,
    favorites,
    favoritesJSX,
    removeFavorite,
    updateFavorite,
  };
};

export default useFavorites;
