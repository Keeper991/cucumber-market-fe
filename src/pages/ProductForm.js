import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Input, Button, Image, Text } from "../elements";
import UploadImg from "../shared/UploadImg";
import { useDispatch, useSelector } from "react-redux";
import Modal, { Category, Alert } from "../shared/modals";
import { actionCreators as imageActions } from "../redux/modules/image";
import { actionCreators as productActions } from "../redux/modules/product";
import Color from "../shared/Color";
import { Clear, ArrowForwardIos } from "@material-ui/icons";
import { history } from "../redux/configStore";

const ProductForm = (props) => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("카테고리 선택");
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [isActiveAlert, setIsActiveAlert] = useState(false);
  const imageList = useSelector((store) => store.image.list);
  const productList = useSelector((store) => store.product.list);
  const dispatch = useDispatch();
  const isCallAPI = useRef(false);
  const insertedAt = useRef("");
  const imgUploadCnt = useRef(0);
  const { path } = props.match;

  useEffect(() => {
    if (path === "/edit/:id") {
      const id = parseInt(props.match.params.id);
      if (productList.length === 0) {
        dispatch(productActions.loadProductOneAPI(id));
        isCallAPI.current = true;
      }

      const product = productList.find((p) => p.id === id);
      if (!product) {
        if (isCallAPI.current) return;
      }

      setTitle(product.title);
      setName(product.productName);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.productCategory);
      insertedAt.current = product.insertedAt;
      imgUploadCnt.current = parseInt(product.imgUploadCnt);
      dispatch(imageActions.setImage(product.images));
    }
  }, [productList, props.match, dispatch, path]);

  const handlePrice = (e) => {
    if (/^-?\d*\.?\d*$/.test(e.target.value)) {
      setPrice(e.target.value);
    }
  };

  const handleComplete = () => {
    const user = {
      id: "a@a.com",
      name: "aaa",
      profile:
        "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80",
    };

    const data = {
      id: parseInt(props.match.params.id),
      writer: user,
      productName: name,
      productCategory: category,
      title,
      description,
      images: imageList,
      price,
      insertedAt: insertedAt.current,
      imgUploadCnt: imgUploadCnt.current,
    };

    if (path === "/edit/:id") {
      dispatch(productActions.editProductAPI(data));
    } else {
      dispatch(productActions.addProductAPI(data));
    }
    history.push(`/detail/${props.match.params.id}`);
  };

  return (
    <>
      <Container>
        <ImageListWrap>
          <UploadImg max="10" activeAlert={setIsActiveAlert} />
          {imageList?.map((img, idx) => (
            <ImageWrap key={idx}>
              <Button
                circle
                padding=".5em"
                _onClick={() => dispatch(imageActions.removeImage(idx))}
              >
                <Clear />
              </Button>
              <Image width="6em" height="6em" src={img} />
            </ImageWrap>
          ))}
        </ImageListWrap>
        <ContentWrap>
          <Input
            placeholder="게시글 제목"
            value={title}
            _onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="물품명"
            value={name}
            _onChange={(e) => setName(e.target.value)}
          />
          <Input placeholder="가격" value={price} _onChange={handlePrice} />
          <CategoryArea onClick={() => setIsActiveModal(true)}>
            {category}
            <ArrowForwardIos fontSize="small" />
          </CategoryArea>
          <Input
            multiLine
            placeholder="게시물 설명"
            value={description}
            _onChange={(e) => setDescription(e.target.value)}
          />
          <ButtonWrap>
            <Button
              width="45%"
              bgColor={Color.lightGreen}
              _onClick={() => history.push("/")}
            >
              <Text bold>취소</Text>
            </Button>
            {!title ||
            !name ||
            !description ||
            !price ||
            !(category !== "카테고리 선택") ||
            !imageList ? (
              <Button disabled width="45%">
                <Text bold>
                  {path === "/edit/:id" ? "수정완료" : "작성완료"}
                </Text>
              </Button>
            ) : (
              <Button
                width="45%"
                bgColor={Color.green}
                _onClick={handleComplete}
              >
                <Text bold color={Color.white}>
                  {path === "/edit/:id" ? "수정완료" : "작성완료"}
                </Text>
              </Button>
            )}
          </ButtonWrap>
        </ContentWrap>
      </Container>
      <Modal setState={setIsActiveModal} state={isActiveModal}>
        <Category
          _onClick={(e) => {
            setCategory(e.target.innerText);
            setIsActiveModal(false);
          }}
        />
      </Modal>
      <Modal setState={setIsActiveAlert} state={isActiveAlert}>
        <Alert
          title="Too many pictures... 😢"
          description={`이미지가 너무 많습니다... \n 10장 이하로 선택해주세요.`}
          setState={setIsActiveAlert}
        />
      </Modal>
    </>
  );
};

const Container = styled.section`
  @media only screen and (min-width: 800px) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 800px;
    justify-content: center;
    border: 1px solid ${Color.gray};
    padding: 1em;
    & > section {
      width: 400px;
      height: 100%;
    }
  }
`;

const ImageListWrap = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 6em);
  grid-gap: 1em;
  margin-bottom: 1em;
  & > * {
    margin-bottom: 1em;
    width: 6em;
    height: 6em;
  }
  & > *:not(:last-child) {
    margin-right: 1em;
  }
  @media only screen and (min-width: 800px) {
    grid-template-rows: repeat(4, 6em);
    border-right: 1px solid ${Color.gray};
  }
`;

const ImageWrap = styled.div`
  position: relative;
  & > button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    visibility: hidden;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  &:hover {
    & > button {
      visibility: visible;
    }
    & > div::before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: ${Color.white};
      opacity: 0.5;
      z-index: 1;
    }
  }
`;

const ContentWrap = styled.section`
  padding-bottom: 75px;
  position: relative;
  @media only screen and (min-width: 800px) {
    padding: 0 0 0 1em;
    height: 100%;
  }
`;

const CategoryArea = styled.div`
  width: 100%;
  font-size: 0.8em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 0;
  border-bottom: 1px solid ${Color.gray};
  cursor: pointer;
`;

const ButtonWrap = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background-color: ${Color.white};
  @media only screen and (min-width: 800px) {
    position: static;
    padding: 1em 0 0 0;
  }
`;

export default ProductForm;
