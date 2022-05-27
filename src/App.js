import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globalStyles.scss";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import ChangeTheme from "./components/ChangeTheme";
import Login from "./components/Login";
import { useState, useEffect, useCallback } from "react";
import { apiKey } from "./components/config";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { changeThemeSelector } from "./redux/selectors";
import { loginStateSelector } from "./redux/selectors";
import { FiChevronUp } from "react-icons/fi";
import { ImageNotFound } from "./images";

const NotFound = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  position: relative;
  z-index: 100;
  overflow: hidden;
`;

const RollToTop = styled.div`
  position: fixed;
  right: 15px;
  bottom: 20px;
  z-index: 10000;
  width: 40px;
  height: 40px;
  background: #00000094;
  backdrop-filter: blur(2px);
  border-radius: 100rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    background: #ffffff40;
    color: black;
  }
`;

function App() {
  const [rollToTop, setRollToTop] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const theme = useSelector(changeThemeSelector);
  const login = useSelector(loginStateSelector);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 500) {
        setRollToTop(true);
      } else {
        setRollToTop(false);
      }
    };
  }, []);

  useEffect(() => {
    getPhotos();
  }, [page, query]);

  function getPhotos() {
    let url = `https://api.unsplash.com/photos?client_id=${apiKey}&page=${page}`;
    if (query) {
      url = `https://api.unsplash.com/search/photos?client_id=${apiKey}&query=${query}&page=${page}`;
    }
    axios
      .get(url)
      .then((res) => {
        const dataApi = res.data.results ?? res.data;
        const prevImages = images;
        if (page === 1) {
          setImages([...dataApi]);
        } else {
          setTimeout(() => {
            setImages([...prevImages, ...dataApi]);
          }, 1500);
        }
      })
      .catch((error) => {
        console.log(
          "Encountered an error with fetching and parsing data",
          error
        );
        setImages("error");
      });
  }

  const searchQuery = useCallback((query) => {
    setQuery(query);
    setPage(1);
  }, []);

  const handleRollToTop = () => {
    window.scroll(0, 0);
  };

  return (
    <div
      className="App"
      style={{ background: theme === "black" ? `#242526` : `white` }}
    >
      {/* {!login && <Login />} */}
      {/* handle show roll to top button  */}
      {rollToTop && (
        <RollToTop onClick={handleRollToTop}>
          <FiChevronUp />
        </RollToTop>
      )}
      {/* handle change theme  */}
      <ChangeTheme />
      {/* header of page */}
      <Header searchQuery={searchQuery} />
      {/* handle scroll infinite */}
      <InfiniteScroll
        dataLength={images.length} //This is important field to render the next data
        next={() => setPage(page + 1)}
        hasMore={true}
        loader={
          images.length === 0 ? (
            "none"
          ) : (
            <h2
              style={{
                textAlign: "center",
                fontSize: "20px",
                lineHeight: "50px",
                color: theme === "black" ? `white` : `black`,
              }}
            >
              Loading...
            </h2>
          )
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {/* if query not valid */}
        {images.length === 0 ? (
          <NotFound>
            <img src={ImageNotFound}></img>
          </NotFound>
        ) : (
          <Gallery images={images} />
        )}
      </InfiniteScroll>
    </div>
  );
}

export default App;
