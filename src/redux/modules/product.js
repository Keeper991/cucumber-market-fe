import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import moment from "moment";
import axios from "axios";

// Action
const PUT_PRODUCT = "PUT_PRODUCT"; // 서버에 가져온 리스트를 리덕스에 넣어주는 액션
const ADD_PRODUCT = "ADD_PRODUCT"; // product를 리덕스에 추가해주는 액션
const LIKE_TOGGLE = "LIKE_TOGGLE"; // 토글 버튼 누르면 product_id를 user_id에 저장

// ActionCreator
const putProduct = createAction(PUT_PRODUCT, (product_list) => ({ product_list }));
const addProduct = createAction(ADD_PRODUCT, (product) => ({ product }));
const likeToggle = createAction(LIKE_TOGGLE, (id, is_like) => ({ id, is_like }));


// initailState
const initialState = {
  list: [],
}


// 메인페이지에 상품 불러오기 (서버에서 프로덕트 데이터 가져오는 함수)
const getProductAPI = () => {
  return function (dispatch, getState, { history }) {
    // 가져온 데이터를 리덕스에 넣기위한 정보로 바꿔줌
    axios
      .get("http://localhost:3005/product").then((datalist) => {
        const data_list = datalist.data;
        dispatch(putProduct(data_list)) // product_list를 리덕스에 넣어줌
      })
      .catch((error) => {
        console.log('getProductAPI 오류', error);
      });
  }
}

// 마이페이지에 내가 올린 상품 불러오기 (서버에서 프로덕트 데이터 가져오는 함수)
const getSellProductAPI = (user_id) => {
  return function (dispatch, getState, { history }) {
    // 가져온 데이터를 리덕스에 넣기위한 정보로 바꿔줌
    axios
      .get("http://localhost:3005/product", { params: { "user_id": String(user_id) } }).then((datalist) => {
        const data_list = datalist.data;
        console.log(data_list);
        dispatch(putProduct(data_list)) // product_list를 리덕스에 넣어줌
      })
      .catch((error) => {
        console.log('getProductAPI 오류', error);
      });
  }
}

// 서버에서 is_like 정보 가져오는 함수
const getLikeToggleAPI = () => {
  return function (dispatch, getState, { history }) {
    const p_index = getState().product.list.findIndex((p) => (p.id))
    const _is_like = getState().product.list[p_index].is_like

    if (_is_like) {
      axios.patch("http://localhost:3005/product/1", { is_like: false }).then((datalist) => {
        const data_list = datalist.data;
        dispatch(likeToggle(data_list.id, data_list.is_like))
        // user에 product_id 저장
      })
    } else {
      axios.patch("http://localhost:3005/product/1", { is_like: true }).then((datalist) => {
        const data_list = datalist.data;
        dispatch(likeToggle(data_list.id, data_list.is_like))
        // user에 product_id 삭제
      })
    }
  }
}


// Reducer
export default handleActions(
  {
    [PUT_PRODUCT]: (state, action) => produce(state, (draft) => {
      draft.list.push(...action.payload.product_list);
      // 배열 안에 데이터 넣어준다.
      draft.list = draft.list.reduce((acc, cur) => {
        if (acc.findIndex((a) => a.id === cur.id) === -1) {
          return [...acc, cur];
        } else {
          acc[acc.findIndex((a) => a.id === cur.id)] = cur;
          return acc;
        }
      }, []);
    }),

    [ADD_PRODUCT]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.product);
    }),

    [LIKE_TOGGLE]: (state, action) => produce(state, (draft) => {
      const index = draft.list.findIndex((p) => (p.id), action.payload.id)
      draft.list[index].is_like = action.payload.is_like;
    })
  }, initialState
);


// ActionCreator export
const actionCreators = {
  putProduct,
  addProduct,
  likeToggle,
  getProductAPI,
  getSellProductAPI,
  getLikeToggleAPI,

}

export { actionCreators };