import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../shared/API";
import { storage } from "../../shared/firebase";
import { actionCreators as imageActions } from "./image";

const ADD = "product/ADD";
const EDIT = "product/EDIT";
const UPLOADING = "product/UPLOADING";

const addProduct = createAction(ADD, (product) => ({ product }));
const editProduct = createAction(EDIT, (product) => ({ product }));
const setUploading = createAction(UPLOADING, (isUploading) => ({
  isUploading,
}));

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

const addProductAPI = (product) => async (dispatch, getState) => {
  dispatch(setUploading(true));
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

const editProductAPI = (product) => async (dispatch, getState) => {
  dispatch(setUploading(true));
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
  isUploading: false,
  isLoading: false,
};

const reducer = handleActions(
  {
    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.product);
        draft.isUploading = false;
      }),
    [EDIT]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.list.findIndex(
          (product) => product.id === action.payload.product.id
        );
        draft.list[idx] = action.payload.product;
        draft.isUploading = false;
      }),
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isUploading = action.payload.isUploading;
      }),
  },
  initialState
);

export const actionCreators = {
  addProduct,
  loadProductOneAPI,
  addProductAPI,
  editProductAPI,
};
export default reducer;
