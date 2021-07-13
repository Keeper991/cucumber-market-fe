import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const { shape, width, size, height, src, _onClick, margin } = props;

  const styles = {
    src: src,
    width: width,
    height: height,
    size: size,
    margin: margin,
  };

  if (shape === "circle") {
    return <ImageCircle {...styles} onClick={_onClick}></ImageCircle>;
  }

  if (shape === "rectangle") {
    return (
      <AspectOutter {...styles}>
        <AspectInner {...styles} onClick={_onClick}></AspectInner>
      </AspectOutter>
    );
  }

  return <ImageOrigin {...styles} onClick={_onClick}></ImageOrigin>;
};

Image.defaultProps = {
  _onClick: () => { },
  shape: "circle",
  src: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  width: "6em",
  height: "6em",
  ratio: "4 * 3",
};


const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);

  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: ${(props) => props.margin};
`;


const AspectOutter = styled.div`
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
`;

const AspectInner = styled.div`
  ${({ width, ratio }) => `padding-top: calc(${width} / ${ratio});`}
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

const ImageOrigin = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
`;

export default Image;
