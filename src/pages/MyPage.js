import React, { useEffect } from "react";

import Text from "../elements/Text";
import Image from "../elements/Image";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const MyPage = (props) => {
  const dispatch = useDispatch();
  const product_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);

  useEffect(() => {
    if (product_list.length !== 0) {
      dispatch(postActions.getMyProduct());
    }
  }, []);

  return (
    <React.Fragment>
      <Text bold>나의 오이</Text>

      <Image shape="circle" src={user_info.src} />
      <Text bold>{user_info.nickname}</Text>

      <Text bold>나의 판매 내역</Text>
      {/* 내가 올린 product_list 올려주기 */}

      {/* 서버에 요청해서 뿌려주기만 */}

      <Text bold>내가 찜한 물건</Text> 
      {/* 내가 찜한 product_list 올려주기 */}
      {/* 서버에 요청해서 뿌려주기만 */}

    </React.Fragment>
  );
}

export default MyPage;