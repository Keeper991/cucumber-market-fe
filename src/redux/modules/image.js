import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const ADD = "image/ADD";
const SET = "image/SET";
const REMOVE = "image/REMOVE";
const UPLOADING = "image/UPLOADING";

const addImage = createAction(ADD, (imgData) => ({ imgData }));
const setImage = createAction(SET, (list) => ({ list }));
const removeImage = createAction(REMOVE, (idx) => ({ idx }));
const setUploading = createAction(UPLOADING, (isUploading) => ({
  isUploading,
}));

const initialState = {
  list: [],
  delList: [],
  isUploading: false,
};

const reducer = handleActions(
  {
    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.imgData);
      }),
    [SET]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
        draft.delList = [];
      }),
    [REMOVE]: (state, action) =>
      produce(state, (draft) => {
        draft.delList.push(...draft.list.splice(action.payload.idx, 1));
      }),
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isUploading = action.payload.isUploading;
      }),
  },
  initialState
);

export const actionCreators = { addImage, setImage, removeImage, setUploading };
export default reducer;
