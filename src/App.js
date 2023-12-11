import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup'
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Context from './context/Context';
import Account from './components/Account';
import Transfer from './components/Transfer';
import Canteen from './components/Canteen';
import Cant from './components/Cant';
import Stationary from './components/Stationary'
import JuicePoint from './components/JuicePoint';
function App() {
  return (
    <>
    <Context>
    <BrowserRouter basename='/mini-project'>
    <Navbar/>
    <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route exact path="/signup">
            <Signup/>
          </Route>
          <Route exact path="/account">
            <Account/>
          </Route>
          <Route exact path="/transfer">
          <Transfer/>
          </Route>
          <Route exact path="/canteen">
          <Canteen/>
          </Route>
          <Route exact path="/cant">
          <Cant/>
          </Route>
          <Route exact path="/stationary">
          <Stationary/>
          </Route>
          <Route exact path="/juicePoint">
          <JuicePoint/>
          </Route>
        </Switch>
    </BrowserRouter>
    </Context>
    </>
  );
}

export default App;
