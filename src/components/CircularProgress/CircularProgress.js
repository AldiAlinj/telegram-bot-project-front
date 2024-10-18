import React, { useEffect, useRef } from 'react'
import './circularprogress.css'

const CircularProgress = ({value}) => {

    const ref = useRef(null);

    useEffect(() => {
    if(!ref.current) return;
    ref.current.style.setProperty("--progress", value + "%")
    if(value < 40){
        ref.current.style.setProperty("--color", "#FC6049")
    }else if(value < 80){
        ref.current.style.setProperty("--color", "#927AFF")
    }else{
        ref.current.style.setProperty("--color", "#5690FF")
        
    }
    ref.current.setAttribute('data-value', value + "%")
    }, [value])
    

  return (
    <div ref={ref} class={`progress`} data-value={value}></div>
  )
}

export default CircularProgress