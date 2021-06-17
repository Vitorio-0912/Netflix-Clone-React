/* eslint-disable import/no-anonymous-default-export */

import React, {useEffect, useState} from 'react';
import './App.css';
import tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

const [movielist, setMovieList] = useState([]);
const [FeaturedData, setFeaturedData] = useState(null)
const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      let list = await tmdb.getHomelist();
      setMovieList(list);

      let originals = list.filter(i=> i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);      
    }

    loadAll();
  },[]);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 15){
        setBlackHeader(true);
      }else {
        setBlackHeader(false);
      }

    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  },[]);

  return(
    <div className="page"> 

    <Header black={blackHeader} />

    {FeaturedData &&
    <FeaturedMovie item={FeaturedData}/>
    }


    <section className="lists">
      {movielist.map((item, key)=>(
      <MovieRow key={key} title={item.title} items={item.items}/>
      ))}
    </section>

    <footer>
      Feito com <span role="img" aria-label="coração">❤️</span> pelo Dev vitório<br/>
      Direitos de imagem para Netflix<br/>
      Dados pegos do site themoviedb.org
    </footer>
    </div>
  );
}