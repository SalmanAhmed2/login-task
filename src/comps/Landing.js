import React from 'react';
import { Link , useHistory} from 'react-router-dom';
import {Button} from '@material-ui/core'

const Landing = (props) => {
  const history = useHistory();
  return (
    <div className="landing">
      <h1>Landing</h1>
      <Button variant="contained" color="primary" onClick={()=>{history.push('/home')} }>Home Page</Button>
      <Button variant="contained" color="primary" onClick={()=>{history.push('/form')}}>Login/Register</Button>
      <p>Logged in status: {props.user}</p>
    </div>
  )
};

export default Landing;
