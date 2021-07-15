import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { userAPI } from "../../shared/API";
import {
  removeTokenUserInfo,
  setToken,
  setUserInfoLS,
  getIdFromToken,
} from "../../shared/Permit";

// Action
const SET_MYPAGE_INFO = "user/SET_MYPAGE_INFO";
const LOGOUT = "user/LOGOUT";
const IS_LOGIN = "user/IS_LOGIN";
const LOADING = "user/LOADING";
const LIKE_TOGGLE = "LIKE_TOGGLE"; // 토글 버튼 누르면 product_id를 user_id에 저장

// ActionCreator
const setMyPageInfo = createAction(SET_MYPAGE_INFO, (info) => ({ info }));
const setIsLogin = createAction(IS_LOGIN, (isLogin) => ({ isLogin }));
const logout = createAction(LOGOUT, () => ({}));
const setIsLoading = createAction(LOADING, (isLoading) => ({ isLoading }));
const likeToggle = createAction(LIKE_TOGGLE, (product, is_like) => ({
  product,
  is_like,
}));

const loginAPI =
  (data) =>
  async (dispatch, getState, { history }) => {
    dispatch(setIsLoading(true));
    try {
      const res = await userAPI.login(data);
      const { token, userInfo } = res.data;
      setToken(token);
      setUserInfoLS({
        username: userInfo.username,
        userProfile:
          userInfo.userProfile ||
          "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80",
      });
      const myPageInfo = {
        favorites: userInfo.favorite,
        myPosts: [],
      };
      dispatch(setMyPageInfo(myPageInfo));
      dispatch(setIsLogin(true));
      alert("로그인 되었습니다!");
      history.replace("/");
    } catch (e) {
      console.log(e);
      alert("로그인에 실패했습니다.");
      dispatch(setIsLoading(false));
    }
  };

const registerAPI =
  (user) =>
  async (dispatch, getState, { history }) => {
    dispatch(setIsLoading(true));
    try {
      console.log(user);
      const res = await userAPI.register(user);
      console.log(res);
      alert("회원가입 되었습니다! 로그인해주세요!");
      dispatch(setIsLoading(false));
      history.push("/login");
    } catch (e) {
      console.log(e);
      alert("회원가입에 실패했습니다.");
      dispatch(setIsLoading(false));
    }
  };

const getMyPageInfoAPI = (user_id) => {
  return async function (dispatch, getState, { history }) {
    dispatch(setIsLoading(true));
    try {
      const res = await userAPI.getUserData(user_id);
      const { favorites, myPosts } = res.data;
      dispatch(
        setMyPageInfo({
          favorites,
          myPosts,
        })
      );
    } catch (e) {
      console.log(e);
      alert("마이페이지에 필요한 정보를 불러오는데 실패했습니다.");
      dispatch(setIsLoading(false));
    }
  };
};

const setLikeToggleAPI = (userId, productId, isLike) => {
  return async function (dispatch, getState, { history }) {
    dispatch(setIsLoading(true));
    const data = {
      productId,
      userId,
      isLike,
    };

    try {
      const res = await userAPI.like(data);
      console.log(res.data.response);
      const productList = getState().product.list;
      const product = productList.find((p) => p._id === productId);
      dispatch(likeToggle(product, isLike));
    } catch (e) {
      console.log(e);
      alert("찜하기를 실패했습니다.");
      dispatch(setIsLoading(false));
    }
  };
};

// initailState
const initialState = {
  myPageInfo: {
    favorites: [],
    myPosts: [],
  },
  isLogin: false,
  isLoading: false,
};

// Reducer
export default handleActions(
  {
    [SET_MYPAGE_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.myPageInfo = action.payload.info;
        draft.isLoading = false;
      }),

    [IS_LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = action.payload.isLogin;
      }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.myPageInfo = { favorites: [], myPosts: [] };
        draft.isLogin = false;
        removeTokenUserInfo();
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),
    [LIKE_TOGGLE]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.is_like) {
          draft.myPageInfo.favorites.push(action.payload.product);
        } else {
          const index = draft.myPageInfo.favorites.findIndex(
            (f) => f._id === action.payload.product._id
          );
          draft.myPageInfo.favorites.splice(index, 1);
        }
        draft.isLoading = false;
      }),
  },
  initialState
);

// ActionCreator export
const actionCreators = {
  loginAPI,
  registerAPI,
  getMyPageInfoAPI,
  logout,
  setIsLogin,
  setLikeToggleAPI,
};

export { actionCreators };
