import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/assets/cards/Cards_data'
import { Link } from 'react-router-dom';


const TitleCards = ({title, category}) => {


  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmNlNTZmMWRjNWFlM2ZkZTJhMDIwZjkzZTBhOWE2NyIsIm5iZiI6MTc1MjU5ODU2Ny4xOTgwMDAyLCJzdWIiOiI2ODc2ODgyN2NjZjZlNjVhNmFhN2IxZTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7adkNA4L_wecMkCWfTitTSpqMSbnZ_va3JYYlfkE3uA'
  }
};



  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel);
    
    return () => {
    cardsRef.current?.removeEventListener('wheel', handleWheel);
  };
  },[category])

  return (
    <div className='title-cards'>
        <h2>{title ? title : "Popular on Netflix"}</h2>
        <div className='card-list' ref={cardsRef}>
          {apiData.map((card, index)=>{
            return <Link to={`/player/${card.id}`} className="card" key={card.id}>
              <img src={`https://image.tmdb.org/t/p/w500`+ card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          })}
          
        </div> 
    </div>
  )
}

export default TitleCards