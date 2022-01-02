import { useFavoritesContext } from '../../providers/FavoritesProvider';
import { SingleFavorite } from '../SingleFavorite/SingleFavorite';

export const SavedConversions = (): JSX.Element => {
  const { favorites } = useFavoritesContext();
  return (
    <div>
      {favorites.map((favorite) => (
        <SingleFavorite key={favorite.identifier} {...favorite} />
      ))}
    </div>
  );
};
