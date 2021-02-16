import React from 'react'
import { useLocation, useHistory} from 'react-router-dom';
import {Button} from '@material-ui/core'
export default function Home() {
   
    const history= useHistory();

    return (
        <div>
            <h1>Home Page</h1>
            <Button variant="contained" color="primary" onClick={()=>{history.push('/')}}>Back</Button>
            <div>
            </div>
        </div>
    )
}
