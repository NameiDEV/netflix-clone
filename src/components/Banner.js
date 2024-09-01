import React, { useState, useEffect } from 'react'
import axios from '../api/axios';
import requests from '../api/requests';
import './Banner.css';
import styled from 'styled-components';


const Banner = () => {

    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    
    useEffect(() => {
        fetchData();
    }, []);
    

    

    // 비동기로 데이터를 받아오는 과정
    const fetchData = async () => {

        const request = await axios.get(requests.fetchNowPlaying);
        
        const movieId = request.data.results[
            Math.floor(Math.random() * request.data.results.length)
        ].id;

        const { data: movieDetails } = await axios.get(`movie/${movieId}`,
            {
                params: { append_to_response: 'videos' },
            });
        
        
        setMovie(movieDetails);
    };

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n) + '...' : str;
    };

    console.log(movie);

    if (!isClicked) {
        return (
            <header
                className='banner'
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                    backgroundImageSize: "cover",
                    backgroundposition: "top center"
                }}
            >
                <div className='banner__contents'>
                    <h1>
                        {movie.title || movie.name || movie.orginal_title}
                    </h1>
                    <div className='banner__buttons'>
                        <button className='baner__button' 
                                onClick={() => setIsClicked(true)}>Play</button>
                        <button className='baner__button'>More Information</button>


                    </div>

                    <p className='banner__description'>{truncate(movie.overview, 100)}</p>
                </div>
                <div className='banner__fadeBottom'></div>

            </header>
        );
    }  else {
        
        return (

            
            
            <Container>
                    <HomeContainer>
                        <Iframe
                            src = {`https://www.youtube.com/embed/${movie.videos.results[0].key}
                            ?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
                            width="640" 
                            height="360" 
                            frameborder="0" 
                            allow= "autoplay; fullscreen"  
                            >
                        </Iframe>

                    </HomeContainer>
            </Container>
        );
         
         
    }
    
    
}
const Iframe = styled.iframe`
    width: 100%;
    height: 100vh;
    z-index: -1;
    opacity: 0.65;
    border: none;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;

    }
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    heigh: 100%;
`;
const HomeContainer = styled.div`
    width: 100%;
    height: 100%;

`;



export default Banner


