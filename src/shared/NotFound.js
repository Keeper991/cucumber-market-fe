import React from "react";
import Button from "../elements/Button";

const NotFound = (props) => {
  return (
    <>
      <h1>!</h1>
      <h5>주소를 찾을 수 없습니다</h5>
      <Button
        _onClick={() => {
          props.history.goBack();
        }}
      >뒤로가기</Button>
    </>
  );
}

export default NotFound;