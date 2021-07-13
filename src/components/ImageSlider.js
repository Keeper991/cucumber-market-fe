import styled from "styled-components";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import Color from "../shared/Color";
import { Button, Image } from "../elements";
import { useRef } from "react";
import { useState } from "react";

const ImageSlider = (props) => {
  const { images } = props;
  const [sliderLeft, setSliderLeft] = useState(0);
  const sliderRef = useRef();
  const containerRef = useRef();
  const iter = useRef(0);

  const handleRightBtn = () => {
    if (iter.current >= images.length - 1) {
      return;
    }
    setSliderLeft(containerRef.current.clientHeight * ++iter.current * -1);
  };
  const handleLeftBtn = () => {
    if (iter.current <= 0) {
      return;
    }
    setSliderLeft(containerRef.current.clientHeight * --iter.current * -1);
  };

  return (
    <Container ref={containerRef}>
      <ImageListWrap ref={sliderRef} moveX={sliderLeft} imgCnt={images.length}>
        {images?.map((image, idx) => (
          <Image
            key={idx}
            rectangle
            width="100%"
            height={`${containerRef.current.clientHeight}px`}
            src={image}
          />
        ))}
      </ImageListWrap>
      <Button
        padding="2em 0"
        width="3em"
        _onClick={handleLeftBtn}
        bgColor={Color.darkGray}
      >
        <ArrowLeft
          style={{
            color: Color.white,
            fontSize: "5rem",
          }}
        />
      </Button>
      <Button
        padding="2em 0"
        width="3em"
        _onClick={handleRightBtn}
        bgColor={Color.darkGray}
      >
        <ArrowRight style={{ color: Color.white, fontSize: "5rem" }} />
      </Button>
    </Container>
  );
};

ImageSlider.defaultProps = {
  images: [],
};

const Container = styled.section`
  position: relative;
  width: 100vw;
  height: 100vw;
  left: -1em;
  overflow-x: hidden;
  & > button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: opacity 0.2s linear;
  }
  & > button:first-of-type {
    left: 0;
  }
  & > button:last-of-type {
    right: 0;
  }
  &:hover > button {
    opacity: 0.5;
  }

  @media only screen and (min-width: 800px) {
    width: 400px;
    height: 400px;
    left: 0;
  }
`;

const ImageListWrap = styled.div`
  width: ${({ imgCnt }) => imgCnt * 100}%;
  height: 100vw;
  position: absolute;
  display: flex;
  flex-wrap: nowrap;
  top: 0;
  left: 0;
  ${({ moveX }) => `transform: translateX(${moveX}px);`}
  transition: transform .5s ease-in-out;
  overflow-x: hidden;
  & > * {
    display: inline-block;
  }
  @media only screen and (min-width: 800px) {
    height: 400px;
  }
`;

export default ImageSlider;
