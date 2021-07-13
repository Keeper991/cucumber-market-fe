import styled from "styled-components";
import Color from "./Color";
import { AddAPhoto } from "@material-ui/icons";
import { actionCreators as imageActions } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

const UploadImg = () => {
  const imageList = useSelector((store) => store.image.list);
  const dispatch = useDispatch();
  const getFileDataAsync = useCallback(async (files) => {
    const getFileData = (file) => {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    };
    const fileList = [];
    for (let i = 0; i < files.length; i++) {
      fileList.push(getFileData(files[i]));
    }
    return await Promise.all(fileList);
  }, []);

  const handleChange = async (e) => {
    dispatch(imageActions.setUploading(true));
    const { files } = e.target;
    const list = await getFileDataAsync(files);
    dispatch(imageActions.addImage(list));
    dispatch(imageActions.setUploading(false));
  };

  return (
    <InputLabel imageCount={imageList?.length}>
      <AddAPhoto />
      {imageList?.length} / 10
      <InputImg
        onChange={handleChange}
        accept="image/*"
        multiple
        imageCount={imageList?.length}
      />
    </InputLabel>
  );
};

const InputLabel = styled.label`
  width: 6em;
  height: 6em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${Color.gray};
  border-radius: 10px;
  & > *:not(:last-child) {
    margin-bottom: 0.5em;
  }
  ${({ imageCount }) => (imageCount >= 10 ? `color: ${Color.gray};` : "")}
`;

const InputImg = styled.input.attrs((props) => ({
  disabled: props.imageCount >= 10 ? true : false,
  type: "file",
}))`
  display: none;
`;

export default UploadImg;
