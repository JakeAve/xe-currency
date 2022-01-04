import './styles.scss';
import { useFavoritesContext } from '../../providers/FavoritesProvider';
import Converter from '../Converter/Converter';

export const SingleFavorite = (props: Favorite): JSX.Element => {
  const { label, identifier } = props;
  const { removeFavorite } = useFavoritesContext();
  return (
    <div className="favorite">
      <h3 className="favorite-heading">{label}</h3>
      <Converter {...props} />
      <div className="favorites-options">
        <button onClick={() => removeFavorite(identifier)}>Delete</button>
      </div>
    </div>
  );
};
