import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../shared/API";
import axios from "axios";
import { storage } from "../../shared/firebase";
import { actionCreators as imageActions } from "./image";

const ADD = "product/ADD";
const EDIT = "product/EDIT";
const GET = "product/GET";
const LOADING = "product/LOADING";
const PUT_PRODUCT = "PUT_PRODUCT"; // 서버에 가져온 리스트를 리덕스에 넣어주는 액션
const LIKE_TOGGLE = "LIKE_TOGGLE"; // 토글 버튼 누르면 product_id를 user_id에 저장

// ActionCreator
const likeToggle = createAction(LIKE_TOGGLE, (id, is_like) => ({
  id,
  is_like,
}));
const addProduct = createAction(ADD, (product) => ({ product }));
const getProductList = createAction(GET, (list) => ({ list }));
const editProduct = createAction(EDIT, (product) => ({ product }));
const setLoading = createAction(LOADING, (isLoading) => ({
  isLoading,
}));

const addProductAPI = (product) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const insertedAt = Date.now();
  const images = product.images;
  const imageList = await (async () => {
    const imageURLs = await images.reduce(async (acc, image, idx) => {
      const urlList = await acc.then();
      const url = await storage
        .ref(`images/${product.writer.id}/${insertedAt}_${idx}`)
        .putString(image, "data_url")
        .then((snapshot) => snapshot.ref.getDownloadURL());
      urlList.push(url);
      return Promise.resolve(urlList);
    }, Promise.resolve([]));
    return imageURLs;
  })();

  product.images = imageList;
  product.insertedAt = insertedAt;
  product.imgUploadCnt = imageList.length;

  api.post(`/product`, product).then((response) => {
    const id = response.data.id;
    product.id = id;
    dispatch(addProduct(product));
    dispatch(imageActions.setImage([]));
  });
};

// 메인페이지에 상품 불러오기 (서버에서 프로덕트 데이터 가져오는 함수)
const getProductListAPI = () => {
  return function (dispatch, getState, { history }) {
    // 가져온 데이터를 리덕스에 넣기위한 정보로 바꿔줌
    api
      .get("/product")
      .then((datalist) => {
        const data_list = datalist.data;
        dispatch(getProductList(data_list)); // product_list를 리덕스에 넣어줌
      })
      .catch((error) => {
        console.log("getProductAPI 오류", error);
      });
  };
};

const loadProductOneAPI =
  (id) =>
  (dispatch, getState, { history }) => {
    api
      .get(`/product/${id}`)
      .then((response) => {
        dispatch(addProduct(response.data));
      })
      .catch((err) => {
        history.replace("/");
      });
  };

const editProductAPI = (product) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const images = product.images;
  const imageList = await (async () => {
    const imageURLs = await images.reduce(async (acc, image, idx) => {
      const urlList = await acc.then();
      if (!image.startsWith("https://")) {
        const url = await storage
          .ref(
            `images/${product.writer.id}/${
              product.insertedAt
            }_${product.imgUploadCnt++}`
          )
          .putString(image, "data_url")
          .then((snapshot) => snapshot.ref.getDownloadURL());
        urlList.push(url);
      } else {
        urlList.push(image);
      }
      return Promise.resolve(urlList);
    }, Promise.resolve([]));
    return imageURLs;
  })();

  dispatch(imageActions.setImage([]));

  const { delList } = getState().image;
  delList.map((dl) => {
    const imageId = dl.split("_")[1].split("?")[0];
    storage
      .ref(`images/${product.writer.id}/${product.insertedAt}_${imageId}`)
      .delete();
  });

  product.images = imageList;
  api.put(`/product/${product.id}`, product).then((response) => {
    dispatch(editProduct(product));
  });
};

// 마이페이지에 내가 올린 상품 불러오기 (서버에서 프로덕트 데이터 가져오는 함수)
const getSellProductAPI = (user_id) => {
  return function (dispatch, getState, { history }) {
    // 가져온 데이터를 리덕스에 넣기위한 정보로 바꿔줌
    axios
      .get("http://localhost:3005/product", {
        params: { user_id: String(user_id) },
      })
      .then((datalist) => {
        const data_list = datalist.data;
        console.log(data_list);
        // dispatch(putProduct(data_list)); // product_list를 리덕스에 넣어줌
      })
      .catch((error) => {
        console.log("getProductAPI 오류", error);
      });
  };
};
// 서버에서 is_like 정보 가져오는 함수
const getLikeToggleAPI = () => {
  return function (dispatch, getState, { history }) {
    const p_index = getState().product.list.findIndex((p) => p.id);
    const _is_like = getState().product.list[p_index].is_like;

    if (_is_like) {
      axios
        .patch("http://localhost:3003/product/1", { is_like: false })
        .then((datalist) => {
          const data_list = datalist.data;
          dispatch(likeToggle(data_list.id, data_list.is_like));
          // user에 product_id 저장
        });
    } else {
      axios
        .patch("http://localhost:3003/product/1", { is_like: true })
        .then((datalist) => {
          const data_list = datalist.data;
          dispatch(likeToggle(data_list.id, data_list.is_like));
          // user에 product_id 삭제
        });
    }
  };
};

//-------------------------------------
// Product
//-------------------------------------
// {
//   writer: {
//     id: "",
//     name: "",
//     profile: "",
//   },
//   id: "",
//   productTitle: "",
//   description: "",
//   productName: "",
//   price: "",
//   category: "",
//   images: [],
//   imgUploadCnt: 0,
//   insertedAt: "",
// },

const initialState = {
  list: [],
  isLoading: false,
};

const reducer = handleActions(
  {
    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.product);
        draft.isLoading = false;
      }),

    [GET]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
        draft.isLoading = false;
      }),

    [EDIT]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.list.findIndex(
          (product) => product.id === action.payload.product.id
        );
        draft.list[idx] = action.payload.product;
        draft.isLoading = false;
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),

    // [PUT_PRODUCT]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.list.push(...action.payload.product_list);
    //     // 배열 안에 데이터 넣어준다.
    //     draft.list = draft.list.reduce((acc, cur) => {
    //       if (acc.findIndex((a) => a.id === cur.id) === -1) {
    //         return [...acc, cur];
    //       } else {
    //         acc[acc.findIndex((a) => a.id === cur.id)] = cur;
    //         return acc;
    //       }
    //     }, []);
    //   }),

    [LIKE_TOGGLE]: (state, action) =>
      produce(state, (draft) => {
        const index = draft.list.findIndex((p) => p.id, action.payload.id);
        draft.list[index].is_like = action.payload.is_like;
      }),
  },
  initialState
);

export const actionCreators = {
  addProduct,
  loadProductOneAPI,
  addProductAPI,
  editProductAPI,
  likeToggle,
  getProductListAPI,
  getSellProductAPI,
  getLikeToggleAPI,
};
export default reducer;
