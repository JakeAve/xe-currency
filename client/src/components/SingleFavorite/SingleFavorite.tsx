import './styles.scss';
import { useFavoritesContext } from '../../providers/FavoritesProvider';
import Converter from '../Converter/Converter';
import { useEffect, useState } from 'react';
import { useUpdateExchangeRate } from './hooks/useUpdateExchangeRate';
export type SetFavoriteType = (value: Partial<Favorite>) => void;

export const SingleFavorite = (props: Favorite): JSX.Element => {
  const { identifier } = props;
  const { removeFavorite, updateFavorite } = useFavoritesContext();
  const [favorite, _setFavorite] = useState(props);
  const setFavorite: SetFavoriteType = (value) => {
    _setFavorite((curr) => ({ ...curr, ...value, identifier }));
  };
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    updateFavorite(favorite);
  }, [favorite]);

  useUpdateExchangeRate(favorite, setFavorite);

  const { label } = favorite;
  return (
    <div className="favorite">
      <div className={`label-container` + (isEditing ? ' editing' : '')}>
        <input
          className="hidden-input"
          type="text"
          value={label}
          onChange={(e) => setFavorite({ label: e.target.value })}
          aria-labelledby={`heading-${identifier}`}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
        />
        <h3 className="favorite-heading" id={`heading-${identifier}`}>
          {label || `${favorite.baseCurrency} / ${favorite.quoteCurrency}`}
        </h3>
      </div>
      <Converter onStateChange={setFavorite} {...props} />
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
