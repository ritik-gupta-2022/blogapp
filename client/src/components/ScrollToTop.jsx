import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function ScrollToTop() {
    const pathName = useLocation();
    useEffect(()=>{
        window.scrollTo(0,0); // when navigating through links open page from top
    }, [pathName]);
  return null
}

export default ScrollToTop