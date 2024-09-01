import React, {useState,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import  axios  from '../../api/axios';
import { useDebounce } from '../../Hooks/useDebounce';

export default function SearchPage() {

  const navigate = useNavigate();   /* useNavigate훅을 가져와서 함수 호츨을 변수등록 */

  const [searchResult, setsearchResult] = useState([]);
  const useQuery = () => {
    
    return new URLSearchParams(useLocation().search)
  }

  let query = useQuery();
  /* const searchTerm = query.get('q') */ 
  const debouncedSearchTerm = useDebounce(query.get('q'), 500)
  useEffect(() => {
    if(debouncedSearchTerm) {
        fetchSearchMovie(debouncedSearchTerm);
    }
      
   } , [debouncedSearchTerm]);
  const fetchSearchMovie = async (debouncedSearchTerm) => {
    try {
        const request = await axios.get(
           `/search/multi?include_adult=false&query=${debouncedSearchTerm}`
        )
        console.log('request',request);
        setsearchResult(request.data.results)
    } catch(error) {
        console.log('error', error);
    }
  }

  const renderSearchResult = () => {
    return searchResult.length > 0 ? (
      <section className='search-container'>
         {searchResult.map((movie) => {
          if(movie.backdrop_path !== null && movie.media_type !== 'person') {
            const movieImageURL = 
            "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
            return (
              <div className='movie' key={movie.id}>
                <div onClick={() => navigate(`/${movie.id}`)} className='movie__column-poster'>
                  <img
                      src={movieImageURL} alt='movie'
                      className='movie__poster'
                  />
                </div>

              </div>
            )
          }
         })}
      </section>
    )
    : (
        <section className='no-results'>
          <div className='no-results__text'>
              <p>
                      찾고자하는 검색어 "{searchResult}"의 결과를 찾을 수 없습니다.
              </p>

          </div>

        </section>
    )
  }
  
  return renderSearchResult();
}
