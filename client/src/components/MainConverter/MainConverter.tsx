import './styles.scss';
import { useState, useEffect, MouseEvent } from 'react';
import getRate from '../../actions/getRate';
import Converter from '../Converter/Converter';
import Selector from '../CurrencySelector/CurrencySelector';

const MainConverter = (): JSX.Element => {
  const identifier = 'main';

  const [baseCurrency, setBaseCurrency] = useState<CurrencyCode>('USD');
  const [quoteCurrency, setQuoteCurrency] = useState<CurrencyCode>('EUR');
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate>({ rate: 0, date: new Date() });

  useEffect(() => {
    const foo = async () => {
      setBaseCurrency(quoteCurrency);
      setQuoteCurrency(baseCurrency);
      const r = await getRate(baseCurrency, quoteCurrency);
      setExchangeRate(r);
    };
    foo();
  }, []);

  const updateExchangeRate = async (b: CurrencyCode, q: CurrencyCode) => {
    const r = await getRate(b, q);
    setExchangeRate(r);
  };

  const updateBaseCurrency = async (e: { target: HTMLSelectElement }) => {
    const value = e.target.value;
    setBaseCurrency(value as CurrencyCode);
    updateExchangeRate(value as CurrencyCode, quoteCurrency);
  };

  const updateQuoteCurrency = async (e: { target: HTMLSelectElement }) => {
    const value = e.target.value;
    setQuoteCurrency(value as CurrencyCode);
    updateExchangeRate(baseCurrency, value as CurrencyCode);
  };

  const switchCurrs = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setBaseCurrency(quoteCurrency);
    setQuoteCurrency(baseCurrency);
    updateExchangeRate(quoteCurrency, baseCurrency);
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
          />
        </div>
      </fieldset>
      <Converter {...converterProps} />
    </div>
  );
};

export default MainConverter;
