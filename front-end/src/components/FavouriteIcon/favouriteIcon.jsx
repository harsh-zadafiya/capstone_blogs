import React from "react";
import { FavIcon, HeartIcon } from "./favouriteIcon.style";

const FavouriteIcon = ({ favourite, handleOnClick }) => {
  return (
    <FavIcon favourite={favourite} onClick={handleOnClick}>
      <HeartIcon />
    </FavIcon>
  );
};

export default FavouriteIcon;
