import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import * as ReactBootStrap from "react-bootstrap";
import axios from 'axios'
export default function Details() {
   
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    let {id} = useParams();
    
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
          <h4>Values:<span>{data.pantone_value}</span></h4>
        </div>
}
     
        </div>
    )
}
