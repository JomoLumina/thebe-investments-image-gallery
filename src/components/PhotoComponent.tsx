import React, { LegacyRef } from "react";
import type { Photo } from 'src/types/photo';
import { Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import { makeStyles } from "@material-ui/styles";
import { renderToString } from 'react-dom/server'
import PhotoModal from "./PhotoModal";

const useStyles = makeStyles(()=>({
  image: {
    opacity: 1,
    cursor: 'pointer',
    transition: '0.375s ease',
    '&:hover':{
      opacity: 0.6,
      transform: 'scale(1.05)',
    }
  }
}));

const PhotoComponent: React.FC<{ photo: Photo, photoId: number }> = ({ photo, photoId }) => {
  const classes = useStyles();
  const { urls } = photo;

  const modal = renderToString(<PhotoModal photo={photo} />);
  return (
      <Item html={modal}>
        {({ ref, open }) => (
            <img
              key={photoId}
              ref={ref as LegacyRef<HTMLImageElement>}
              onClick={open}
              alt={urls.regular}
              src={urls.regular}
              className={classes.image} />
        )}
      </Item>
  );
};
export default PhotoComponent