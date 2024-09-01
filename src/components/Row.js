import axios from '../api/axios';
import React, {useState, useEffect } from 'react'
import './Row.css';
import MovieModal from './MovieModal';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Row = ({title,isLargeRow,fetchUrl,id}) => {
    
    const [Movies, setMovies] = useState([]);
    const [Modalopen, setModalopen] = useState(false);
    const [Movieselected, setMovieselected] = useState({});
    useEffect(() => {
        fetchMovieData();

    },[]);

        const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl);
            console.log("request",request);
            setMovies(request.data.results);
            
         
            }
        const handdleClick = (movie) => {        
        setModalopen(true);
        setMovieselected(movie);
        };

    
  return (
    <section className='row'>
        
        <h2 className='row-header-title'>
            {title}
        </h2>

        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            breakpoints={{
                1378: {
                    slidesPerView:6,
                    slidesPerGroup:5,
                },
                998: {
                    slidesPerView:5,
                    slidesPerGroup:4,
                },
                625: {
                    slidesPerView:4,
                    slidesPerGroup:4,
                },
                0: {
                    slidesPerView:3,
                    slidesPerGroup:3,
                },
            }}
                navigation
                loop={true}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}

                /* spaceBetween={50}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')} */>

        {/* <div className='slider'>
        <div className='slider__arrow-left' >
            <span className='arrow' 
            onClick={() => {
                document.getElementById(id).scrollLeft = document.getElementById(id).scrollLeft - (window.innerWidth - 80);
            }} >
                    {'<'}
            </span>
        </div> */}

        <div  id={id} className='slider__items'>
             { Movies.map((movie) => (
                <SwiperSlide>
                <img
                    key={movie.id}
                    className={`${isLargeRow ? 'row_poster-large' : 'row__poster'  }`}
                    src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                    alt={movie.name}
                    onClick={()=> handdleClick(movie)}
                />
                </SwiperSlide>
            )) } 

        </div>
        </Swiper>
        {/* <div className='slider__arrow-right'>
            <span className='arrow' 
            onClick={() => {
                document.getElementById(id).scrollLeft = document.getElementById(id).scrollLeft + (window.innerWidth - 80);
            }} >
                {">"}
            </span>
        </div>
        </div> */}
        
        
            {
                Modalopen && (
                    <MovieModal {...Movieselected} setModalopen={setModalopen}/>
                )
            }
            
    </section>
  )
}

export default Row