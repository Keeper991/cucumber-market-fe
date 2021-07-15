import styled from "styled-components";
import { Text } from "../../elements";
import Color from "../Color";

const Category = (props) => {
  const { _onClick } = props;
  const list = [
    "가구/인테리어",
    "디지털기기",
    "생활가전",
    "유아동",
    "생활/가공식품",
    "유아도서",
    "스포츠/레저",
    "여성잡화",
    "여성의류",
    "남성패션/잡화",
    "게임/취미",
    "뷰티/미용",
    "반려동물용품",
    "도서/티켓/음반",
    "식물",
    "기타 중고물품",
    "삽니다",
  ];
  return (
    <Container>
      <Header>
        <Text bold size="2rem;">
          카테고리 선택
        </Text>
      </Header>
      <Content>
        <ElUl>
          {list.map((li) => (
            <ElLi key={li} onClick={_onClick}>
              {li}
            </ElLi>
          ))}
        </ElUl>
      </Content>
    </Container>
  );
};

Category.defaultProps = {
  _onClick: () => {},
};

const Container = styled.div`
  border-radius: 10px;
  background-color: ${Color.white};
  width: 350px;
`;

const Header = styled.section`
  position: sticky;
  padding: 0.5em 0;
  border-bottom: 2px solid ${Color.black};
`;

const Content = styled.section`
  height: 60vh;
  overflow: scroll;
`;

const ElUl = styled.ul``;

const ElLi = styled.li`
  padding: 1em 0;
  border-bottom: 1px solid ${Color.gray};
`;

export default Category;
