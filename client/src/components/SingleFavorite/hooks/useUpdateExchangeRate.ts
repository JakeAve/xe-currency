import { useEffect } from 'react';
import { SetFavoriteType } from '../SingleFavorite';
import getRate from '../../../actions/getRate';

export const useUpdateExchangeRate = (currentFav: Favorite, setFavorite: SetFavoriteType): void => {
  const {
    exchangeRate: { date },
    baseCurrency,
    quoteCurrency,
  } = currentFav;
  useEffect(() => {
    if (new Date().getTime() + 3600 * 1000 * 24 > new Date(date).getTime()) {
      getRate(baseCurrency, quoteCurrency).then(({ data, success }) => {
        if (success) {
          setFavorite({
            ...currentFav,
            exchangeRate: data,
          });
        }
      });
    }
  }, []);
};
