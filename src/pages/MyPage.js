import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Text, Image } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configStore";
import { getIdFromToken, getUserInfoFromLS } from "../shared/Permit";
import Color from "../shared/Color";
import Product from "../components/Product";
import Spinner from "../shared/Spinner";

const MyPage = (props) => {
  const dispatch = useDispatch();
  const { username: nickname } = getUserInfoFromLS();
  const [isSellList, setIsSellList] = useState(true);
  const isLogin = useSelector((store) => store.user.isLogin);
  const isLoading = useSelector((store) => store.user.isLoading);
  const { myPosts, favorites } = useSelector((store) => store.user.myPageInfo);
  const id = getIdFromToken();
  const isCallAPI = useRef(false);

  useEffect(() => {
    if (!id) {
      alert("로그인해주세요.");
      history.replace("/login");
      return;
    }

    if (id && isLogin && myPosts.length === 0 && favorites.length === 0) {
      if (isCallAPI.current) return;
      dispatch(userActions.getMyPageInfoAPI(id));
      isCallAPI.current = true;
    }
  }, [dispatch, favorites, id, isLogin, myPosts]);

  return (
    <>
      {isLoading && <Spinner />}
      <Wrapper>
        <Container>
          <TitleBox>
            <Text size="20px" bold>
              나의 오이
            </Text>
          </TitleBox>
          <ProfileBox>
            <Image
              shape="circle"
              src="https://github.com/rohjs/bugless-101/blob/master/css-basic/float-2/assets/user.jpg?raw=true"
              size="5em"
            />
            <ProfileColumn>
              <Text>고마운분,</Text>
              <Text bold size="1.5em">
                {nickname}
              </Text>
            </ProfileColumn>
          </ProfileBox>
          <ListBtnWrap>
            <SellListBtn
              onClick={() => {
                setIsSellList(true);
              }}
            >
              {isSellList ? (
                <Text bold color={Color.green}>
                  나의 판매 내역
                </Text>
              ) : (
                <Text bold>나의 판매 내역</Text>
              )}
            </SellListBtn>
            <LikeListBtn
              onClick={() => {
                setIsSellList(false);
              }}
            >
              {isSellList ? (
                <Text bold>내가 찜한 물건</Text>
              ) : (
                <Text bold color={Color.green}>
                  내가 찜한 물건
                </Text>
              )}
            </LikeListBtn>
          </ListBtnWrap>
          <MyList>
            {isSellList
              ? myPosts.map((s) => (
                  <Product
                    {...s}
                    key={s._id}
                    onClick={() => {
                      history.push(`/detail/${s._id}`);
                    }}
                  />
                ))
              : favorites.map((f) => (
                  <Product
                    {...f}
                    key={f._id}
                    onClick={() => {
                      history.push(`/detail/${f._id}`);
                    }}
                  />
                ))}
          </MyList>
        </Container>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1em;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1em;
  @media only screen and (min-width: 800px) {
    width: 600px;
    border: 1px solid ${Color.gray};
  }
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 15px 15px;
  border-bottom: 1px solid #e5e5e5;
  align-self: flex-start;
  width: 100%;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  padding: 15px 15px;
  border-bottom: 1px solid #e5e5e5;
  width: 100%;
`;

const ProfileColumn = styled.div`
  margin-left: 1em;
  line-height: 1.5;
`;

const ListBtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const SellListBtn = styled.div`
  align-self: flex-start;
  padding: 15px 15px;
  border-bottom: 1px solid #e5e5e5;
  width: 45%;
  cursor: pointer;
`;

const LikeListBtn = styled.div`
  align-self: flex-start;
  padding: 15px 15px;
  border-bottom: 1px solid #e5e5e5;
  width: 45%;
  cursor: pointer;
`;

const MyList = styled.section`
  width: 100%;
`;

export default MyPage;
