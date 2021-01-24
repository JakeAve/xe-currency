import { useState, MouseEvent, useEffect } from 'react';
import getRate from '../../actions/getRate';
import makeRelDate from '../../actions/makeRelDate';
import Selector from '../CurrencySelector/CurrencySelector';

interface Props {
  identifier: string;
  defaultRate?: number;
  lastUpdated?: Date;
}

const Converter = (props: Props): JSX.Element => {
  const { identifier = 'main', defaultRate = 0, lastUpdated = new Date() } = props;

  const [base, setBase] = useState<number | string>(1);
  const [fee, setFee] = useState<number | string>(0);
  const [baseCurrency, setBaseCurrency] = useState<CurrencyCode>('USD');
  const [quoteCurrency, setQuoteCurrency] = useState<CurrencyCode>('EUR');
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate>({ rate: defaultRate, date: lastUpdated });
  const [quote, setQuote] = useState<number | string>(Number(base) * exchangeRate.rate * (1 + Number(fee)));

  useEffect(() => {
    const foo = async () => {
      setBaseCurrency(quoteCurrency);
      setQuoteCurrency(baseCurrency);
      const r = await getRate(baseCurrency, quoteCurrency);
      setExchangeRate(r);
      setQuote(Number(base) * r.rate * (1 + Number(fee)));
    };
    foo();
  }, []);

  const updateBaseCurrency = async (e: { target: HTMLSelectElement }) => {
    const value = e.target.value;
    setBaseCurrency(value as CurrencyCode);
    const r = await getRate(value as CurrencyCode, quoteCurrency);
    setExchangeRate(r);
    setQuote(Number(base) * r.rate * (1 + Number(fee)));
  };

  const updateQuoteCurrency = async (e: { target: HTMLSelectElement }) => {
    const value = e.target.value;
    setQuoteCurrency(value as CurrencyCode);
    const r = await getRate(baseCurrency, value as CurrencyCode);
    setExchangeRate(r);
    setQuote(Number(base) * r.rate * (1 + Number(fee)));
  };

  const onBaseChange = (e: { target: HTMLInputElement }) => {
    const value = e.target.value;
    setBase(value);
    setQuote(Number(value) * exchangeRate.rate * (1 + Number(fee)));
  };

  const onQuoteChange = (e: { target: HTMLInputElement }) => {
    const value = e.target.value;
    setQuote(value);
    setBase((Number(value) / exchangeRate.rate) * (1 - Number(fee)));
  };

  const onFeeChange = (e: { target: HTMLInputElement }) => {
    const value = e.target.value;
    setFee(value);
    setQuote(Number(base) * exchangeRate.rate * (1 + Number(value)));
  };

  const switchCurrs = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setBaseCurrency(quoteCurrency);
    setQuoteCurrency(baseCurrency);
    const r = await getRate(baseCurrency, quoteCurrency);
    setExchangeRate(r);
    setQuote(Number(base) * r.rate * (1 + Number(fee)));
  };

  return (
    <form
      className={(identifier === 'main' ? 'main-converter ' : '') + 'convert-form'}
      id={identifier + '-converter-form'}
    >
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
      <div className="lg-input-wrapper base">
        <label htmlFor={identifier + '-base'}>Base</label>
        <input
          name="base"
          type="number"
          placeholder="0"
          id={identifier + '-base'}
          value={base}
          onChange={onBaseChange}
        />
      </div>
      <div className="lg-input-wrapper quote">
        <label htmlFor={identifier + '-quote'}>Quote</label>
        <input
          name="quote"
          type="number"
          placeholder="0"
          id={identifier + '-quote'}
          value={quote}
          onChange={onQuoteChange}
        />
      </div>
      <div className="fee">
        <label htmlFor={identifier + '-fee'}>Fee</label>
        <input
          name="fee"
          type="number"
          min="0"
          max="1"
          step=".01"
          id={identifier + '-fee'}
          value={fee}
          onChange={onFeeChange}
        />
      </div>
      <div className="date">Last updated {makeRelDate(exchangeRate.date)}</div>
    </form>
  );
};

export default Converter;
