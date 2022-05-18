import { useEffect, useState } from 'react';
import getAllConversions from '../../../actions/getAllConversions';
import getAvailableCurrencies from '../../../actions/getAvailableCurrencies';
import { useLanguageContext } from '../../../providers/LanguageProvider';

const useAllConversions = () => {
  const [availableCurrencies, setAvailableCurrencies] = useState<Array<Currency>>([]);
  const { currencies: currencyList, strings: translatedStrings } = useLanguageContext();
  const [availableConversions, setAvailableConversions] = useState<ConverterState[]>([]);

  // TODO: this query for getting available currencies is duplicated in useMainConverter - could create a new context
  useEffect(() => {
    getAvailableCurrencies(currencyList).then((availables) => setAvailableCurrencies(availables));
  }, [translatedStrings]);

  useEffect(() => {
    getAllConversions().then((conversions) => setAvailableConversions(conversions));
  }, []);

  return { availableCurrencies, availableConversions };
};

export default useAllConversions;
