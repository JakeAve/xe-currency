import { useState } from 'react';
import { useLanguageContext } from '../../providers/LanguageProvider';
import './styles.scss';

// const { "name": "Albanian Lek", "code": "ALL", "symbol": "Lek" },

const ConversionListItem = (props: ConverterState) => {
  const { base: _base, baseCurrency: _baseCurr, exchangeRate, quoteCurrency: _quoteCurr } = props;

  const [base] = useState(_base);
  const { codeToCurrency } = useLanguageContext();
  const baseCurrency = codeToCurrency(_baseCurr);
  const quoteCurrency = codeToCurrency(_quoteCurr);
  const quote = base * exchangeRate.rate;
  return (
    <div>
      <div>
        {baseCurrency}()/{baseCurrency}()
      </div>
      <div>{quote}</div>
    </div>
  );
};

export default ConversionListItem;
