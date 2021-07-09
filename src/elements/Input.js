import styled from "styled-components";

const Input = ({ children, value, multiLine, _onChange, placeholder }) => {
  const attrs = { _onChange, placeholder };
  if (multiLine) {
    return <ElTextarea {...attrs}>{children}</ElTextarea>;
  } else {
    return <ElInput {...attrs} value={value} />;
  }
};

Input.defaultProps = {
  children: null,
  value: "",
  multiLine: false,
  placeholder: "",
  _onChange: () => {},
};

const ElInput = styled.input`
  width: 100%;
  padding: 1em 0;
  border: none;
  border-bottom: 1px solid #eeeeee;
  &:focus,
  &:active {
    outline: none;
  }
`;

const ElTextarea = styled.textarea`
  width: 100%;
  padding: 1em 0;
  border: none;
  border-bottom: 1px solid #eeeeee;
  resize: none;
  &:focus,
  &:active {
    outline: none;
  }
`;

export default Input;
