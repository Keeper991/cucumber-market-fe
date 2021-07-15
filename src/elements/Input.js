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
  borderBottom,
  margin,
  padding,
}) => {
  const attrs = {
    onChange: _onChange,
    onClick: _onClick,
    placeholder,
    type,
    value,
    border,
    margin,
    borderBottom,
    padding,
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
  _onChange: () => {},
  _onClick: () => {},
  border: "none",
  borderBottom: false,
  padding: "1em 10px",
};

const ElInput = styled.input`
  width: 100%;
  padding: ${({ padding }) => padding};
  &:focus,
  &:active {
    outline: none;
  }
  border: ${({ border }) => border};
  margin: ${(props) => props.margin};
  ${({ borderBottom }) =>
    borderBottom ? `border-bottom: 1px solid ${Color.gray};` : ""}
`;

const ElTextarea = styled.textarea`
  width: 100%;
  height: 40vh;
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
