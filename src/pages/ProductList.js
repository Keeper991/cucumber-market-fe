import React, { useEffect } from "react";
import styled from "styled-components";

import Product from "../components/Product";
import Button from "../elements/Button";


import { useSelector, useDispatch } from "react-redux";
import { actionCreators as productActions } from "../redux/modules/product";
import { history } from "../redux/configStore";

const ProductList = (props) => {
  const dispatch = useDispatch();
  const product_list = useSelector((store) => store.product.list);

  console.log(product_list);

  useEffect(() => {
    if (product_list.length === 0) {
      dispatch(productActions.getProductAPI());
      console.log('getProductAPI디스패치되었음');
    }
  }, []);

  return (
    product_list.map((product, index) => {
      return (
        <Product {...product} key={product.id}
          onClick={() => {
            console.log('프로덕트 클릭했어');
            // history.push(`/product/${product.id}`);
          }} />
      );
    }),

    < Button
      bg='black'
      is_float
      _onClick={() => {
        history.push("/");
      }}
    >+</ Button>

  );
}

export default ProductList;