import React, { useEffect, useState } from "react";

import styled from "styled-components";

import Text from "../elements/Text";
import Image from "../elements/Image";
import LikeList from "../pages/ProductList";
import Sellist from "../components/SellList";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as productActions } from "../redux/modules/product";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configStore";

const MyPage = (props) => {
  const dispatch = useDispatch();
  const product_list = useSelector((store) => store.product.list);
  const user_id = useSelector((store) => store.user.user.id);
  const nickname = useSelector((store) => store.user.user.nickname);
  console.log(user_id, typeof user_id);

  const [isSellList, setIsSellList] = useState(true);

  console.log(product_list);

  useEffect(() => {
    if (product_list.length === 0) {
      dispatch(productActions.getSellProductAPI(user_id));
      console.log('getsellProductAPI디스패치되었음');
    }
    // if (!user) {
    //   dispatch(userActions.getUserAPI(user_id));
    // }
  }, []);

  return (
    <>
      <Wrapper>
        <Container>
          <TitleBox>
            <Text size="20px" bold>나의 오이</Text>
          </TitleBox>

          {/* <Selllist /> */}

          <ProfileBox>
            <Image margin="0px 15px 0px 0px" circle src="https://github.com/rohjs/bugless-101/blob/master/css-basic/float-2/assets/user.jpg?raw=true" size="70" />
            <Text size="17px" bold >{nickname}</Text>

          </ProfileBox>

          <MyList>

            <MySellList onClick={() => {
              setIsSellList(true);
              console.log("나의 판매내역 눌렀음")
            }}>
              <Text bold>나의 판매 내역</Text>
            </MySellList>

            <MyLikelist onClick={() => {
              setIsSellList(false);
              console.log("내가 찜한 물건 눌렀음")
            }}>
              <Text bold>내가 찜한 물건</Text>
            </MyLikelist>
          </MyList>

          <div>
            {isSellList ? <Sellist /> : <LikeList />}
          </div>

        </Container>
      </Wrapper>
    </>
  );
}


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 15px 15px;
  border-bottom: 1px solid #E5E5E5;
  align-self: flex-start;
  width: 500px;

`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  padding: 15px 15px;
  width: 500px;
  border-bottom: 1px solid #E5E5E5;
`;

const MyList = styled.div`
display: flex;
justify-content: space-between;
width: 500px;
`;

const MySellList = styled.div`
align-self: flex-start;
  padding: 15px 15px;
  border-bottom: 1px solid #E5E5E5;
  width: 230px;
  cursor: pointer;
`;

const MyLikelist = styled.div`
align-self: flex-start;
  padding: 15px 15px;
  border-bottom: 1px solid #E5E5E5;
  width: 250px;
  cursor: pointer;
`;

export default MyPage;

