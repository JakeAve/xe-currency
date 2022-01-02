import { useEffect, useState } from 'react';
import { ConverterProps } from '../Converter';

interface UseConverterProps {
  props: ConverterProps;
  currencyList: Currency[];
}

interface UseConverter {
  base: number | string;
  displayName: (code: CurrencyCode) => string;
  exchangeRate: ExchangeRate;
  fee: number | string;
  onBaseChange: (e: { target: HTMLInputElement }) => void;
  onFeeChange: (e: { target: HTMLInputElement }) => void;
  onQuoteChange: (e: { target: HTMLInputElement }) => void;
  quote: number | string;
}

const useConverter = ({ currencyList, props }: UseConverterProps): UseConverter => {
  const { baseCurrency, exchangeRate, onStateChange, quoteCurrency } = props;
  const [base, setBase] = useState<number | string>(props.base || 1);
  const [fee, setFee] = useState<number | string>(props.fee || 0);
  const [quote, setQuote] = useState<number | string>(Number(base) * exchangeRate.rate * (1 + Number(fee)));

  useEffect(() => {
    setQuote((Number(base) * exchangeRate.rate * (1 + Number(fee))).toFixed(4));
  }, [exchangeRate]);

  const onBaseChange = (e: { target: HTMLInputElement }) => {
    const value = e.target.value;
    setBase(value);
    setQuote((Number(value) * exchangeRate.rate * (1 + Number(fee))).toFixed(4));
  };

  const onQuoteChange = (e: { target: HTMLInputElement }) => {
    const value = e.target.value;
    setQuote(value);
    setBase(((Number(value) / exchangeRate.rate) * (1 - Number(fee))).toFixed(4));
  };

  const onFeeChange = (e: { target: HTMLInputElement }) => {
    const raw = e.target.value;
    const value = Number(raw) / 100;
    setFee(value);
    setQuote((Number(base) * exchangeRate.rate * (1 + Number(value))).toFixed(4));
  };

  const displayName = (code: CurrencyCode) =>
    `${code} (${currencyList.find((currency) => currency.code === code)?.symbol || ''})`;

  useEffect(() => {
    onStateChange?.({
      base: Number(base),
      baseCurrency,
      fee: Number(fee),
      quoteCurrency,
      exchangeRate,
    });
  }, [base, quote, quoteCurrency, baseCurrency, exchangeRate, fee]);

  return {
    base,
    displayName,
    exchangeRate,
    fee,
    onBaseChange,
    onFeeChange,
    onQuoteChange,
    quote,
  };
};

export default useConverter;
