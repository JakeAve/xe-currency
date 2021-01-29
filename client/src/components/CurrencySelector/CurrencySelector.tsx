import './styles.scss';

interface Props {
  id: string;
  currency: string;
  availableCurrencies: Array<Currency>;
  setCurrency: (e: { target: HTMLSelectElement }) => void;
  name?: string;
  className?: string;
}

const Selector = (props: Props): JSX.Element => {
  const { id, setCurrency, currency, name, className = '', availableCurrencies } = props;

  const options = availableCurrencies.map(({ code, name }) => (
    <option key={code} value={code}>
      {name}
    </option>
  ));

  return (
    <select className={'currency-select ' + className} id={id} onChange={setCurrency} value={currency} name={name}>
      {options}
    </select>
  );
};

export default Selector;
