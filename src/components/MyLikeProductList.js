import React, { useEffect } from "react";

import Product from "./Product";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configStore";

const MyLikeProductList = (props) => {
  const dispatch = useDispatch();
  const product_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);

  useEffect(() => {
    if (product_list.length !== 0) {
      dispatch(postActions.getMyLikeProduct());
    }
  }, []);

  return (
    <React.Fragment>
      {product_list.map((product, index) => {
        if (user_info.hasOwnProperty('product_id')) { // user_info 안에 product_id가 있으면
          return (
            <Product {...product} key={product.id}
              onClick={() => {
                history.push(`/product/${product.id}`);
              }} />
          );
        }
      })}
    </React.Fragment>
  );

}

export default MyLikeProductList;
