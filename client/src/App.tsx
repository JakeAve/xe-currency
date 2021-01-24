import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Home from './views/Home/Home';

const App = (): JSX.Element => {
  return (
    <>
      <Router>
        <Nav />
        <Route path="/" component={Home} />
        <Footer />
      </Router>
    </>
  );
};

export default App;
