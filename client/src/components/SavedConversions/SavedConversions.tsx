import './styles.scss';
import { useFavoritesContext } from '../../providers/FavoritesProvider';
import { useLanguageContext } from '../../providers/LanguageProvider';

export const SavedConversions = (): JSX.Element => {
  const {
    strings: { savedCurrenciesTitle },
  } = useLanguageContext();
  const { favoritesJSX, favorites } = useFavoritesContext();

  return (
    <>
      {favorites.length ? <h2>{savedCurrenciesTitle}</h2> : null}
      <div className="saved-conversions">{favoritesJSX}</div>
    </>
  );
};
