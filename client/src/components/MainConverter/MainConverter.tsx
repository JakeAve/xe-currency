import './styles.scss';
import { useState, useEffect, MouseEvent, useRef } from 'react';
import getRate from '../../actions/getRate';
import getAvailableCurrencies from '../../actions/getAvailableCurrencies';
import Converter from '../Converter/Converter';
import Selector from '../CurrencySelector/CurrencySelector';

const MainConverter = (): JSX.Element => {
  const identifier = 'main';

  const [baseCurrency, setBaseCurrency] = useState<Currency>({
    name: 'United States Dollar',
    code: 'USD',
    symbol: '$',
  });
  const [quoteCurrency, setQuoteCurrency] = useState<Currency>({ name: 'Euro', code: 'EUR', symbol: '€' });
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate>({ rate: 0, date: new Date() });
  const [availableCurrencies, setAvailableCurrencies] = useState<Array<Currency>>([]);

  useEffect(() => {
    getAvailableCurrencies().then((availables) => setAvailableCurrencies(availables));
  }, []);

  const updateExchangeRate = async (b: CurrencyCode, q: CurrencyCode) => {
    const r = await getRate(b, q);
    setExchangeRate(r);
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
    setBaseCurrency(quoteCurrency);
    setQuoteCurrency(baseCurrency);
    updateExchangeRate(quoteCurrency.code, baseCurrency.code);
  };

  const converterProps = {
    identifier,
    baseCurrency,
    quoteCurrency,
    exchangeRate,
  };

  return (
    <div className="main-converter">
      <fieldset className="currency-selection" form={identifier + '-converter-form'}>
        <div className="base-curr selector-wrapper">
          <label htmlFor={identifier + '-base-curr'}>Base Currency</label>
          <Selector
            id={identifier + '-base-curr'}
            currency={baseCurrency}
            setCurrency={updateBaseCurrency}
            name="base-currency"
            availableCurrencies={availableCurrencies}
          />
        </div>
        <button className="switch-btn" onClick={switchCurrs}>
          Switch
        </button>
        <div className="quote-curr selector-wrapper">
          <label htmlFor={identifier + '-quote-curr'}>Quote Currency</label>
          <Selector
            id={identifier + '-quote-curr'}
            currency={quoteCurrency}
            setCurrency={updateQuoteCurrency}
            name="quote-currency"
            availableCurrencies={availableCurrencies}
          />
        </div>
      </fieldset>
      <Converter {...converterProps} />
    </div>
  );
};

export default MainConverter;
