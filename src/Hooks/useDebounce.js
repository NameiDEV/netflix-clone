import { useState,useEffect } from "react";

export const useDebounce = (value, delay) => {
    const [debounceValue, setdebounceValue] = useState(value)
   useEffect(() => {
     
    const handdler = setTimeout(() => {
        setdebounceValue(value)
    },delay);
   
     return () => {
       clearTimeout(handdler);
     }
   }, [value, delay])
   
   return debounceValue;

}

