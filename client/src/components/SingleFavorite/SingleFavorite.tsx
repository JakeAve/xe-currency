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
        <button className="dank-btn little warning" onClick={() => removeFavorite(identifier)}>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="trash"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="icon"
          >
            <path
              fill="currentColor"
              d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
