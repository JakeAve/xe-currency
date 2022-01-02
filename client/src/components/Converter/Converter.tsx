import makeRelDate from '../../actions/makeRelDate';
import { useLanguageContext } from '../../providers/LanguageProvider';
import useConverter from './hooks/useConverter';

export interface ConverterProps {
  base?: number;
  baseCurrency: CurrencyCode;
  exchangeRate: ExchangeRate;
  fee?: number;
  identifier: string;
  quoteCurrency: CurrencyCode;
  onStateChange?: (state: ConverterState) => void;
}

const Converter = (props: ConverterProps): JSX.Element => {
  const { identifier = 'main', baseCurrency, quoteCurrency } = props;

  const { code: locale, currencies: currencyList, strings: translatedStrings } = useLanguageContext();

  const { base, displayName, exchangeRate, fee, onBaseChange, onFeeChange, onQuoteChange, quote } = useConverter({
    currencyList,
    props,
  });

  return (
    <form className={'convert-form' + (Number(fee) > 0 ? ' with-fee' : '')} id={identifier + '-converter-form'}>
      <div className="lg-input-wrapper base">
        <label htmlFor={identifier + '-base'}>{displayName(baseCurrency)}</label>
        <input
          name="base"
          type="number"
          inputMode="decimal"
          placeholder="0"
          id={identifier + '-base'}
          value={base}
          onChange={onBaseChange}
          pattern="[0-9]*"
        />
      </div>
      <div className="lg-input-wrapper quote">
        <label htmlFor={identifier + '-quote'}>{displayName(quoteCurrency)}</label>
        <input
          name="quote"
          type="number"
          inputMode="decimal"
          placeholder="0"
          id={identifier + '-quote'}
          value={quote}
          onChange={onQuoteChange}
          pattern="[0-9]*"
        />
      </div>
      <div className="fee">
        <label htmlFor={identifier + '-fee'}>{translatedStrings.fee}</label>
        <input
          name="fee"
          type="number"
          inputMode="decimal"
          id={identifier + '-fee'}
          onChange={onFeeChange}
          placeholder="0"
        />
      </div>
      <div className="date">
        {translatedStrings.lastUpdated} {makeRelDate(exchangeRate.date, { locale })}
      </div>
    </form>
  );
};

export default Converter;
