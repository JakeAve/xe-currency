import { useState, useEffect } from 'react';
import makeRelDate from '../../actions/makeRelDate';

interface Props {
  identifier: string;
  baseCurrency: CurrencyCode;
  quoteCurrency: CurrencyCode;
  exchangeRate: ExchangeRate;
  fee?: number;
  base?: number;
}

const Converter = (props: Props): JSX.Element => {
  const { identifier = 'main', exchangeRate } = props;

  const [base, setBase] = useState<number | string>(props.base || 1);
  const [fee, setFee] = useState<number | string>(props.fee || 0);
  const [quote, setQuote] = useState<number | string>(Number(base) * exchangeRate.rate * (1 + Number(fee)));

  useEffect(() => {
    setQuote(Number(base) * exchangeRate.rate * (1 + Number(fee)));
  }, [exchangeRate]);

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

  return (
    <form className="convert-form" id={identifier + '-converter-form'}>
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
