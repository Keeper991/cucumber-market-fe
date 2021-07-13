import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";

import { Text, Button } from "../elements/index";
import Input from "../elements/Input";
import { history } from "../redux/configStore";

const Register = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = (e) => { setId(e.target.value) };
  const onChangeNickname = (e) => { setNickname(e.target.value) };
  const onChangePassword = (e) => { setPassword(e.target.value) };


  const siteLogin = () => {
    if (id === "" || password === "") {
      window.alert("아이디와 패스워드 모두 입력해주세요!");
      return;
    }
    // dispatch(userActions.loginAPI(id, password));
  }

  return (
    <Wrapper>
      <Container>

        <Input
          margin="0px 0px 15px 0px"
          _onChange={onChangeId}
          placeholder={"아이디를 입력해주세요"}
          value={id}
        ></Input>

        <Input
          margin="0px 0px 15px 0px"
          _onChange={onChangeNickname}
          placeholder={"닉네임을 입력해주세요"}
          value={nickname}
        ></Input>

        <Input
          margin="0px 0px 15px 0px"
          _onChange={onChangePassword}
          placeholder={"비밀번호를 입력해주세요"}
          value={password}
        ></Input>

        <Button
          width="400px"
          _onClick={() => {
            history.replace("/");
          }
          }>회원가입</Button>

      </Container>
    </Wrapper>
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
  width: 400px;
  margin-top: 50px;
`;

export default Register;