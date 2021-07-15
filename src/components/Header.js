import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text, Button, Input } from "../elements";
import Color from "../shared/Color";
import { history } from "../redux/configStore";
import { Add, Search } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getIdFromToken, getUserInfoFromLS } from "../shared/Permit";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as productActions } from "../redux/modules/product";
import { withRouter } from "react-router";

const Header = (props) => {
  const isLogin = useSelector((store) => store.user.isLogin);
  const dispatch = useDispatch();
  const [searchWord, setSearchWord] = useState("");
  const [select, setSelect] = useState("title");

  useEffect(() => {
    const userId = getIdFromToken();
    const userInfo = getUserInfoFromLS();
    if (userId && userInfo && !isLogin) {
      dispatch(userActions.setIsLogin(true));
      if (!props.match.path === "/me") {
        dispatch(userActions.getMyPageInfoAPI(userId));
      }
    }
  }, [dispatch, isLogin, props.match.path]);

  const handleLogoutBtn = () => {
    dispatch(userActions.logout());
    history.replace("/");
  };

  const handleSearchBtn = () => {
    dispatch(productActions.searchProductAPI(select, searchWord));
  };

  return (
    <Container>
      <Button
        padding="0"
        bgColor="transparent"
        width="auto"
        _onClick={() => {
          dispatch(productActions.setSearch(false));
          setSearchWord("");
          history.push("/");
        }}
      >
        <Text margin="0px" size="24px" bold>
          🥒 오이마켓
        </Text>
      </Button>
      <Column></Column>
      <Column>
        <SearchWrap>
          <Select value={select} onChange={(e) => setSelect(e.target.value)}>
            <option value="title">제목</option>
            <option value="description">내용</option>
            <option value="title+description">제목+내용</option>
          </Select>
          <SearchColumn>
            <Input
              padding=".5em"
              value={searchWord}
              _onChange={(e) => setSearchWord(e.target.value)}
            />
          </SearchColumn>
          <Button
            padding="0"
            width="auto"
            bgColor="transparent"
            _onClick={handleSearchBtn}
          >
            <Search />
          </Button>
        </SearchWrap>
        {isLogin ? (
          <>
            <Button
              bgColor={Color.green}
              width="4em"
              _onClick={() => history.push("/create")}
            >
              <Add style={{ color: Color.white }} />
            </Button>
            <Button
              bgColor={Color.lightGreen}
              _onClick={() => history.push("/me")}
            >
              <Text bold>마이페이지</Text>
            </Button>
            <Button _onClick={handleLogoutBtn}>
              <Text bold>로그아웃</Text>
            </Button>
          </>
        ) : (
          <>
            <Button
              bgColor="transparent"
              _onClick={() => history.push("/login")}
            >
              <Text bold>로그인</Text>
            </Button>
            <Button
              bgColor={Color.green}
              _onClick={() => history.push("/register")}
            >
              <Text bold color={Color.white}>
                회원가입
              </Text>
            </Button>
          </>
        )}
      </Column>
    </Container>
  );
};

const Container = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding: 0.5em 1em;
  border-bottom: 1px solid #e5e5e5;
  z-index: 8;
  background-color: ${Color.white};
`;

const Column = styled.div`
  display: flex;
  & > *:not(:last-child) {
    margin-right: 1em;
  }
`;

const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em 1em;
  border-radius: 10px;
  background-color: ${Color.gray};
`;

const SearchColumn = styled.div`
  margin: 0 1em;
`;

const Select = styled.select`
  padding: 0.5em 1em;
  border: none;
  border-radius: 10px;
  &:focus,
  &:active {
    outline: none;
  }
`;

export default withRouter(Header);
