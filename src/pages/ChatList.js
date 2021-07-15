import React, { useEffect } from "react";
import styled from "styled-components";

import { Text } from "../elements";
import Chat from "../components/Chat";
import { history } from "../redux/configStore";

// 채팅 리스트 페이지 컴포넌트
const ChatList = (props) => {
  // const dispatch = useDispatch();
  // const chat_list = useSelector((store) => store.chat.list);

  // useEffect(()=>{
  //   if (chat_list.length === 0) {
  //     dispatch(chatActions.getChatAPI());
  //     console.log('getChatAPI디스패치되었음');
  //   }
  // })

  return (
    <React.Fragment>
      <TitleBox>
        <Text
          size="20px"
          bold>채팅</Text>
      </TitleBox>
      <Chat
        onClick={() => {
          console.log('채팅방 클릭했어');
          // history.push(`/chat/${chat.id}`
        }} />
    </React.Fragment>
  );
}

const TitleBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 15px;
  border-bottom: 1px solid #E5E5E5;
  width: 500px;
  margin: 0px auto;
`;

export default ChatList;