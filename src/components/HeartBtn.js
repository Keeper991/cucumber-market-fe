import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import Color from "../shared/Color";
import { Button } from "../elements";
import { getIdFromToken, getUserInfoFromLS } from "../shared/Permit";
import { history } from "../redux/configStore";
import { actionCreators as userActions } from "../redux/modules/user";

const HeartBtn = (props) => {
  const [isLike, setIsLike] = useState(false);
  const dispatch = useDispatch();
  const isLogin = useSelector((store) => store.user.isLogin);
  const productId = props.id;
  const userId = getIdFromToken();
  const userInfo = getUserInfoFromLS();
  const favorites = useSelector((store) => store.user.myPageInfo.favorites);
  const noEvent = props.noEvent;

  useEffect(() => {
    if (favorites.length) {
      console.log(favorites);
      if (favorites.findIndex((f) => f._id === productId) !== -1)
        setIsLike(true);
    }
  }, [favorites, productId]);

  const handleClick = (e) => {
    if (noEvent) return;

    if (!userId || !userInfo || !isLogin) {
      alert("로그인해주세요.");
      history.push("/login");
      return;
    }

    dispatch(userActions.setLikeToggleAPI(userId, productId, !isLike));
    setIsLike(!isLike);
  };
  return (
    <Button
      _onClick={handleClick}
      padding="0"
      width="auto"
      bgColor="transparent"
    >
      {isLike ? (
        <Favorite style={{ color: Color.green }} />
      ) : (
        <FavoriteBorder />
      )}
    </Button>
  );
};

HeartBtn.defaultProps = {
  noEvent: false,
};

export default HeartBtn;
