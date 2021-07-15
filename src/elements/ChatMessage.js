import React, { useEffect } from "react";
import styled from "styled-components";
import { Text, Image } from ".";
import Color from "../shared/Color";


import { useSelector, useDispatch } from 'react-redux';

// 메세지 내용 출력할 말풍선 컴포넌트
const ChatMessage = (props) => {
  // let { id, profileImg } = useSelector((store) => store.user.user_info);

  return (
    <Wrapper>

      <WrapperYou>
        <ImageBox>
          <Image
            size="40"
            margin="0px 15px 0px 0px"
            src="https://github.com/rohjs/bugless-101/blob/master/css-basic/float-2/assets/user.jpg?raw=true"
          />
        </ImageBox>
        <ElMessage>
          안녕하세요. 덩크 구매가능한가요?
        </ElMessage>
      </WrapperYou>

      <WrapperMe>
        <MyMessage>
          안녕하세요. 구매가능합니다!
        </MyMessage>
      </WrapperMe>

    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 20px;
`;

const WrapperYou = styled.div`
  display: flex;
  width: 500px;
  margin: 0px auto;
  align-self: flex-start;
  padding: 5px 10px;
`;

const WrapperMe = styled.div`
  display: flex;
  width: 500px;
  margin: 0px auto;
  justify-content: flex-end;
  padding: 5px 10px;
`;

const ImageBox = styled.div`
`;

const MyMessage = styled.span`
display: inline-block;
  background-color: ${Color.lightGreen};
  padding: 15px;
  max-width: 300px;
  width: auto;
  height: auto;
  border-radius: 15px 0px 15px 15px;
  /* background-color: ${(props) => props.is_me ? props.theme.message_me : props.theme.message_you}; */
`;

const ElMessage = styled.span`
  display: inline-block;
  background-color: ${Color.gray};
  padding: 15px;
  max-width: 300px;
  width: auto;
  height: auto;
  border-radius: 0px 15px 15px 15px;
  /* background-color: ${(props) => props.is_me ? props.theme.message_me : props.theme.message_you}; */
`;

export default ChatMessage;