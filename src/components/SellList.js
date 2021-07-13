import React, { useEffect } from "react";

import Product from "../components/Product";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as productActions } from "../redux/modules/product";
import { history } from "../redux/configStore";

const SellList = (props) => {
  const dispatch = useDispatch();
  const product_list = useSelector((state) => state.product.list);

  console.log(product_list);

  useEffect(() => {
    if (product_list.length === 0) {
      dispatch(productActions.getSellProductAPI());
    }
  }, []);

  return (
    product_list.map((product, index) => {
      return (
        <Product {...product} key={product.id}
          onClick={() => {
            console.log('내가 판매한 프로덕트 클릭했어');
          }} />
      )
    })
  );

}

export default SellList;