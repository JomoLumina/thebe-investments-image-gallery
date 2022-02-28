import React, { Ref } from "react";
import type { Photo } from 'src/types/photo';
import { Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import { makeStyles } from "@material-ui/styles";
import { renderToString } from 'react-dom/server'
import PhotoModal from "./PhotoModal";
import PhotoLoad from "./PhotoLoad";

const useStyles = makeStyles(()=>({
  image: {
    opacity: 1,
    cursor: 'pointer',
    transition: '0.375s ease',
    '&:hover':{
      opacity: 0.6,
      transform: 'scale(1.05)',
    },
    minHeight: 300,
    backgroundColor: 'rgba(0,0,0,0.1)',
  }
}));

const PhotoComponent: React.FC<{ photo: Photo, photoId: number }> = ({ photo, photoId }) => {
  const classes = useStyles();
  const { urls } = photo;
  const blurry_query_string = "&fit=crop&h=400&q=10&fm=jpg";

  const modal = renderToString(<PhotoModal photo={photo} />);
  return (
      <Item html={modal}>
        {({ ref, open }) => (
            <PhotoLoad
              key={photoId}
              ref={ref as Ref<HTMLImageElement>}
              onClick={open}
              placeholder={urls.raw + blurry_query_string}
              alt={urls.regular}
              src={urls.regular}
              className={classes.image}
            />
        )}
      </Item>
  );
};
export default PhotoComponent