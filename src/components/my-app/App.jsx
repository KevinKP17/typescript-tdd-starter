import './App.css';
import React, { useState, useEffect } from 'react'
import { deattribute } from 'kitsu-core'
import Premiericon from "./premierBadge.svg"
import 'unfetch/polyfill'
// import fetch from "node-fetch";
// globalThis.fetch = fetch

function App() {

  // REACT HOOKS
  const [ data, setData ] = useState({})
  const [ isLoading, setIsLoading ] = useState(true)
//   const fetch = require("node-fetch");
//   global.fetch = require("node-fetch");z

// FETCH DATA
  useEffect(() => {
    fetch('./data/Portrait.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(response => {
      const parsedData = deattribute(response)
      setData(parsedData)
      setIsLoading(false)
    })
    .catch(err => console.error(err));
  }, [])

  if (isLoading) return <p className='loading' data-testid = "loading">LOADING</p>;
  
  // UI
  return (
    <div className="App">
      <div className='title-content'>
      <h2 className='title-title'>{data.data.attributes.title}</h2>
      </div>
      {data.included.map((content, idx) => {
        return (
          < >
          <div className="container">
            <img 
            className="content" 
            src={content.attributes.cover_url} 
            alt={content.attributes.title} 
            onClick={(e)=>window.location.href = content.attributes.web_url} />
           
           {content.attributes.is_premier ? (
            <div 
            key={`image-${idx}`} 
            className="image-carousel">
              <div className="premier-badge">
                <img  src={Premiericon} alt='premier-badge'/>
             </div>
            </div>
          ) : null}
          </div>
          </>
        )
      })}
    </div>
  )
}

export default App;