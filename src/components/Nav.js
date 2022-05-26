import { Tag } from "antd";
import styled from "styled-components";

const NavWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  .ant-tag {
    padding: 2px 15px 2px 7px;
    position: relative;
    cursor: pointer;
    .anticon-close {
      position: absolute;
      top: 50%;
      right: 2px;
      transform: translateY(-45%);
      font-size: 11px;
    }
  }
`;

function Nav({ history, historyQuery, searchQuery }) {
  const handleClick = (e) => {
    const query = e.target.innerText;
    searchQuery(query);
    history.push("/search=" + query);
  };

  return (
    <NavWrapper direction="vertical">
      {historyQuery.map((e, index) => {
        return (
          <Tag
            key={index}
            color="#202124"
            style={{ fontSize: 20 }}
            closable
            onClick={(e) => {
              handleClick(e);
            }}
          >
            {e}
          </Tag>
        );
      })}
    </NavWrapper>
  );
}

export default Nav;
