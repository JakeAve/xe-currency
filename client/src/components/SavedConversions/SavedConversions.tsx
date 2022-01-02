import { useFavoritesContext } from '../../providers/FavoritesProvider';

export const SavedConversions = (): JSX.Element => {
  const { favoritesJSX } = useFavoritesContext();

  return <div>{favoritesJSX}</div>;
};
