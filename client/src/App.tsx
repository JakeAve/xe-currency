import './normalize-css.scss';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Home from './views/Home/Home';
import About from './views/About/About';
import { LanguageProvider } from './providers/LanguageProvider';
import AllConversions from './views/AllConversions/AllConversions';

const App = (): JSX.Element => {
  return (
    <Router>
      <LanguageProvider>
        <>
          <Nav />
          <div className="main-row">
            <aside />
            <Switch>
              <Route path="/about" exact component={About} />
              <Route path="/all-conversions" exact component={AllConversions} />
              <Route path="/" component={Home} />
              <Route path="*" component={Home} />
            </Switch>
            <aside />
          </div>
          <Footer />
        </>
      </LanguageProvider>
    </Router>
  );
};

export default App;
