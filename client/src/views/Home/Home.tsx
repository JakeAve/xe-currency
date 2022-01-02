import './styles.scss';
import MainConverter from '../../components/MainConverter/MainConverter';
import { SavedConversions } from '../../components/SavedConversions/SavedConversions';

const Home = (): JSX.Element => {
  return (
    <main className="main-converter-view">
      <section>
        <MainConverter />
      </section>
      <section>
        <h2>Saved</h2>
        <SavedConversions />
      </section>
    </main>
  );
};

export default Home;
