import "./Category.css";
import React, { useState, useEffect, useRef } from "react";
import { deattribute, deserialise } from "kitsu-core";
import "unfetch/polyfill";
import Imagepremier from "./premierBadge.svg";
import Errorcontent from "./errorContent.svg";
import { category } from "./Category.stories";
import { response } from "msw";

function Category() {
  const mountedRef = useRef(false);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [watchData, setWatchData] = useState();
  const [potraitData, setPotraitData] = useState();
  const [isError, setIsError] = useState(false);

  const fetchWatchData = async (link) => {
    return await fetch(link)
      .then((response) => response.json())
      .then((response) => {
        const parsedData = deserialise(response);
        setWatchData(parsedData);
      })
      .catch((err) => {
        setIsError(true);
      });
  };

  const fetchPotraitData = async (link) => {
    return await fetch(link)
      .then((response) => response.json())
      .then((response) => {
        const parsedData = deserialise(response);
        setPotraitData(parsedData);
      })
      .catch((err) => {
        setIsError(true);
      });
  };

  //FETCH
  useEffect(() => {
    fetch("./data/categoryData.json")
      .then((response) => response.json())
      .then(async (response) => {
        const parsedData = deserialise(response.data);

        const linkLanjutNonton = parsedData[0].links.self;
        await fetchWatchData(linkLanjutNonton);

        const linkPotrait = parsedData[1].links.self;
        await fetchPotraitData(linkPotrait);

        if (!mountedRef) return;

        setData(parsedData);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!mountedRef) return;

        setIsError(true);
        setIsLoading(false);
      }); // ini yang print page kosong....
  }, [isLoading]);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  if (isLoading) return <p className="loading">LOADING</p>;
  if (isError)
    return (
      <img src={Errorcontent} alt="error-Content" data-testid="errorContent" />
    );

  return (
    <>
      <div className="Category">
        {/* {data.map((dataCategory, idx) => {
           return <span key={idx}>{dataCategory.attributes.title }</span>;
        })} */}
        <div className="container-title">{data[0].attributes.title}</div>
        <div className="watch-content">
          {watchData?.data?.contents?.data.map((video) => {
            return (
              <div data-testid="watch-data" className="container">
                <div className="duration-container" data-testid="videoDuration">
                  {timeHelper(video.duration)}
                </div>

                <img
                  className="img-container"
                  src={video.cover_url}
                  alt={video.title}
                  onClick={(e) => (window.location.href = video.web_url)}
                  data-testid="coverURL"
                />

                {video.is_premier ? (
                  <div className="image-prem">
                    <img
                      src={Imagepremier}
                      alt="image-premier"
                      data-testid="image-premiere"
                    />
                  </div>
                ) : null}

                <div className="eps-title" data-testid="tulisanBro">{video.title}</div>
                <div className="title-contents" data-testid="tulisanBro">{video.alt_title}</div>

                <div className="progressBar">
                  <div
                    className="progressBar-value"
                    style={{
                      width:
                        (video.watch_duration / video.duration) * 100 + "%",
                    }}
                    data-testid="progressBar"
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="container-title">{data[1].attributes.title}</div>

        <div className="potrait-content">
          {potraitData?.data?.contents?.data.map((potraiten) => {
            return (
              <div className="container-potrait" data-testid="potrait-data">
                <img
                  className="photo-content"
                  src={potraiten.cover_url}
                  alt={potraiten.title}
                  onClick={(e) => (window.location.href = potraiten.web_url)}
                  data-testid="coverURL"
                />

                {potraiten.is_premier ? (
                  <div className="img-premiere">
                    <img
                      src={Imagepremier}
                      alt="image-premiere"
                      data-testid="image-premiere"
                    />
                  </div>
                ) : null}

                <div className="title" data-testid="tulisanBro">{potraiten.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export function timeHelper(duration) {
  var hour = Math.floor(duration / 3600);
  var minute = Math.floor((duration % 3600) / 60);
  var seconds = Math.floor((duration % 3600) % 60);

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  return duration < 3600
    ? (duration = `${padTo2Digits(minute)}:${padTo2Digits(seconds)}`)
    : (duration = `${padTo2Digits(hour)}:${padTo2Digits(minute)}:${padTo2Digits(
        seconds
      )}`);
}

export default Category;
