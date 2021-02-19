import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import Landing from "./comps/Landing";
import Home from "./comps/Home";
import Login from "./comps/Login";
import Register from './comps/Register'
import ProtectedRoute from "./comps/ProtectedRoute";
import ProtectedForm from './comps/ProtectedForm';
import Details from './comps/Details'
import AddUsers from './comps/AddUsers'
import Edit from './comps/Edit'

function App(props) {
  const token = localStorage.getItem("Token")
  
  return (
    <div className="app">
      <Router>
        <Switch>
         
          <Route exact path='/' component={Landing}/>

          <ProtectedForm path="/login" component={Login}/>
        
          <ProtectedForm path='/register' component={Register}/>
        
          <ProtectedRoute path="/home" component={Home} />

          <ProtectedRoute path="/details/:id" component={Details} />

          <Route path='/adduser' component={AddUsers}/>

          <Route path="/edit/:id" component={Edit}/>
        
        </Switch>

      </Router>
    </div>
  );
}

export default App;
