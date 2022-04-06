import "./Category.css";
import React, { useState, useEffect } from "react";
import { deattribute, deserialise } from "kitsu-core";
import "unfetch/polyfill";
import { category } from "./Category.stories";

function Category() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  //FETCH
  useEffect(() => {
    fetch("./data/categoryData.json")
      .then((response) => response.json())
      .then((response) => {
        const parsedData = deserialise(response.data);

        // kenapa arraynya dari 0 kak?
        // soalnya kan parsedData itu array isinya detail untuk 2 section
        // kita mau ambil yg pertama dulu jadi pakai [0]        console.log("debug parsedData", pa)()
        fetch(parsedData[0].links.self).then((response) => response.json());

        // hmm kenapa error ya, harusnya dia fetch data/watchPage.json sih
        // yang idx maksud ku
        setData(parsedData);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  });
  // oke mengerti kak
  if (isLoading) return <p className="loading">LOADING</p>;
  // oke lanjut ke testnya ya buat
  // michael coba format document lagi deh yg multiple request// soalnya kan tadi aku pake 2 sebelom2nya\
  // ribet ya livesh  console.log("debug data", data);
  // guys coba push dulu ini ke github deh, nanti aku screenshare dari gmeet pas ngerjainnya
    // ribet ya liveshare ini, hahaha  console.log("debug data", data);
  // oke k
 return(
           <>
  <div  cssName="Category">
       {d ata.map((dataCategory, idx) => (
          <span>{dataCategory.attributes.title}</span>
        ))}
   <div>
   ;  )

}

export default Category;

//sebelomnya aku pake ol - li kak mau dicoba gk kak?
// oiya dah bs kak di storybooknya, kok tb2 cmn jadi 1 doang y datanya?
