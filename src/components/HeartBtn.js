import React from "react";
import styled from "styled-components";

import heart_line from "../shared/heart_line.svg";
import heart_solid from "../shared/heart_solid.svg";


const HeartBtn = (props) => {
  const icon_url = props.is_like? heart_solid : heart_line;
  
  return(
    <React.Fragment>
      <Heart onClick={props._onClick} icon_url={icon_url}></Heart>
    </React.Fragment>
  );
}

const Heart = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  background: url(${(props) => props.icon_url});
  background-size: cover;
  cursor: pointer;
`;

export default HeartBtn;