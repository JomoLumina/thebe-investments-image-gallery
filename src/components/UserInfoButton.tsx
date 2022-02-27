import { Avatar, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles(()=> ({
  details:{
    position: 'absolute',
    width: 160,
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 1,
    border: '2px solid #ccc',
    borderRadius: 50,
    justifyContent: 'left',
    margin: 'auto',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#eee',
    }
  },
  name:{
    zIndex: 20,
    position: 'relative',
    fontSize: 13,
    textAlign: 'left',
    fontWeight: 'bold',
    lineHeight: 1,
    marginLeft: 10,
    textTransform: 'capitalize',
    display: 'inline-block',
    top: 17,
    verticalAlign: 'top',
    maxWidth: 100,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    color: '#333',
  },
  avatar:{
    display: 'inline-block !important',
    top: 2,
    left: 5,
  }
}));

const UserInfoButton = ({avatar, name}) => {
  const classes = useStyles();
  return (
    <Box className={classes.details}>
      <Avatar src={avatar} alt={name} className={classes.avatar}/>
      <Typography color="textPrimary" variant="body1" className={classes.name}>
        {name}
      </Typography> 
    </Box>
  )
}

export default UserInfoButton;
