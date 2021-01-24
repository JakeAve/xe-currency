import './styles.scss';
import { useState, useEffect } from 'react';
import getAvailableCurrencies from '../../actions/getAvailableCurrencies';

interface Props {
  id: string;
  currency: string;
  setCurrency: (e: { target: HTMLSelectElement }) => void;
  name?: string;
  className?: string;
}

const Selector = (props: Props): JSX.Element => {
  const { id, setCurrency, currency, name, className } = props;
  const [availableCurrencies, setAvailableCurrencies] = useState<Array<Currency>>([]);

  useEffect(() => {
    getAvailableCurrencies().then((availables) => setAvailableCurrencies(availables));
  }, []);

  const options = availableCurrencies.map(({ code, name }) => (
    <option key={code} value={code}>
      {name}
    </option>
  ));

  return (
    <select id={id} onChange={setCurrency} value={currency} name={name} className={className}>
      {options}
    </select>
  );
};

export default Selector;
