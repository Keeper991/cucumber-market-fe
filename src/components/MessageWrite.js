import React from "react";
import styled from "styled-components";

import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';

// 채팅방 내에서 메세지 작성 컴포넌트 
const MessageWrite = (props) => {
  return (
    <>
      <WriteBox>
        <AddIcon />
        <TextInput
          placeholder="메세지를 입력하세요" />
        <SendIcon />
      </WriteBox>
    </>
  );
}

const WriteBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  align-items: center;
  margin: 0px auto;
  padding: 20px;
  border-top: 1px solid #E5E5E5;
`;

const TextInput = styled.input`
  width: 350px;
  padding: 10px;
  border-radius: 40px;
  border: 1px solid #E5E5E5;
`;

export default MessageWrite;