import { createContext, useContext } from 'react';
import _useFavorites, { UseFavorites } from '../hooks/useFavorites';

const favoritesContext = createContext<UseFavorites | null>(null);

export const FavoritesProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { addFavorite, favorites, favoritesJSX, removeFavorite, updateFavorite } = _useFavorites();
  return (
    <favoritesContext.Provider value={{ addFavorite, favorites, favoritesJSX, removeFavorite, updateFavorite }}>
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
