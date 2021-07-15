import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { productAPI } from "../../shared/API";
import { storage } from "../../shared/firebase";
import { actionCreators as imageActions } from "./image";
import { getIdFromToken, getUserInfoFromLS } from "../../shared/Permit";

const ADD = "product/ADD";
const EDIT = "product/EDIT";
const SET = "product/GET";
const LOADING = "product/LOADING";
const REMOVE = "product/REMOVE";
const SET_IS_SEARCH = "product/SET_IS_SEARCH";
const SET_SEARCH = "product/SET_SEARCH";
// const PUT_PRODUCT = "PUT_PRODUCT"; // 서버에 가져온 리스트를 리덕스에 넣어주는 액션

// ActionCreator

const addProduct = createAction(ADD, (product) => ({ product }));
const setProductList = createAction(SET, (list, total) => ({ list, total }));
const editProduct = createAction(EDIT, (product) => ({ product }));
const removeProduct = createAction(REMOVE, (id) => ({ id }));
const setLoading = createAction(LOADING, (isLoading) => ({
  isLoading,
}));
const setSearch = createAction(SET_IS_SEARCH, (isSearch) => ({ isSearch }));
const setSearchList = createAction(SET_SEARCH, (list, total) => ({
  list,
  total,
}));

const addProductAPI =
  (product) =>
  async (dispatch, getState, { history }) => {
    dispatch(setLoading(true));
    const userId = getIdFromToken();
    const insertedAt = Date.now();
    const images = product.images;
    const imageList = await (async () => {
      const imageURLs = await images.reduce(async (acc, image, idx) => {
        const urlList = await acc.then();
        const url = await storage
          .ref(`images/${userId}/${insertedAt}_${idx}`)
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

    try {
      const res = await productAPI.add(product);
      console.log(res);
      const id = res.data.latest;
      product._id = id;
      dispatch(addProduct(product));
      dispatch(imageActions.setImage([]));
      alert("게시글이 생성되었습니다.");
      history.replace(`/detail/${id}`);
    } catch (e) {
      console.log(e);
      alert("게시글을 생성하지 못했습니다.");
      dispatch(setLoading(false));
      history.replace("/");
    }
  };

const getProductListAPI = () => {
  return async function (dispatch, getState, { history }) {
    const { nextPage, totalProductCount, productCntInOnePage } =
      getState().product;

    if (
      nextPage !== 1 &&
      totalProductCount - (nextPage - 1) * productCntInOnePage < 1
    ) {
      return;
    }

    dispatch(setLoading(true));
    try {
      const res = await productAPI.getList(nextPage);
      const { contents: productList, totalLength } = res.data;
      dispatch(setProductList(productList, totalLength)); // product_list를 리덕스에 넣어줌
    } catch (e) {
      console.log(e);
      alert("게시글을 불러오는데 실패했습니다.");
      dispatch(setLoading(false));
    }
  };
};

const getProductOneAPI =
  (id) =>
  async (dispatch, getState, { history }) => {
    dispatch(setLoading(true));
    try {
      const res = await productAPI.getOne(id);
      const data = res.data.getProduct;
      dispatch(addProduct(data));
    } catch (e) {
      console.log(e);
      alert("게시글을 찾을 수 없습니다.");
      dispatch(setLoading(false));
      history.replace("/");
    }
  };

const editProductAPI =
  (product) =>
  async (dispatch, getState, { history }) => {
    dispatch(setLoading(true));
    const userId = getIdFromToken();
    const images = product.images;
    const imageList = await (async () => {
      const imageURLs = await images.reduce(async (acc, image, idx) => {
        const urlList = await acc.then();
        if (!image.startsWith("https://")) {
          const url = await storage
            .ref(
              `images/${userId}/${product.insertedAt}_${product.imgUploadCnt++}`
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

    product.images = imageList;

    try {
      const res = await productAPI.edit(product);
      console.log(res);
      dispatch(editProduct(product));
      const { delList } = getState().image;
      delList.map((dl) => {
        const imageId = dl.split("_")[1].split("?")[0];
        storage
          .ref(`images/${product.user.userId}/${product.insertedAt}_${imageId}`)
          .delete();
      });
      alert("수정되었습니다!");
      history.push(`/detail/${product._id}`);
    } catch (e) {
      console.log(e);
      alert("수정에 실패했습니다.");
      dispatch(setLoading(false));
      history.replace(`/`);
    }
  };

const removeProductAPI =
  (id) =>
  async (dispatch, getState, { history }) => {
    dispatch(setLoading(true));
    try {
      await productAPI.remove(id);
      dispatch(removeProduct(id));
      alert("게시물이 삭제되었습니다.");
      history.replace("/");
    } catch (e) {
      console.log(e);
      alert("게시물 삭제에 실패했습니다.");
      history.replace("/");
    }
  };

const searchProductAPI = (option, keyword) => async (dispatch, getState) => {
  if (!keyword) {
    dispatch(setSearch(false));
  } else {
    dispatch(setSearch(true));
    const { searchNextPage, totalSearchCount, productCntInOnePage } =
      getState().product;

    if (
      searchNextPage !== 1 &&
      totalSearchCount - (searchNextPage - 1) * productCntInOnePage < 1
    ) {
      return;
    }
    dispatch(setLoading(true));

    const data = {
      pageNum: searchNextPage,
      option,
      keyword,
    };

    try {
      const res = await productAPI.search(data);
      dispatch(setSearchList(res.data.contents, res.data.totalLength));
    } catch (e) {
      console.log(e);
      alert("게시글을 불러오는데 실패했습니다.");
      dispatch(setLoading(false));
      dispatch(setSearch(false));
    }
  }
};

//-------------------------------------
// Product
//-------------------------------------
// {
//   user: {
//     userId: "",
//     username: "",
//     userProfile: "",
//   },
//
//   id: "",
//   title: "",
//   description: "",
//   productName: "",
//   price: "",
//   productCategory: "",
//   images: [],
//   imgUploadCnt: 0,
//   insertedAt: "",
//   isLike: false,
// },

// like = postid - userid, isLike
// mypage = [productId]

const initialState = {
  list: [],
  isLoading: false,
  isSearch: false,
  nextPage: 1,
  totalProductCount: 0,
  searchList: [],
  searchNextPage: 1,
  totalSearchCount: 0,
  productCntInOnePage: 10,
};

const reducer = handleActions(
  {
    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.product);
        draft.isLoading = false;
      }),

    [SET]: (state, action) =>
      produce(state, (draft) => {
        if (draft.list.length < 2) draft.list = action.payload.list;
        else draft.list.push(...action.payload.list);
        ++draft.nextPage;
        draft.totalProductCount = action.payload.total;
        draft.isLoading = false;
      }),

    [EDIT]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.list.findIndex(
          (product) => product._id === action.payload.product._id
        );
        draft.list[idx] = action.payload.product;
        draft.isLoading = false;
      }),
    [REMOVE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.list.findIndex(
          (product) => product._id === action.payload.id
        );
        draft.list.splice(idx, 1);
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),

    [SET_IS_SEARCH]: (state, action) =>
      produce(state, (draft) => {
        draft.isSearch = action.payload.isSearch;
        draft.searchList = [];
        draft.searchNextPage = 1;
        draft.totalSearchCount = 0;
      }),

    [SET_SEARCH]: (state, action) =>
      produce(state, (draft) => {
        if (draft.searchList.length < 2) draft.searchList = action.payload.list;
        else draft.searchList.push(...action.payload.list);
        ++draft.searchNextPage;
        draft.totaSearchCount = action.payload.total;
        draft.isLoading = false;
      }),
  },
  initialState
);

export const actionCreators = {
  addProduct,
  getProductOneAPI,
  addProductAPI,
  editProductAPI,
  getProductListAPI,
  removeProductAPI,
  searchProductAPI,
  setSearch,
};
export default reducer;
