import React, { useRef } from 'react'
import './MovieModal.css';
import useOnClickOutside from '../../Hooks/useOnClickOutside';

function MovieModal(
    {backdrop_path,
        title,
        overview,
        name,
        release_date,
        first_air_date,
        vote_average,
        setModalopen, }) {


    const ref = useRef();
    useOnClickOutside(ref, () => {
        setModalopen(false);
    })
    
  return (
    <div className='presentaion'>
        <div className='wrapper-modal'>
             <div className='modal' ref={ref}>               
                <span onClick={() => setModalopen(false)}>  
                    X
                </span>
                <img className='modal__poster-img'
                     src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                     alt='modal__poster-img'

                />
                <div className='modal__content'>
                    <p className='modal__details'>
                        <span className='modal__user_perc'>
                            100%
                        </span>
                        {release_date ? release_date : first_air_date}

                    </p>

                    <h2 className='modal-title'>
                        {title ? title : name}
                        </h2>
                        <p className='modal-overview'>
                             평점 : {vote_average}  </p>
                        <p className='modal-overview'>
                             평가 : {overview}  </p>
                </div>

             </div>
        </div>
    </div>
  )
}

export default MovieModal