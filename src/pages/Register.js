import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import Color from "../shared/Color";
import Spinner from "../shared/Spinner";

const Register = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const isLoading = useSelector((store) => store.user.isLoading);

  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleRegisterBtn = () => {
    let msg = "";
    if (password !== passwordConfirm) {
      msg += "비밀번호가 일치하지 않습니다.\n";
    }
    if (!/^[a-zA-Z0-9]{3,30}$/.test(id)) {
      msg += "아이디는 3 ~ 30자 이며, 영문과 숫자만 가능합니다.\n";
    }
    if (!/^[a-zA-Z0-9]{4,30}$/.test(password)) {
      msg += "비밀번호는 4 ~ 30자 이며, 영문과 숫자만 가능합니다.";
    }
    if (msg) {
      alert(msg);
      return;
    }

    const userData = {
      userId: id,
      username: nickname,
      password: password,
    };

    dispatch(userActions.registerAPI(userData));
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
            _onChange={onChangeNickname}
            placeholder={"닉네임을 입력해주세요"}
            value={nickname}
            borderBottom
          ></Input>

          <Input
            _onChange={onChangePassword}
            placeholder={"비밀번호를 입력해주세요"}
            value={password}
            borderBottom
          ></Input>

          <Input
            _onChange={onChangePasswordConfirm}
            placeholder={"비밀번호 확인"}
            value={passwordConfirm}
            borderBottom
          ></Input>

          {!id || !password || !nickname ? (
            <Button width="100%" disabled>
              회원가입
            </Button>
          ) : (
            <Button
              width="100%"
              bgColor={Color.green}
              _onClick={handleRegisterBtn}
            >
              회원가입
            </Button>
          )}
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
  & > *:not(:last-child) {
    margin-bottom: 1em;
  }
  & > button:first-of-type {
    margin-top: 2em;
  }
`;

export default Register;
