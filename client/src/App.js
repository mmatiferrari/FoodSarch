import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage"
import Home from './components/Home/Home';
import Details from './components/Details/Details';
import RecipeCreate from './components/Created/RecipeCreate';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path= "/" component={LandingPage}/>
          <Route path= "/home" component={Home}/>
          <Route path= "/recipe" component={Details}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
