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
  border,
  margin,
}) => {
  const attrs = {
    onChange: _onChange,
    onClick: _onClick,
    placeholder,
    type,
    value,
    border,
    margin,
  };
  if (multiLine) {
    return <ElTextarea {...attrs} />;
  } else {
    return <ElInput {...attrs} />;
  }

};

Input.defaultProps = {
  children: null,
  Rounding: false,
  value: "",
  multiLine: false,
  placeholder: "",
  disabled: false,
  type: "text",
  _onChange: () => { },
  _onClick: () => { },
  border: "none",
};

const ElInput = styled.input`
  width: 100%;
  padding: 1em 10px;
  &:focus,
  &:active {
    outline: none;
  }
  margin: ${(props) => props.margin};
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
