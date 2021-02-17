import React from 'react';
import { Link , useHistory} from 'react-router-dom';
import {Button} from '@material-ui/core'

const Landing = (props) => {
  const history = useHistory();
  const token = localStorage.getItem("Token");

  const homeBtn = ()=>{
    (token)? 
    history.push('/home'):
    alert("Please! Login First")
  }

  const loginBtn=()=>{
   (token)? alert("You are already logged in"):
   history.push('/login')
  }
  return (
    <div className="landing">
      <h1>Landing</h1>
      <Button variant="contained" color="primary" onClick={homeBtn}>Home Page</Button>
      <Button variant="contained" color="primary" onClick={loginBtn}>Login User</Button>
    </div>
  )
};

export default Landing;
