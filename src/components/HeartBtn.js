import React from "react";
import styled from "styled-components";

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const HeartBtn = (props) => {

  return (
    <React.Fragment>
      <Heart onClick={props._onClick}>
        {props.is_like ?
          <FavoriteIcon /> : <FavoriteBorderIcon />}
      </Heart>
    </React.Fragment>
  );
}

const Heart = styled.div`
  cursor: pointer;
`;

export default HeartBtn;