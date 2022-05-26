import { Input, Space } from "antd";
import styled from "styled-components";

const SpaceStyled = styled(Space)`
  width: 100%;
  max-width: 600px;
`;

function Search({ history, searchQuery, addHistoryQuery }) {
  const { Search } = Input;

  const onSearch = (value) => {
    if (!/^\s*$/.test(value)) {
      history.push("/search=" + value);
      searchQuery(value);
      addHistoryQuery(value);
      if (localStorage.getItem("historyQueryLocalStorage")) {
        const objLocalStorage = localStorage
          .getItem("historyQueryLocalStorage")
          .replace(/"/g, "")
          .split(",");
        if (!objLocalStorage.includes(value)) {
          const objStringtify = JSON.stringify(value);
          localStorage.setItem("historyQueryLocalStorage", [
            localStorage.getItem("historyQueryLocalStorage"),
            objStringtify,
          ]);
        }
      } else {
        const objStringtify = JSON.stringify(value);
        localStorage.setItem("historyQueryLocalStorage", objStringtify);
      }
    }
  };

  return (
    <SpaceStyled direction="vertical">
      <Search
        placeholder="Search free high-resolution photos"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={{ fontSize: 30 }}
      />
    </SpaceStyled>
  );
}

export default Search;
