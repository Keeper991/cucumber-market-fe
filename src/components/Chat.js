import React from "react";
import styled from "styled-components";
import { Text, Image } from "../elements";

// 채팅 리스트에서 보이는 채팅방을 보여주는 컴포넌트
const Chat = (props) => {
  return (
    <React.Fragment>
      <Wrapper>
        <ProfileBox>

          <UserBox>
            <Image
              margin="0px 15px 0px 0px"
              circle src="https://github.com/rohjs/bugless-101/blob/master/css-basic/float-2/assets/user.jpg?raw=true"
              size="70" />
            <TextBox>
              <Text
                size="16px"
                margin="0px 0px 7px 0px"
                bold
              >상대방 유저닉네임</Text>
              <Text
                size="14px">채팅 마지막 작성 내용</Text>
            </TextBox>
          </UserBox>

          <ImageBox>
            <Image
              width="4.5em"
              height="4.5em"
              shape="square"></Image> {/*  src={props.src} */}
          </ImageBox>

        </ProfileBox>
      </Wrapper>
    </React.Fragment>
  );
}

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
`;

const ProfileBox = styled.div`
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #E5E5E5;
  padding: 20px 10px;
  margin: 0px auto;
  &:last-child{
    margin-bottom: 0px;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
`;

export default Chat;
