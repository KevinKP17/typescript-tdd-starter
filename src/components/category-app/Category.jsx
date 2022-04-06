import './Category.css'
import React, {useState, useEffect } from 'react'
import { deattribute, deserialise } from 'kitsu-core'
import 'unfetch/polyfill'
import { category } from './Category.stories'
// import { response } from 'msw'

function Category() {

    const [data, setData] =  useState({})
    const [isLoading, setIsLoading] = useState(true)
    
    //FETCH
    useEffect(()=>{
        fetch('./data/categoryData.json', {
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            // console.error(response)
            const parsedData = deserialise(response)
            console.error(response)
            setData(parsedData)
            setIsLoading(false)
        })
        .catch(err => console.error(err))
    }, [])    

    if(isLoading) return <p className='loading' data-testid="loading">LOADING</p>

    return(
        <>
        <div className="Category">
       
          <ol>
              {data.data.map(dataCategory => (
                  <li>
                      {dataCategory.attributes.title}
                  </li>
              ))}
              
          </ol>

          {data.data.map((dataCategory, idx) => {
              return(
                  <>
                      <div className="category" key={idx}>
                      {/* {dataCategory.relationships.category.data['id', 'type']} */}
                      {dataCategory.relationships.category.data.id}
                      {dataCategory.relationships.category.data.type}
                      </div>

                        <div className="content">
                            {dataCategory.links.self}
                        </div>
                  </>
              )
          })}

          {data.included.map((dataIncluded, idex) => {
              return(
                  <>
                      <div className="included" key={idex}>
                      {dataIncluded.links.self}
                      </div>
                  </>
              )
          })}
        </div>
        </>
    )
}

export default Category;