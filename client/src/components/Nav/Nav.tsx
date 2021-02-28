import './styles.scss';
import { Link } from 'react-router-dom';

const Home = (): JSX.Element => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">XE-Currency</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Home;
