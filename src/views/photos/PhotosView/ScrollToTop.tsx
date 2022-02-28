import React, { FC, useEffect, useState } from "react";
import { Button, makeStyles} from "@material-ui/core";
import { KeyboardArrowUpRounded as ScrollToTopIcon} from '@material-ui/icons';

import { Theme } from "src/theme";

const useStyles = makeStyles((theme: Theme) => ({
  scrollToTopButton: {
    backgroundColor: 'rgb(0,191,255)',
    position: 'fixed',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    height: theme.spacing(8),
    width: theme.spacing(8),
    cursor: 'pointer',
    borderRadius: '100%',
    transition: 'all 0.4s',
    '&:hover': {
      backgroundColor: 'rgba(0,191,255, 0.75)',
    }
  },
  scrollToTopIcon:{
    color: '#fff',
    fontSize: 42,
    [theme.breakpoints.down('xs')]:{
      fontSize: 32
    }
  }
}));

const ScrollToTop: FC = () => {
  const classes = useStyles();
   const [showButton, setShowButton] = useState(false);

   useEffect(() => {
     window.addEventListener("scroll", () => {
       if (window.pageYOffset > 600) {
         setShowButton(true);
       } else {
         setShowButton(false);
       }
     });
   }, []);
 
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
  }

  return (
    <div>
      {showButton && 
        <Button className={classes.scrollToTopButton} onClick={handleScrollToTop}>
          <ScrollToTopIcon className={classes.scrollToTopIcon}></ScrollToTopIcon>
        </Button>}
    </div>
  );
};

export default ScrollToTop;