import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const { shape, width, height, src, size, _onClick } = props;

  const styles = {
    src: src,
    size: size,
    width: width,
    height: height,
  };

  if (shape === "circle") {
    return (
      <ImageCircle {...styles} onClick={_onClick}></ImageCircle>
    );
  }

  if (shape === "squre") {
    return (
      <ImageSqure {...styles} onClick={_onClick}></ImageSqure>
    );
  }

  return (
    <ImageOrigin {...styles} onClick={_onClick}></ImageOrigin>
  );
}

Image.defaultProps = {
  _onClick: () => { },
  shape: "circle",
  src: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  width: "100px",
  height: "100px",
};

const ImageCircle = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: "50px";
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: ${(props) => props.margin};
`;

const ImageSqure = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: "5px";
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: ${(props) => props.margin};
`;

const ImageOrigin = styled.div`
  background-image: url("${(props) => props.src}");
  background-size: cover;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export default Image;

