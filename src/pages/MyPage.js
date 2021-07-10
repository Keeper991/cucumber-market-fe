import React, { useEffect } from "react";

import Text from "../elements/Text";
import Image from "../elements/Image";

// import { useSelector, useDispatch } from "react-redux";
// import { actionCreators as postActions } from "../redux/modules/post";

const MyPage = (props) => {
  // const dispatch = useDispatch();
  // const product_list = useSelector((state) => state.post.list);
  // const user_info = useSelector((state) => state.user.user);

  // useEffect(() => {
  //   if (product_list.length !== 0) {
  //     dispatch(postActions.getMyProduct());
  //   }
  // }, []);

  return (
    <React.Fragment>
      <Text bold>나의 오이</Text>

      <Image />
      <Text bold></Text>
      <Text>{props.nickname}</Text>

      <Text bold>나의 판매 내역</Text>

      <Text bold>내가 찜한 물건</Text>

    </React.Fragment>
  );
}

export default MyPage;