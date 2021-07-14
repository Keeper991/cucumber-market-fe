import React from "react";
import styled from "styled-components";

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Text } from "../elements";
import MessageList from "../components/MessageList";
import MessageWrite from "../components/MessageWrite";

// 채팅방 페이지 컴포넌트
const ChattingRoom = (props) => {
  // const id = props.match.params.id;
  // const user_info = 

  return (
    <Wrapper>

      <TopBox>
        <KeyboardBackspaceIcon />
        <Text
          size="18px"
          bold
        >상대방 유저닉네임</Text>
        <MoreVertIcon />
      </TopBox>

      <MessageList />
      <MessageWriteBox>
        <MessageWrite />
      </MessageWriteBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
display: flex;
flex-direction: column;
height: 90vh;
`;

const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #E5E5E5;
  width: 500px;
  margin: 0px auto;
`;

const MessageWriteBox = styled.div`
/* width: 500px;
margin: 0px auto; */
display: flex;
align-items: flex-end;
height: 100vh;


`;

export default ChattingRoom;