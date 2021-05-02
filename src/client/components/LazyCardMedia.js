import React, {useState, useEffect, useRef} from 'react'
import { CardMedia } from '@material-ui/core'


export default function LazyCardMedia({image, alt, height}){
    const [visible, setVisible] = useState(false);
    const placeholderRef = useRef(null);
    useEffect(() => {

      if (!visible && placeholderRef.current) {
        const observer = new IntersectionObserver(([{ intersectionRatio }]) => {
          if (intersectionRatio > 0) {
            setVisible(true);
          }
        });
        observer.observe(placeholderRef.current);
        return () => observer.disconnect();
      }
    }, [visible, placeholderRef]);
  
    return (visible
      ? 
      <CardMedia
        component='img'
        image={image}
        alt={alt}
        height={height}
      />
      : 
      <div style={{height: height, backgroundColor: '#EEE'}} aria-label={alt} ref={placeholderRef} />
    );
  };