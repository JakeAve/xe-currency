import { createContext, useContext } from 'react';
import _useFavorites, { UseFavorites } from '../hooks/useFavorites';

interface FavoritesProviderProps {
  addFavorite: (fav: Partial<Favorite>) => void;
  favorites: Favorite[];
  removeFavorite: (fav: Favorite) => void;
  updateFavorite: (fav: Favorite) => void;
}

const favoritesContext = createContext<FavoritesProviderProps | null>(null);

export const FavoritesProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { addFavorite, favorites, removeFavorite, updateFavorite } = _useFavorites();
  return (
    <favoritesContext.Provider value={{ addFavorite, favorites, removeFavorite, updateFavorite }}>
      {children}
    </favoritesContext.Provider>
  );
};

export const useFavoritesContext: () => UseFavorites = () => {
  const context = useContext(favoritesContext);
  if (context === null) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
};
