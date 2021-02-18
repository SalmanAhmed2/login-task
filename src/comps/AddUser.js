import React,{useState, useEffect} from 'react'
import * as ReactBootStrap from "react-bootstrap";
import { Button,TextField } from "@material-ui/core";

export default function AddUser() {

    const [values, setValues]=useState([])
    const [data, setData]=useState([])
    const [isLoaded, setIsLoaded] = useState(false);
    const handleSubmit =()=>{
        setIsLoaded(true);
        setData({...values})
        result();
        setIsLoaded(false);
    }

        const  result=() =>{
            setIsLoaded(true);
             fetch('https://reqres.in/api/users',{
                method:'post',
                headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data
            })
        })
        .then((response)=>response.json())
        .then((response)=> {
            console.log(response,"res")
            setIsLoaded(false);
        })
        .catch((err)=>{
            setIsLoaded(false);
            console.log(err,"error")

        })
    } 
        
    return (
        <div>
            <h2>Add New User</h2>
            <div>
        <form  className="userForm">

        <TextField label="User's Name" required value={values.name} 
        onChange={(event) => {setValues({...values, name: event.target.value})}}
        />

        <TextField label="User's Job" required value={values.job}
        onChange={(event) => {setValues({...values, job: event.target.value})}}
        />

        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit
        </Button>
        </form>
        {isLoaded? <ReactBootStrap.Spinner animation="border"/>: null}
          </div>
        </div>
    )
}
