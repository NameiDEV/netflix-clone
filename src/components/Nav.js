import React, {useState, useEffect} from 'react'
import './Nav.css';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const [show, setshow] = useState(false);
  const [searchvalue, setsearchvalue] = useState('')
  const navigate = useNavigate();

  useEffect(() =>{
    window.addEventListener("scroll", () => {
      if(window.scrollY >50) {
        setshow(true);
      }
      else {
        setshow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});

    }
  },[]);

  const handdleChange = (e) => {
      setsearchvalue(e.target.value);
      navigate(`/search?q=${e.target.value}`);
  };

  return (
    <nav className={`nav ${show && 'navblock'}`}>
      <img 
        alt='netflix logo'
        src={`${process.env.PUBLIC_URL}/main-img/netflixlog.png`}
        className='navlogoimg'
        onClick={() => window.location.reload()}
      />

      <input value={searchvalue} onChange={handdleChange} className='nav_input' type='text' placeholder='영화를 검색해주세요.'/>

      <img className='navimg'
        alt='netflix avatar'
        src={`${process.env.PUBLIC_URL}/main-img/netflix-avatar.png`}
      />
    </nav>
  );
};

export default Nav;

