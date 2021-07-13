import styled from "styled-components";
import { Button, Text } from "../../elements";
import Color from "../Color";
import { history } from "../../redux/configStore";

const More = (props) => {
  const { id } = props;
  return (
    <Container>
      <Button
        width="100%"
        bgColor={Color.lightGreen}
        _onClick={() => history.push(`/edit/${id}`)}
      >
        <Text bold>수정하기</Text>
      </Button>
      <Button width="100%" bgColor={Color.red}>
        <Text bold color={Color.white}>
          삭제하기
        </Text>
      </Button>
    </Container>
  );
};

More.defaultProps = {
  _onClick: () => {},
};

const Container = styled.div`
  width: 60%;
  min-width: 300px;
  border-radius: 10px;
  background-color: ${Color.white};
  & > button:not(:last-child) {
    margin-bottom: 1em;
  }
`;

export default More;
