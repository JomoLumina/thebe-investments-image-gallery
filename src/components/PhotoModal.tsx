import React from "react";
import type { Photo } from 'src/types/photo';
import { makeStyles } from "@material-ui/styles";
import {Box, Container, Typography } from "@material-ui/core";
import UserInfoButton from "./UserInfoButton";
import { FavoriteRounded as LikeIcon, GetAppRounded as DownloadIcon } from '@material-ui/icons';

interface PhotoModalProps {
  photo: Photo;
}
const useStyles = makeStyles(()=>({
  container:{
    position: 'absolute',
    maxWidth: "100vw",
    maxHeight: "100vh",
    width: "100%",
    height: "100%",
  },
  content:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0.
  },
  contentImage:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    width: 'auto',
    height: 'auto',
    maxWidth: 'calc(100vw - 60px) !important',
    maxHeight: 'calc(100vh - 120px)',
  },
  contentDescription: {
    color: '#fff',
    bottom: 60,
    position: 'absolute',
    width: 'calc(100vw - 40px)',
    left: 0,
    right: 0,
    margin: 'auto',
    textAlign: 'center',
    maxWidth: 700,
    textShadow: '0px 0px #333',
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingTop: 10
  },
  downloadIcon:{
    position: 'absolute',
    color: '#00f',
    left: 0,
    right: 50,
    margin: 'auto',
    border: '3px solid',
    borderRadius: 50,
    fontSize: 32,
    bottom: 20,
    zIndex: 50,
    boxShadow: "0px 0px 1px 3px #fff",
  },
  likesContainer:{
    zIndex: 30,
    position: 'absolute',
    left: 100,
    right: 0,
    margin: 'auto',
    textAlign: 'left',
    bottom: 12,
    width: 90,
    color: '#fff'
  },
  likesCounter:{
    display: 'inline-block'
  },
  likeIcon:{
    fontSize: 38,
    display: 'inline-block',
    color: '#f00'
  }
}));

const PhotoModal: React.FC<PhotoModalProps> = ({ photo }) => {
  const classes = useStyles();
  const { id, urls, alt_description, description, user, links, likes } = photo;

//   const logo = renderToString(<Logo />);
  return (
    <Container className={classes.container}>
        <Box className={classes.content}>
          <a 
            target='_blank' 
            href={user.links.html} 
            rel="noopener noreferrer">
            <UserInfoButton
              name={user.name}
              avatar={user.profile_image.small}
            />
          </a>
          <a 
            target='_blank' 
            download={`${id}.jpg`}
            href={links.download} 
            rel="noopener noreferrer">
            <DownloadIcon className={classes.downloadIcon} />
          </a>
          <Box className={classes.likesContainer}>
            <LikeIcon className={classes.likeIcon} />
            <Typography className={classes.likesCounter}>{likes}</Typography>
          </Box>
          <Box>
            <img 
              alt={alt_description || description} 
              src={urls.regular} 
              className={classes.contentImage} />
            <Typography className={classes.contentDescription}>
              {description || alt_description}
            </Typography>
          </Box>
        </Box>
    </Container>
  );
};
export default PhotoModal