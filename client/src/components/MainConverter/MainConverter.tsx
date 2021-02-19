import './styles.scss';
import { useState, useEffect, MouseEvent } from 'react';
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
        <button className="switch-btn" aria-label="Switch" title="Switch" onClick={switchCurrs}>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="exchange-alt"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"
            ></path>
          </svg>
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
