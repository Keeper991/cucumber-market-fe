import React from "react";
import styled from "styled-components";

import Image from "../elements/Image";
import Text from "../elements/Text";
import HeartBtn from "./HeartBtn";

import { useDispatch } from "react-redux";
import { actionCreators as productActions } from "../redux/modules/product";

const Product = (props) => {
  const dispatch = useDispatch();

  return (
      <Wrapper onClick={props.onClick}>
        <Image shape="square" src={props.src}></Image>
        <Text >{props.productName}</Text>
        <Text>{props.productPrice}</Text>

        <HeartBtn
          _onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(productActions.likeToggle(props.id, props.user.id));
          }}
          is_like={props.is_like}
        ></HeartBtn>
      </Wrapper>
  );
}

const Wrapper = styled.div``;


export default Product;

