import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Text, Button, Image } from "../elements";
import ImageSlider from "../components/ImageSlider";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as productActions } from "../redux/modules/product";
import Color from "../shared/Color";
import { FavoriteBorder, Favorite, MoreVert } from "@material-ui/icons";
import TimeForToday from "../shared/Time";
import Modal, { More, Alert } from "../shared/modals";

const ProductDetail = (props) => {
  const dispatch = useDispatch();
  const id = parseInt(props.match.params.id);
  const productList = useSelector((store) => store.product.list);
  const user = useSelector((store) => store.user);
  const [product, setProduct] = useState({});
  const [isLike, setIsLike] = useState(false);
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [isActiveAlert, setIsActiveAlert] = useState(false);
  const isCallAPI = useRef(false);

  useEffect(() => {
    if (!id) {
      history.replace("/");
      return;
    }
    if (productList.length === 0) {
      dispatch(productActions.loadProductOneAPI(id));
      isCallAPI.current = true;
    }

    const product = productList.find((p) => p.id === id);
    if (!product) {
      if (isCallAPI.current) return;
    }

    setProduct(product);
  }, [dispatch, id, productList]);

  const handleLikeBtn = () => {
    setIsLike(!isLike);
  };

  const handleRemove = () => {
    alert("삭제!");
  };

  return (
    <>
      <Container>
        <ImageWrap>
          <ImageSlider images={product.images} />
        </ImageWrap>
        <InfoWraper>
          <WriterWrap>
            <WriterColumn>
              <Image
                shape="circle"
                width="2em"
                height="2em"
                src={product.writer?.profile}
              />
              <Text>{product.writer?.name}</Text>
            </WriterColumn>
            <WriterColumn>
              <Text>{TimeForToday(product.insertedAt)}</Text>
              <Button
                padding="0.5em"
                width="3em"
                _onClick={() => setIsActiveModal(true)}
              >
                <MoreVert />
              </Button>
            </WriterColumn>
          </WriterWrap>
          <Content>
            <Text bold>🥒 {product.productName}</Text>
            <Text bold size="1.5rem">
              {product.title}
            </Text>
            <Text size="0.7em" color={Color.darkGray}>
              {product.productCategory}
            </Text>
            <Text>{product.description}</Text>
            <RecommandsWrap>
              <Text bold>이건 어떠세요?</Text>
            </RecommandsWrap>
          </Content>
          <BottomWrap>
            <BottomColumn>
              <LikeButtonWrap>
                <Button
                  _onClick={handleLikeBtn}
                  padding="0"
                  width="auto"
                  bgColor="transparent"
                >
                  {isLike ? (
                    <Favorite style={{ color: Color.green }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </Button>
              </LikeButtonWrap>
              <Text bold>{product.price}원</Text>
            </BottomColumn>
            <BottomColumn>
              <Button _onClick={() => history.push("/")}>
                <Text bold>돌아가기</Text>
              </Button>
              <Button width="auto" bgColor={Color.green}>
                <Text bold color={Color.white}>
                  채팅으로 거래하기
                </Text>
              </Button>
            </BottomColumn>
          </BottomWrap>
        </InfoWraper>
      </Container>
      <Modal state={isActiveModal} setState={setIsActiveModal}>
        <More id={id} activeAlert={setIsActiveAlert} />
      </Modal>
      <Modal state={isActiveAlert} setState={setIsActiveAlert}>
        <Alert
          title="Remove"
          description="정말로 삭제하시겠습니까?"
          confirm
          _onClick={handleRemove}
          setState={setIsActiveAlert}
        />
      </Modal>
    </>
  );
};
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (min-width: 800px) {
    width: 820px;
    height: 500px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid ${Color.gray};
    & > section:last-child {
      width: 100%;
    }
    & > section:first-child {
      padding: 1em;
    }
  }
`;

const ImageWrap = styled.section``;

const InfoWraper = styled.section`
  position: relative;
  height: 100%;
  @media only screen and (min-width: 800px) {
    padding: 1em;
    padding-top: 0;
    border-left: 1px solid ${Color.gray};
  }
`;

const WriterWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em 0;
  border-bottom: 1px solid ${Color.gray};
`;

const WriterColumn = styled.div`
  display: flex;
  align-items: center;
  & > *:last-child {
    margin-left: 1em;
  }
`;

const Content = styled.section`
  padding: 1.5em 0;
  overflow-y: scroll;
  & > * {
    margin-bottom: 1rem;
  }
  padding-bottom: 4em;
`;

const RecommandsWrap = styled.div`
  padding: 1.5em 0;
  margin: 2em 0;
  border-top: 1px solid ${Color.gray};
`;

const BottomWrap = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  border-top: 1px solid ${Color.gray};
  background-color: ${Color.white};

  @media only screen and (min-width: 800px) {
    position: absolute;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LikeButtonWrap = styled.div`
  padding: 1em;
  border-right: 1px solid ${Color.gray};
`;

const BottomColumn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > p {
    padding-left: 1em;
  }
  &:last-child {
    padding: 0.5em 1em;
    & > :first-child {
      margin-right: 1em;
    }
    @media only screen and (min-width: 800px) {
      width: 100%;
      border-top: 1px solid ${Color.gray};
      & > button {
        width: 45%;
      }
    }
  }
`;

export default ProductDetail;
