import React, { useState} from "react";
import {Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom';
import * as ReactBootStrap from "react-bootstrap";


export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false);
    
    const history= useHistory()

    const handleLogOut=()=>{

        setIsLoaded(true);
        localStorage.removeItem('Token')
        history.push("/")
        setIsLoaded(false);
    }
    return (
        <div>
            <h1>Home Page</h1>
            <p className="success">You have successfully logged in!</p>
            <div className="homeBTN">
            <Button variant="contained" color="primary" onClick={()=>{history.push('/')}}>Back</Button>
            <Button variant="contained" color="primary" onClick={handleLogOut}>Log Out
            {isLoaded? <ReactBootStrap.Spinner animation="border"/>: null}
            </Button>
            </div>
            <div>
            </div>
        </div>
    )
}
