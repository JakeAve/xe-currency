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

interface MiniFavorite {
  // minifiy for localStorage
  id: string;
  l: string;
  b: number;
  bc: string;
  qc: string;
  r: ExchangeRate;
  f: number;
}

const minifiedToReadable = (mini: MiniFavorite): Favorite => ({
  identifier: mini.id,
  label: mini.l,
  base: mini.b,
  baseCurrency: mini.bc as CurrencyCode,
  fee: mini.f,
  quoteCurrency: mini.qc as CurrencyCode,
  exchangeRate: mini.r,
});

const readableToMinified = (fav: Favorite): MiniFavorite => ({
  id: fav.identifier,
  l: fav.label,
  b: fav.base,
  bc: fav.baseCurrency,
  qc: fav.quoteCurrency,
  r: fav.exchangeRate,
  f: fav.fee || 0,
});

const getFavesFromLocalStorage = () => {
  const stringedFavorites = localStorage.getItem(localStorageKey) || '[]';
  let defaultFavs: MiniFavorite[] = [];
  try {
    // this might be redundant because of error catching in favoritesJSX
    const attempt = JSON.parse(stringedFavorites);
    if (!Array.isArray(attempt)) throw new Error('Favorites are not an array');
    defaultFavs = attempt;
  } catch {
    resetLocalStorage();
  }
  return defaultFavs.map(minifiedToReadable);
};

const useFavorites = (): UseFavorites => {
  const [favorites, _setFavorites] = useState<Favorite[]>(getFavesFromLocalStorage());

  const setFavorites = (favorites: Favorite[]) => {
    const minified = favorites.map(readableToMinified);
    localStorage.setItem(localStorageKey, JSON.stringify(minified));
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
