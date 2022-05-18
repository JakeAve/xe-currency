import ConversionListItem from '../../components/ConversionListItem/ConversionListItem';
import { useLanguageContext } from '../../providers/LanguageProvider';
import useAllConversions from './hooks/useAllConversions';

const AllConversions = (): JSX.Element => {
  const { strings: translatedStrings } = useLanguageContext();
  const { availableConversions, availableCurrencies } = useAllConversions();
  console.table(availableConversions);
  return (
    <section className="view-container">
      <h2>{translatedStrings.allConversions}</h2>
      {availableConversions.map((conversion, key) => (
        <ConversionListItem key={key} {...conversion} />
      ))}
    </section>
  );
};

export default AllConversions;
