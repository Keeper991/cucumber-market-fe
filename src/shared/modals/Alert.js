import styled from "styled-components";
import { Button, Text } from "../../elements";
import Color from "../Color";

const Alert = (props) => {
  const { title, description, setState, confirm, _onClick } = props;
  const descriptions = description.split("\n");
  return (
    <Container>
      <Header>
        <Text bold size="2rem">
          {title}
        </Text>
      </Header>
      <Content>
        {descriptions.map((d, idx) => (
          <div key={idx}>{d}</div>
        ))}
      </Content>
      <ButtonWrap>
        {confirm ? (
          <>
            <Button _onClick={() => setState(false)}>
              <Text bold>취소</Text>
            </Button>
            <Button bgColor={Color.red} _onClick={_onClick}>
              <Text bold color={Color.white}>
                삭제
              </Text>
            </Button>
          </>
        ) : (
          <Button bgColor={Color.green} _onClick={() => setState(false)}>
            <Text color={Color.white} bold>
              확인
            </Text>
          </Button>
        )}
      </ButtonWrap>
    </Container>
  );
};

Alert.defaultProps = {
  title: "",
  description: "",
  confirm: false,
  setState: () => {},
  _onClick: () => {},
};

const Container = styled.div`
  border-radius: 10px;
  background-color: ${Color.white};
  min-width: 350px;
`;

const Header = styled.section`
  position: sticky;
  padding: 0.5em 0;
  border-bottom: 1.5px solid ${Color.darkGray};
`;

const Content = styled.section`
  padding: 1.5em 0;
  border-bottom: 1px solid ${Color.gray};
  line-height: 1.5;
`;

const ButtonWrap = styled.section`
  display: flex;
  justify-content: flex-end;
  margin-top: 1em;
  & > button:not(:last-child) {
    margin-right: 1em;
  }
`;

export default Alert;
