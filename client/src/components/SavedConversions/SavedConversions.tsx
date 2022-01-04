import './styles.scss';
import { useFavoritesContext } from '../../providers/FavoritesProvider';

export const SavedConversions = (): JSX.Element => {
  const { favoritesJSX } = useFavoritesContext();

  return <div className="saved-conversions">{favoritesJSX}</div>;
};
