import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// Action
const GET_USER = "GET_USER"; // 유저ID 받아오기
const SET_USER = "SET_USER";

// ActionCreator
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// initailState
const initialState = {
  user:
  {
    id: "1",
    nickname: "nickname1"
  },
}

const getUserAPI = (user_id) => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`http://localhost:3005/user/${user_id}`).then((userinfo) => {
        const user = userinfo.data;
        dispatch(setUser({
          id: user.id,
          nickname: user.nickname,
        })) // user를 리덕스에 넣어줌
      })
  }
}

// Reducer
export default handleActions(
  {
    [GET_USER]: (state, action) => produce(state, (draft) => {
      draft.user = action.payload.user;
    }),
    [SET_USER]: (state, action) => produce(state, (draft) => {
      draft.user = action.payload.user;
    })
  }, initialState
);

// ActionCreator export
const actionCreators = {
  getUser,
  getUserAPI,
}

export { actionCreators };