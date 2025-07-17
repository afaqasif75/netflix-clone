import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom';


const Player = () => {

  const {id} = useParams();

  const navigate = useNavigate();


  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmNlNTZmMWRjNWFlM2ZkZTJhMDIwZjkzZTBhOWE2NyIsIm5iZiI6MTc1MjU5ODU2Ny4xOTgwMDAyLCJzdWIiOiI2ODc2ODgyN2NjZjZlNjVhNmFhN2IxZTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7adkNA4L_wecMkCWfTitTSpqMSbnZ_va3JYYlfkE3uA'
  }
};


useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
},[id])




  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{
        navigate(-1)}} />
      {apiData.key ? (
      <iframe 
      width='90%' 
      height='90%'
      src={`https://www.youtube.com/embed/${apiData.key}`}
      title='trailer' 
      frameBorder='0' 
      allowFullScreen></iframe>) : (
        <p>Trailer not available</p>
      )}
      <div className='player-info'>
        <p>{apiData.published_at}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player