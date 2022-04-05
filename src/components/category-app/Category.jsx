import './Category.css'
import React, {useState, useEffect } from 'react'
import { deattribute } from 'kitsu-core'
import 'unfetch/polyfill'
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
            console.error(response)
            const parsedData = deattribute(response)
            setData(parsedData)
            setIsLoading(false)
        })
        .catch(err => console.error(err))
    }, [])    

    if(isLoading) return <p className='loading' data-testid="loading">LOADING</p>

    return(
        <div className="Category">
            <div className="heading">
                <h1 className='heading-title'>{data.data.attributes.title}</h1>
            </div>
        </div>
    )
}

export default Category;