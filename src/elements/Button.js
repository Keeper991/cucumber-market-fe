import React from "react";
import styled from "styled-components";
import Color from "../shared/Color";

const Button = (props) => {
  const { is_float, bgColor, color, margin, padding, width, circle, children, _onClick } =
    props;

  const styles = {
    bgColor: bgColor,
    color: color,
    margin: margin,
    padding: padding,
    width: width,
  };

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{children}</FloatButton>
      </React.Fragment>
    );
  }

  if (circle) {
    return (
      <CircleBtn {...styles} onClick={_onClick}>
        {children}
      </CircleBtn>
    );
  }

  return (
    <BasicBtn {...styles} onClick={_onClick}>
      {children}
    </BasicBtn>
  );
};

Button.defaultProps = {
  _onClick: () => { },
  circle: false,
  margin: "0px",
  width: "100px",
  padding: "1em",
  color: "black",
  bgColor: Color.gray,
};

const CircleBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  border: none;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 50%;
`;

const BasicBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  border: none;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 10px;
  cursor: pointer;
`;

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #212121;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 30px;
  font-weight: 400;
  position: fixed;
  bottom: 35px;
  right: 25px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
`;

export default Button;
