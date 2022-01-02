import useFavorites from '../../hooks/useFavorites';
import { SingleFavorite } from '../SingleFavorite/SingleFavorite';

export const SavedConversions = (): JSX.Element => {
  const { favorites } = useFavorites();
  return (
    <div>
      {favorites.map((favorite) => (
        <SingleFavorite key={favorite.identifier} {...favorite} />
      ))}
    </div>
  );
};
