import React from "react";
import styled from "styled-components";

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';


const HeartBtn = (props) => {
  console.log(typeof props.is_like, props.is_like);

  return (
    <React.Fragment>
      <Heart onClick={props._onClick}>
        {props.is_like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </Heart>
    </React.Fragment>
  );
}

const Heart = styled.div`
  width: 14px;
  height: 14px;
  display: flex;
  background: url(${(props) => props.icon_url});
  background-size: cover;
  cursor: pointer;
`;

export default HeartBtn;