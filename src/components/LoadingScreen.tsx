import React, { useEffect } from 'react';
import type { FC } from 'react';
import NProgress from 'nprogress';
import {
  Box,
  LinearProgress,
  makeStyles
} from '@material-ui/core';
import type { Theme } from 'src/theme'; 

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    minHeight: '100%',
    padding: theme.spacing(3)
  },
  container: {
    width: 400,
    maxWidth: '100%'
  }
}));

const LoadingScreen: FC = () => {
  const classes = useStyles();

  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <div className={classes.root}>
      <Box className={classes.container}>
        <LinearProgress />
      </Box>
    </div>
  );
};

export default LoadingScreen;
