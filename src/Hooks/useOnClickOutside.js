import React, { useEffect } from 'react'

export const useOnClickOutside = (ref, handdler) => {
    useEffect(() => {
      const listener = (event) => {
        console.log('ref',ref.current);
        if(!ref.current || ref.current.contains(event.target)) {
            return
        }
        handdler();
      };
        document.addEventListener('mousedown',listener)
        document.addEventListener('touchstart',listener)
      return () => {
        document.removeEventListener('mousedown',listener)
        document.removeEventListener('touchstart',listener)

      }
    }, [])
    
  
}

export default useOnClickOutside;