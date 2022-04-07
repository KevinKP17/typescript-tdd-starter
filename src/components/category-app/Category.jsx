import "./Category.css";
import React, { useState, useEffect } from "react";
import { deattribute, deserialise } from "kitsu-core";
import "unfetch/polyfill";
import { category } from "./Category.stories";

function Category() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [watchData, setWatchData] = useState()

  //FETCH
  useEffect(() => {
    fetch("./data/categoryData.json")
      .then((response) => response.json())
      .then((response) => {
        const parsedData = deserialise(response.data);

        
        fetch(parsedData[0].links.self)
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            setWatchData(response.data)
          });

      
        setData(parsedData);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (isLoading) return <p className="loading">LOADING</p>;
  console.log("debug data", data);
  console.log("debug watchData", watchData);
  return (
    <>
    <div className="Category">
      {data.map((dataCategory, idx) => {
        return <span key={idx}>{dataCategory.attributes.title}</span>;
      })}

      <div className="content">
        {data.contents.data.map(video => video.cover_url)}
      </div>
    </div>

     
    </>
  );
}

export default Category;
