import styled from "styled-components";
import Color from "../shared/Color";

const Input = ({
  children,
  value,
  multiLine,
  _onChange,
  _onClick,
  placeholder,
  type,
}) => {
  const attrs = {
    onChange: _onChange,
    onClick: _onClick,
    placeholder,
    type,
    value,
  };
  if (multiLine) {
    return <ElTextarea {...attrs} />;
  } else {
    return <ElInput {...attrs} />;
  }
};

Input.defaultProps = {
  children: null,
  value: "",
  multiLine: false,
  placeholder: "",
  disabled: false,
  type: "text",
  _onChange: () => {},
  _onClick: () => {},
};

const ElInput = styled.input`
  width: 100%;
  padding: 1em 0;
  border: none;
  border-bottom: 1px solid ${Color.gray};
  &:focus,
  &:active {
    outline: none;
  }
`;

const ElTextarea = styled.textarea`
  width: 100%;
  height: 30vh;
  padding: 1em 0;
  border: none;
  border-bottom: 1px solid ${Color.gray};
  resize: none;
  &:focus,
  &:active {
    outline: none;
  }
`;

export default Input;
