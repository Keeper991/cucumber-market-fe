import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import moment from "moment";
import axios from "axios";

// Action
const PUT_PRODUCT = "PUT_PRODUCT"; // 서버에 가져온 리스트를 리덕스에 넣어주는 액션
const ADD_PRODUCT = "ADD_PRODUCT"; // 리덕스에 추가해주는 액션
const LIKE_TOGGLE = "LIKE_TOGGLE"; // 토글 버튼 누르면 product_id를 user_id에 저장

// ActionCreator
const putProduct = createAction(PUT_PRODUCT, (product_list) => ({ product_list }));
const addProduct = createAction(ADD_PRODUCT, (product) => ({ product }));
const likeToggle = createAction(LIKE_TOGGLE, (product_id, user_id) => ({ product_id, user_id }));


// 서버에서 프로덕트 데이터 가져오는 함수
const getProductAPI = () => {
  return function (dispatch, getState, { history }) {
    // 가져온 데이터를 리덕스에 넣기위한 정보로 바꿔줌
    axios.get("http://localhost:3003/product").then((datalist) => {
      const data_list = datalist.data;
      console.log(data_list); // data_list [{..},{..}] 배열 안에 객체로 담겨있음
      dispatch(putProduct(data_list)) // product_list를 리덕스에 넣어줌
    });
  }
}

// 서버에서 내가 좋아요 누른 프로덕트 데이터 가져오는 함수
// const getLikeProductAPI = () => {
//   return function (dispatch, getState, { history }) {
//     axios.get('localhost:3001').then((response) => {
//       let like_product_list = [];
//       response.forEach((res) => {

//         let _like_product = {
//           id: res.id, ...res.data()
//         }

//         let product = {
//           id: res.id,
//           user_info: {
//             user_id: _like_product.user_id,
//             nickname: _like_product.nickname,
//             user_profile: _like_product.user_profile,
//           },
//           image_url: _like_product.image_url,
//           contents: _like_product.contents,
//           insertedAt: _like_product.insertedAt,
//         }

//         like_product_list.push(product);
//       });

//       dispatch(putProduct(like_product_list)) // product_list를 리덕스에 넣어줌
//     });
//   }

// }

// like버튼 누르면 실행되는 함수 
// const likeToggleAPI = (product_id, user_id) => {
//   return function (dispatch, getState, { history }) {

//     if (!getState().user.user) {
//       window.alert('로그인 후 이용가능합니다.');
//       history.push("/login");
//       return;
//     }

//     const _index = getState().product.list.findIndex((p) => p.id === product_id); // post 찾기 위해 배열의 몇 번쨰에 있는지 확인
//     const _product = getState().product.list[_index]; // post 정보 가져오기
//     const user_id = getState().user.user_id; // user id 가져오기

//     axios.get('localhost:3001').then((response) => {

//       // user_id가 product_id를 가지고 있는 경우
//       if (user_id.hasOwnProperty('product_id')) {
//         // 가지고있는 product_id 삭제, 하트버튼(라인)변경
//         user_info.pop(product_id).then(
//           dispatch(likeToggle(product_id, user_id))
//         );
//       }
//       else { // user_id가 product_id를 가지고 있는않은 경우
//         // 해당 product_id user_id에 추가, 하트버튼(솔리드)변경
//         user_info.push(product_id).then(
//           dispatch(likeToggle(product_id, user_id))
//         )
//       }

//     });
//   }
// }



// initailState
const initialState = {
  list: [],
}

const initialProduct = {
  user_info: {
    user_id: "",
    user_name: "",
    user_profile: "",
  },
  image_url: "",
  productName: "",
  price: "",
  insertedAt: moment().format("YYYY-MM-DD hh:mm:ss"),
  is_like: false,
  category: "",
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
  }, initialState
);


// ActionCreator export
const actionCreators = {
  putProduct,
  addProduct,
  likeToggle,
  getProductAPI,
  // getLikeProductAPI,
}

export { actionCreators };