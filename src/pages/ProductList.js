import React, { useEffect } from "react";
import styled from "styled-components";

import Product from "../components/Product";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as productActions } from "../redux/modules/product";
import { history } from "../redux/configStore";

const ProductList = (props) => {
  const dispatch = useDispatch();
  const product_list = useSelector((state) => state.product.list);

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
            console.log('포스트 클릭했어');
            // history.push(`/product/${product.id}`);
          }} />
      );
    })
  );
}

export default ProductList;