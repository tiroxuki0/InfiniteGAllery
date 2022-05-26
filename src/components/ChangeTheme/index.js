import styled from "styled-components";
import { useDispatch } from "react-redux";
import changeThemeSlice from "./changeThemeSlice";
import { FiSun, FiMoon } from "react-icons/fi";
import { useRef } from "react";

const Wrapper = styled.div`
  position: fixed;
  top: 5px;
  right: 5px;
  z-index: 98;
  .ant-switch-checked {
    background-color: black;
  }
  .ant-switch {
    background-color: white;
  }
  .ant-switch-handle:before {
    background-color: black;
  }
  .ant-switch-checked {
    background-color: black;
    & > .ant-switch-handle:before {
      background-color: white;
    }
  }
`;

const Switch = styled.label`
  width: 60px;
  height: 30px;
  border-radius: 100rem;
  background: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  position: relative;
  cursor: pointer;
`;

const Circle = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: inherit;
  background: white;
  left: 3%;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;
`;

const StyledFiSun = styled(FiSun)`
  color: white;
  font-size: 18px;
`;

const StyledFiMoon = styled(FiMoon)`
  color: white;
  font-size: 18px;
`;

function ChangeTheme() {
  const dispatch = useDispatch();
  const circleRef = useRef();
  const switchRef = useRef();

  const handleChangeTheme = (e) => {
    const switchChildren = [...switchRef.current.children].filter((e) => {
      return e.nodeName === "svg";
    });
    if (!e.target.checked) {
      dispatch(changeThemeSlice.actions.changeColor("black"));
    } else {
      dispatch(changeThemeSlice.actions.changeColor("white"));
    }

    if (e.target.checked) {
      circleRef.current.setAttribute("style", "left: 53%; background: black");
      switchRef.current.setAttribute("style", "background: white");
      switchChildren.forEach((e) => {
        e.setAttribute("style", "color: black");
      });
    } else {
      circleRef.current.setAttribute("style", "left: 3%; ");
      switchRef.current.setAttribute("style", "background: black");
      switchChildren.forEach((e) => {
        e.setAttribute("style", "color: white");
      });
    }
  };

  return (
    <Wrapper>
      <Switch ref={switchRef} htmlFor="theme" defaultChecked>
        <StyledFiSun />
        <StyledFiMoon />
        <Circle ref={circleRef} />
      </Switch>
      <input
        type="checkbox"
        id="theme"
        style={{ display: "none" }}
        onChange={(e) => handleChangeTheme(e)}
      />
    </Wrapper>
  );
}

export default ChangeTheme;
