import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
export default function Details() {
   
    const [data, setData] = useState([]);
    let {id} = useParams();
    console.log(id,"id")
    useEffect(async () => {
        const result = await axios(
          `https://reqres.in/api/unknown/${id}`,
        );
        setData(result.data.data);
      },[])

    return (
        <div>
         <h2>Details Page</h2>
        <div>
           {data.name}
        </div>
        </div>
    )
}
