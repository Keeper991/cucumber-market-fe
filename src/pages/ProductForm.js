import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Input, Button, Image, Text } from "../elements";
import UploadImg from "../shared/UploadImg";
import { useDispatch, useSelector } from "react-redux";
import Modal, { Category, Alert } from "../shared/modals";
import { actionCreators as imageActions } from "../redux/modules/image";
import { actionCreators as productActions } from "../redux/modules/product";
import { actionCreators as userActions } from "../redux/modules/user";
import Color from "../shared/Color";
import { Clear, ArrowForwardIos } from "@material-ui/icons";
import { history } from "../redux/configStore";
import { getIdFromToken, getUserInfoFromLS } from "../shared/Permit";
import Spinner from "../shared/Spinner";

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
  const isLogin = useSelector((store) => store.user.isLogin);
  const isLoading = useSelector((store) => store.user.isLoading);
  const isUploading = useSelector((store) => store.image.isUploading);
  const dispatch = useDispatch();
  const isCallAPI = useRef(false);
  const insertedAt = useRef("");
  const imgUploadCnt = useRef(0);
  const { path } = props.match;
  const userId = getIdFromToken();
  const userInfo = getUserInfoFromLS();

  useEffect(() => {
    // user login 유무 확인
    if (userId && userInfo && !isLogin) {
      dispatch(userActions.setIsLogin(true));
    } else if (!userId || !userInfo) {
      alert("로그인해주세요.");
      history.replace("/login");
      return;
    }
  }, [dispatch, userId, isLogin, userInfo]);

  useEffect(() => {
    if (path === "/edit/:id") {
      const id = props.match.params.id;
      if (productList.length === 0) {
        dispatch(productActions.getProductOneAPI(id));
        isCallAPI.current = true;
      }

      const product = productList.find((p) => p._id === id);
      if (!product) {
        if (isCallAPI.current) return;
      }

      if (userId !== product.user.userId) {
        alert("권한이 없습니다.");
        history.replace("/");
        return;
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
  }, [productList, props.match, dispatch, path, userId]);

  const handlePrice = (e) => {
    if (/^-?\d*\.?\d*$/.test(e.target.value)) {
      setPrice(e.target.value);
    }
  };

  const handleComplete = () => {
    const user = {
      userId,
      username: userInfo.username,
      userProfile: userInfo.userProfile,
    };

    const data = {
      user,
      productName: name,
      productCategory: category,
      title,
      description,
      images: imageList,
      price: parseInt(price),
    };

    if (path === "/edit/:id") {
      data._id = props.match.params.id;
      data.imgUploadCnt = parseInt(imgUploadCnt.current);
      dispatch(productActions.editProductAPI(data));
    } else {
      dispatch(productActions.addProductAPI(data));
    }
  };

  return (
    <>
      {(isLoading || isUploading) && <Spinner />}
      <Container>
        <ImageListWrap>
          <UploadImg max="10" activeAlert={setIsActiveAlert} />
          {imageList?.map((img, idx) => (
            <ImageWrap key={idx}>
              <Button
                circle
                padding=".5em"
                width="3em"
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
            borderBottom
            _onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="물품명"
            value={name}
            borderBottom
            _onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="가격"
            value={price}
            borderBottom
            _onChange={handlePrice}
          />
          <CategoryArea onClick={() => setIsActiveModal(true)}>
            {category}
            <ArrowForwardIos fontSize="small" />
          </CategoryArea>
          <Input
            multiLine
            placeholder="게시물 설명"
            value={description}
            borderBottom
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
  padding-top: 1em;
  @media only screen and (min-width: 800px) {
    position: absolute;
    padding: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 820px;
    height: 500px;
    justify-content: center;
    border: 1px solid ${Color.gray};
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
    margin: 1em;
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
    padding: 1em;
    height: 100%;
    border-left: 1px solid ${Color.gray};
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
    border-top: 1px solid ${Color.gray};
    position: absolute;
    padding: 1em;
  }
`;

export default ProductForm;
