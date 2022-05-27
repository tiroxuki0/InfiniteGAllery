import styled from "styled-components";
import Search from "./Search";
import Nav from "./Nav";
import { useState, useEffect, memo } from "react";
import { createBrowserHistory } from "history";
import { useSelector } from "react-redux";
import { changeThemeSelector } from "../redux/selectors";

const Layer = styled.div`
  position: absolute !important;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1 !important;
`;

const HeaderStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  background-image: url("https://images.unsplash.com/photo-1612596551578-9c81c9de1b3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&dpr=1&auto=format%2Ccompress&fit=crop&w=1799&h=594 1x, https://images.unsplash.com/photo-1612596551578-9c81c9de1b3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&dpr=2&auto=format%2Ccompress&fit=crop&w=1799&h=594 2x");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 100px 0px;
  position: relative;
  & > * {
    position: relative;
    z-index: 2;
  }
`;

const Title = styled.h2`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  margin-top: 20px;
  color: white;
  text-align: center;
  a {
    color: white;
  }
`;

function Header({ searchQuery }) {
  const history = createBrowserHistory();
  const theme = useSelector(changeThemeSelector);

  const [historyQuery, setHistoryQuery] = useState(
    localStorage.getItem("historyQueryLocalStorage")
      ? localStorage
          .getItem("historyQueryLocalStorage")
          .replace(/"/g, "")
          .split(",")
      : []
  );

  function addHistoryQuery(query) {
    if (!historyQuery.includes(query)) {
      setHistoryQuery((prev) => [...prev, query]);
    }
  }

  const handleHomeLocation = () => {
    history.push("/");
  };

  useEffect(() => {
    window.onload = () => {
      history.push("/Infiniteee-GGGallery");
    };
  }, []);

  return (
    <HeaderStyled>
      <Layer
        style={{ background: theme === "black" ? `#00000059` : `transparent` }}
      ></Layer>
      <Title>
        <a href="/Infiniteee-GGGallery" onClick={handleHomeLocation}>
          Infinite Gallery
        </a>
      </Title>
      <Search
        history={history}
        searchQuery={searchQuery}
        addHistoryQuery={addHistoryQuery}
      />
      <Nav
        history={history}
        historyQuery={historyQuery}
        searchQuery={searchQuery}
      />
    </HeaderStyled>
  );
}

export default memo(Header);
