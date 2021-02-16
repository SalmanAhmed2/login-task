import {useState, useEffect} from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from './comps/Landing'
import Home from './comps/Home';
import Registration from './comps/Registration';
import ProtectedRoute from "./comps/ProtectedRoute";

function App(props) {

  const [user, setUser] = useState(false);
  
  const handleLogin = e => {
    e.preventDefault();
    setUser(true);
  }

  const handleLogout = e => {
    e.preventDefault();
    setUser(false);
  }
  return (
    <div>
      <Router>
        <Switch>
          
          <Route exact path='/'>
            <Landing user={user.toString()}/>
            </Route>

            <Route path='/form'>
            <Registration user={user} />
            </Route>

            <ProtectedRoute path='/home'>
              <Home user={user}/>
            </ProtectedRoute>

        </Switch>
      </Router>
 </div>

  );
}

export default App;
