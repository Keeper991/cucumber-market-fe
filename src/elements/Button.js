import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const { circle, rectangle, full, half, content, text, bgColor, color, margin, padding, _onClick } = props;

  const styles = {
    bgColor: bgColor,
    color: color,
    margin: margin,
    padding: padding,
    full: full,
    half: half,
    content: content,
    text: text,
  }

  if (circle) {
    return (
      <CircleBtn {...styles} onClick={_onClick}></CircleBtn>
    );
  }

  if (rectangle) {
    return (
      <RectangleBtn {...styles} onClick={_onClick}></RectangleBtn>
    );
  }

  return (
    <BasicBtn {...styles} onClick={_onClick}></BasicBtn>
  );

}

Button.defaultProps = {
  _onClick: () => { },
  circle: false,
  rectangle: false,
  margin: '0px',
  width: "100px",
  padding: "0px",
  full: false,
  half: false,
};

const CircleBtn = styled.button`
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.padding};
  border-radius: '50px';
  color: ${(props) => props.padding};
  border: none;
  box-sizing: border-box;
`;

const RectangleBtn = styled.button`
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.padding};
  border: none;
  box-sizing: border-box;
`;

const BasicBtn = styled.button`
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.padding};
  border: none;
  box-sizing: border-box;
`;

export default Button;