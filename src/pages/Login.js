import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Text } from "../elements";
import { history } from "../redux/configStore";
import Color from "../shared/Color";
import { actionCreators as userActions } from "../redux/modules/user";
import { getIdFromToken, getUserInfoFromLS } from "../shared/Permit";
import Spinner from "../shared/Spinner";

const Login = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = useSelector((store) => store.user.isLoading);

  useEffect(() => {
    if (getIdFromToken() && getUserInfoFromLS()) {
      history.replace("/");
    }
  }, []);

  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    const userData = {
      userId: id,
      password: password,
    };

    dispatch(userActions.loginAPI(userData));
  };

  return (
    <>
      {isLoading && <Spinner />}
      <Wrapper>
        <Container>
          <Input
            _onChange={onChangeId}
            placeholder={"아이디를 입력해주세요"}
            value={id}
            borderBottom
          ></Input>

          <Input
            _onChange={onChangePassword}
            placeholder={"비밀번호를 입력해주세요"}
            value={password}
            borderBottom
          ></Input>

          {!id || !password ? (
            <Button width="100%" disabled>
              <Text bold>로그인</Text>
            </Button>
          ) : (
            <Button width="100%" bgColor={Color.green} _onClick={handleLogin}>
              <Text bold>로그인</Text>
            </Button>
          )}
          <Button
            width="100%"
            bgColor={Color.lightGreen}
            _onClick={() => {
              history.push("/register");
            }}
          >
            <Text bold>회원가입</Text>
          </Button>
        </Container>
      </Wrapper>
    </>
  );
};

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
  width: 400px;
  margin-top: 50px;
  border: 1px solid ${Color.gray};
  padding: 1em;
  & > input {
    margin-bottom: 1em;
  }
  & > button:first-of-type {
    margin-top: 2em;
  }
  & > button:not(:last-of-type) {
    margin-bottom: 1em;
  }
`;

export default Login;
