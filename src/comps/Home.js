import React, { useState, useEffect} from "react";
import axios from 'axios'
import {Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom';
import * as ReactBootStrap from "react-bootstrap";
import Table from 'react-bootstrap/Table'
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Navbar from 'react-bootstrap/Navbar'



export default function Home() {
    const history= useHistory()
    const [data, setData]=useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    
    const handleLogOut=()=>{
        setIsLoaded(true)
        localStorage.removeItem('Token')
        history.push("/")
        setIsLoaded(false);
    }

    useEffect(async () => {
        setIsLoaded(true);
        const result = await axios('https://reqres.in/api/unknown');
        setData(result.data.data);
        setIsLoaded(false);
      },[])
      
    return (
        <div className="homePage">
            <Navbar className="homeLogout">
            <Button variant="contained" color="primary" onClick={()=>{history.push('/adduser')}}>Add User<AddIcon/></Button>
                <h1>Home Page</h1>
            <Button className="logOutBtn" variant="contained" color="primary" onClick={handleLogOut}>Log Out
            <ExitToAppIcon/>
            {isLoaded? <ReactBootStrap.Spinner animation="border"/>: null}
            </Button></Navbar>
            {isLoaded? <ReactBootStrap.Spinner animation="border"/>:

            <div className="homeTable">         
                <Table>
            <thead>
             <tr>
                 <th>Name</th>
                 <th>Year</th>
                 <th>Actions</th>
             </tr>
            </thead>
            {data.map((item, ind)=>
        <>
            <tbody>
            <tr>
                <td>
                    {item.name}
                </td>
                <td>
                    {item.year}
                </td>
                <td className="detailBTN" >
                    <Button variant="contained" color="primary" 
                    onClick={
                        ()=>{
                            setIsLoaded(true)
                            history.push(`details/${item.id}`)
                         }
                     }>Details</Button>
                </td>
             </tr> 
            </tbody>
            </>)}
        </Table>
        </div>
            }
            <div>
            </div>
        </div>
    )
}
