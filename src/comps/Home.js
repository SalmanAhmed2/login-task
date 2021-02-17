import React, { useState, useEffect} from "react";
import axios from 'axios'
import {Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom';
import * as ReactBootStrap from "react-bootstrap";
import Table from 'react-bootstrap/Table'



export default function Home() {
    const history= useHistory()
    const [data, setData]=useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const handleLogOut=()=>{
        setIsLoaded(true);
        localStorage.removeItem('Token')
        history.push("/")
        setIsLoaded(false);
    }
    useEffect(async () => {
        const result = await axios(
          'https://reqres.in/api/unknown',
        );
        
        setData(result.data.data);
      },[])
    return (
        <div>
            <h1>Home Page</h1>
            <p className="success">You have successfully logged in!</p>
            <div className="homeBTN">
            <Button variant="contained" color="primary" onClick={handleLogOut}>Log Out
            {isLoaded? <ReactBootStrap.Spinner animation="border"/>: null}
            </Button>
            </div>
          
            <Table>
               <thead>
                <tr>
                    <th>Name</th>
                    <th>Year</th>
                    <th>Actions</th>
                </tr>
               </thead>
               {data.map((item)=>
           <>
               <tbody>
               <tr>
                   <td>
                       {item.name}
                   </td>
                   <td>
                       {item.year}
                   </td>
                   <td>
                       <Button variant="contained" color="primary" onClick={()=>history.push(`details/${item.id}`)}>Details</Button>
                   </td>
                </tr> 
               </tbody>
               </>)}
           </Table>
            <div>
            </div>
        </div>
    )
}
