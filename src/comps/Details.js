import React,{useEffect,useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import * as ReactBootStrap from "react-bootstrap";
import axios from 'axios'
import {Button} from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';


export default function Details() {
  const history= useHistory()
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    let {id} = useParams();
    
    async function deletePost() {
      setIsLoaded(true)
        const result = await fetch(`https://reqres.in/api/users/${id}`, { method: 'DELETE' })
        
        .then((response)=> {
          console.log(response,"Delete")
          history.push('/home')
          setIsLoaded(false)
        })
        .catch((err)=>{
          console.log(err,"error")
          setIsLoaded(false)
        })
       }
    
    useEffect(async () => { 
      setIsLoaded(true);
        const result = await axios(`https://reqres.in/api/unknown/${id}`)
        setData(result.data.data);
        setIsLoaded(false);
      },[])

    return (

        <div className="details">
         <h2>Details Page</h2>
         {isLoaded? <ReactBootStrap.Spinner animation="border"/>: 
        <div className="detailsCard">
        <h4>Name:<span>{data.name}</span></h4>
          <h4>Year: <span>{data.year}</span></h4>
          <h4>Color:<span>{data.color}</span></h4>
          <h4>Pantone Values:<span>{data.pantone_value}</span></h4>
          <div className="detailsBTN">
          <Button variant="contained" color="primary"  onClick={()=>{
            history.push(`/edit/${id}`,{data})
            }}><CreateIcon/>Edit</Button>
          <Button variant="contained" color="primary" onClick={deletePost}>Delete<DeleteIcon/></Button>
          </div>
        </div>
}    
        </div>
    )
}
