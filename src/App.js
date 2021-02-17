import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import Landing from "./comps/Landing";
import Home from "./comps/Home";
import Registration from "./comps/Registration";
import ProtectedRoute from "./comps/ProtectedRoute";

function App(props) {

  useEffect(() => {
  localStorage.removeItem('Token');
}, [])
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing/>
          </Route>

          <Route path="/form">
            <Registration/>
          </Route>

          <ProtectedRoute path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
