import './Watch.css';
import React, { useState, useEffect } from 'react'
import { deattribute } from 'kitsu-core'
import Imagepremier from "./premierBadge.svg"
import 'unfetch/polyfill'

function Watch() {

    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    //fetch
    useEffect(()=> {
        fetch('./data/watchData.json', {
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            // console.error(response);
            const parsedData = deattribute(response)
            setData(parsedData)
            setIsLoading(false)
        })
        .catch(err => console.error(err))
    },[])
 
    if(isLoading) return <p className='loading' data-testid = "loading">LOADING</p>;
 
    

    return (
    <div className="Watch">
        <div className="heading">
            <h1 className='heading-title'>{data.data.attributes.title}</h1>
        </div>

        {data.included.map((content, idx) => {
            return(
                <>
                    <div className="container">
                    
                        <div className="duration_container">
                          {timeHelper(content.attributes.duration)}
                        </div>


                        <img 
                        className='img-container' 
                        src={content.attributes.cover_url} 
                        alt={content.attributes.title} 
                        onClick={(e)=>window.location.href = content.attributes.web_url}/>


                        {content.attributes.is_premier ? (
                            <div 
                            key={`image-${idx}`}
                            className="image-carousel">
                                <div className="image-premier">
                                    <img src={Imagepremier} alt="image-premier" />
                                </div>
                            </div>
                        ) : null}

                        
                        <div className="title-container">
                            {content.attributes.title}
                        </div>
                        
                        <div className='content-title'>
                            {content.attributes.alt_title}
                        </div>
                        
                        
                        
                        <div 
                        className="progressBar-container" data-testid='progressBar-test'>
                            <div 
                            className="progressBar-value"
                                style={
                                    {"width":(content.attributes.watch_duration /content.attributes.duration * 100)+'%'}
                                }
                            >
                            </div>
                            
                        </div>
                    </div> 
                </>
            )
        })}
    </div>
    )
}

// export function timeHelper(duration){
//     return (
//         Math.floor(duration % 3600 / 60).toString()
//     );
// }


// export function timeHelper(duration) {
//     duration = Number(duration);
//     var hour = Math.floor(duration / 3600);
//     var minute = Math.floor(duration % 3600 / 60);
//     var seconds = Math.floor(duration % 3600 % 60);

//     var hDisplay = hour > 0 ? hour + (hour == 1 ? ":" : ":") : "";
//     var mDisplay = minute > 0 ? minute + (minute == 1 ? ":" : ":") : "00:";
//     var sDisplay = seconds > 0 ? seconds + (seconds == 1 ? "" : "") : "";
//     // return hDisplay + mDisplay + sDisplay; 
//     return hDisplay + mDisplay + sDisplay; 
// }

export function timeHelper(duration){
    
    var hour = Math.floor(duration / 3600);
    var minute = Math.floor(duration % 3600 / 60);
    var seconds = Math.floor(duration % 3600 % 60);

    function padTo2Digits(num){
        return num.toString().padStart(2,'0')
    }

    return duration < 3600 ? (
        duration = `${padTo2Digits(minute)}:${padTo2Digits(seconds)}`) :
        (duration = `${padTo2Digits(hour)}:${padTo2Digits(minute)}:${padTo2Digits(seconds)}`)
}

export function watchDurationHelper(watchDuration, duration){
    // calculated from watch_duration/duration * 100%
    return(
       watchDuration / duration * 100
    )
    
}


export default Watch;



