import './styles.scss';
import MainConverter from '../../components/MainConverter/MainConverter';
import { SavedConversions } from '../../components/SavedConversions/SavedConversions';
import { FavoritesProvider } from '../../providers/FavoritesProvider';

const Home = (): JSX.Element => {
  return (
    <FavoritesProvider>
      <main className="main-converter-view">
        <section>
          <MainConverter />
        </section>
        <section>
          <SavedConversions />
        </section>
      </main>
    </FavoritesProvider>
  );
};

export default Home;
