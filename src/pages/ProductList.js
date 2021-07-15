import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Product from "../components/Product";
import { actionCreators as productActions } from "../redux/modules/product";
import { history } from "../redux/configStore";
import InfinityScroll from "../shared/InfinityScroll";
import Color from "../shared/Color";
import { Text, Image, Button } from "../elements";
import { getUserInfoFromLS } from "../shared/Permit";
import Spinner from "../shared/Spinner";

const ProductList = (props) => {
  const dispatch = useDispatch();
  const isSearch = useSelector((store) => store.product.isSearch);
  const searchList = useSelector((store) => store.product.searchList);
  const searchNextPage = useSelector((store) => store.product.searchNextPage);
  const product_list = useSelector((store) => store.product.list);
  const nextPage = useSelector((store) => store.product.nextPage);
  const isLoading = useSelector((store) => store.product.isLoading);
  const isLogin = useSelector((store) => store.user.isLogin);
  const userInfo = getUserInfoFromLS();

  useEffect(() => {
    if (!isSearch) {
      if (product_list.length < 2) {
        dispatch(productActions.getProductListAPI());
      }
    }
  }, [dispatch, isSearch, product_list]);

  return (
    <>
      {isLoading && <Spinner />}
      <InfinityScroll
        isNext={isSearch ? searchNextPage : nextPage}
        isLoading={isLoading}
        onScroll={() => {
          isSearch
            ? dispatch(productActions.searchProductAPI())
            : dispatch(productActions.getProductListAPI());
        }}
      >
        <Container>
          <ProductArea>
            {isSearch
              ? searchList?.map((product, index) => (
                  <Product
                    {...product}
                    key={product._id}
                    onClick={() => {
                      history.push(`/detail/${product._id}`);
                    }}
                  />
                ))
              : product_list?.map((product, index) => (
                  <Product
                    {...product}
                    key={product._id}
                    onClick={() => {
                      history.push(`/detail/${product._id}`);
                    }}
                  />
                ))}
          </ProductArea>
        </Container>
      </InfinityScroll>
      <WelcomeArea>
        {isLogin ? (
          <>
            <ProfileBox>
              <Image
                shape="circle"
                src={
                  userInfo?.userProfile ||
                  "https://github.com/rohjs/bugless-101/blob/master/css-basic/float-2/assets/user.jpg?raw=true"
                }
                size="5em"
              />
              <ProfileName>
                <Text>고마운분,</Text>
                <Text bold size="1.5em">
                  {userInfo?.username}
                </Text>
              </ProfileName>
            </ProfileBox>
            {/* <Text>게시글을 작성하세요.</Text>
            <Text>쓰지않는 물건으로 비상금을 마련하세요.</Text> */}
          </>
        ) : (
          <>
            <Text bold size="1.5rem">
              🥒 어서오세요,
            </Text>
            <Text bold size="1.5rem">
              🥒 오이마켓입니다!
            </Text>
            <Text>회원가입만 하면,</Text>
            <Text>언제 어디서든지 편하게~</Text>
            <Text>불편했던 중고거래,</Text>
            <Text>이젠 오이마켓으로 거래하세요!</Text>
          </>
        )}
      </WelcomeArea>
    </>
  );
};

const Container = styled.section`
  position: relative;
  margin: 0;
  @media only screen and (min-width: 800px) {
    width: 500px;
    margin-left: 10vw;
    border: 1px solid ${Color.gray};
    margin-top: 1em;
    margin-bottom: 1em;
  }
`;

const ProductArea = styled.div``;

const WelcomeArea = styled.div`
  width: 300px;
  position: fixed;
  top: 30%;
  right: 15%;
  line-height: 1.5;
  padding: 1em;
  border: 1px solid ${Color.gray};
  & > *:nth-child(2) {
    margin-bottom: 1em;
  }
  display: none;
  @media only screen and (min-width: 1100px) {
    display: inline-flex;
    flex-direction: column;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  padding: 15px 15px;
  width: 100%;
  & > *:first-child {
    margin-right: 1em;
  }
`;

const ProfileName = styled.div``;

export default ProductList;
