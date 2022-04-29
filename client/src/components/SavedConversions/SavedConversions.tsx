import './styles.scss';
import { useFavoritesContext } from '../../providers/FavoritesProvider';

export const SavedConversions = (): JSX.Element => {
  const { favoritesJSX, favorites } = useFavoritesContext();

  return (
    <>
      {favorites.length ? <h2>Saved</h2> : null}
      <div className="saved-conversions">{favoritesJSX}</div>
    </>
  );
};
