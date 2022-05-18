import { useState, useEffect, MouseEvent, useRef, RefObject } from 'react';
import getAvailableCurrencies from '../../../actions/getAvailableCurrencies';
import getRate from '../../../actions/getRate';
import rotateElement from '../../../actions/rotateElement';
import { useFavoritesContext } from '../../../providers/FavoritesProvider';
import { useLanguageContext } from '../../../providers/LanguageProvider';
import { ConverterProps } from '../../Converter/Converter';

interface UseMainConverter {
  availableCurrencies: Array<Currency>;
  baseCurrency: Currency;
  converterProps: {
    identifier: string;
    baseCurrency: CurrencyCode;
    quoteCurrency: CurrencyCode;
    exchangeRate: ExchangeRate;
  };
  identifier: string;
  isUpdatingRate: boolean;
  quoteCurrency: Currency;
  saveCurrentAsFavorite: () => void;
  svgRef: RefObject<SVGSVGElement>;
  switchCurrs: (e: MouseEvent<HTMLButtonElement>) => void;
  updateBaseCurrency: (e: { target: HTMLSelectElement }) => void;
  updateQuoteCurrency: (e: { target: HTMLSelectElement }) => void;
}

const useMainConverter = (): UseMainConverter => {
  const identifier = 'main';

  const [baseCurrency, setBaseCurrency] = useState<Currency>({
    name: 'United States Dollar',
    code: 'USD',
    symbol: '$',
  });
  const [quoteCurrency, setQuoteCurrency] = useState<Currency>({ name: 'Euro', code: 'EUR', symbol: '€' });
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate>({ rate: 0, date: new Date() });
  const [availableCurrencies, setAvailableCurrencies] = useState<Array<Currency>>([]);
  const [isUpdatingRate, setIsUpdatingRate] = useState(false);
  const svgRef = useRef(null);
  const { currencies: currencyList, strings: translatedStrings } = useLanguageContext();
  const [currentState, setCurrentState] = useState<ConverterState | null>(null);

  const { addFavorite } = useFavoritesContext();

  useEffect(() => {
    getAvailableCurrencies(currencyList).then((availables) => setAvailableCurrencies(availables));
  }, [translatedStrings]);

  const updateExchangeRate = async (b: CurrencyCode, q: CurrencyCode) => {
    setIsUpdatingRate(true);
    const { success, data } = await getRate(b, q);
    if (success) setIsUpdatingRate(false);
    setExchangeRate(data);
  };

  useEffect(() => {
    updateExchangeRate(baseCurrency.code, quoteCurrency.code);
  }, []);

  const updateBaseCurrency = (e: { target: HTMLSelectElement }) => {
    const value = e.target.value;
    const newBase = availableCurrencies.find((c) => c.code === value);
    setBaseCurrency(newBase as Currency);
    updateExchangeRate((newBase as Currency).code, quoteCurrency.code);
  };

  const updateQuoteCurrency = (e: { target: HTMLSelectElement }) => {
    const value = e.target.value;
    const newQuote = availableCurrencies.find((c) => c.code === value);
    setQuoteCurrency(newQuote as Currency);
    updateExchangeRate(baseCurrency.code, (newQuote as Currency).code);
  };

  const switchCurrs = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    rotateElement(svgRef.current);
    setBaseCurrency(quoteCurrency);
    setQuoteCurrency(baseCurrency);
    updateExchangeRate(quoteCurrency.code, baseCurrency.code);
  };

  const saveCurrentAsFavorite = () => {
    addFavorite({
      label: `${baseCurrency.name} / ${quoteCurrency.name}`,
      ...currentState,
    });
  };

  const converterProps: ConverterProps = {
    identifier,
    baseCurrency: baseCurrency.code,
    quoteCurrency: quoteCurrency.code,
    exchangeRate,
    onStateChange: (state) => setCurrentState(state),
  };

  return {
    availableCurrencies,
    baseCurrency,
    converterProps,
    identifier,
    isUpdatingRate,
    quoteCurrency,
    saveCurrentAsFavorite,
    svgRef,
    switchCurrs,
    updateBaseCurrency,
    updateQuoteCurrency,
  };
};

export default useMainConverter;
