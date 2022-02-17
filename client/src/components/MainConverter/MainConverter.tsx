import './styles.scss';

import Converter from '../Converter/Converter';
import Selector from '../CurrencySelector/CurrencySelector';

import { useLanguageContext } from '../../providers/LanguageProvider';
import useMainConverter from './hooks/useMainConverter';

const MainConverter = (): JSX.Element => {
  const { strings: translatedStrings } = useLanguageContext();

  const {
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
  } = useMainConverter();

  return (
    <>
      <h2>Convert</h2>
      <div className={'main-converter' + (isUpdatingRate ? ' is-updating' : '')}>
        <fieldset className="currency-selection" form={identifier + '-converter-form'}>
          <div className="base-curr selector-wrapper">
            <label htmlFor={identifier + '-base-curr'}>{translatedStrings.baseCurrency}</label>
            <Selector
              id={identifier + '-base-curr'}
              currency={baseCurrency}
              setCurrency={updateBaseCurrency}
              name="base-currency"
              availableCurrencies={availableCurrencies}
            />
          </div>
          <button
            className="dank-btn switch-btn"
            aria-label="Switch"
            title={translatedStrings.switchCurrencies}
            onClick={switchCurrs}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="exchange-alt"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              ref={svgRef}
            >
              <path
                fill="currentColor"
                d="M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"
              ></path>
            </svg>
          </button>
          <div className="quote-curr selector-wrapper">
            <label htmlFor={identifier + '-quote-curr'}>{translatedStrings.quoteCurrency}</label>
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
        <div className="main-converter-btn-group">
          <button className="dank-btn little" onClick={saveCurrentAsFavorite}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="save"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="icon"
            >
              <path
                fill="currentColor"
                d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default MainConverter;
