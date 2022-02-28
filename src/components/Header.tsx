import React from 'react';
import type { FC } from 'react';
import {
  makeStyles, Typography
} from '@material-ui/core';
import type { Theme } from 'src/theme'; 

const headerBackground = '/static/images/headerBackground.png';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: 'center',
    background: `url(${headerBackground}) repeat-x 0 80%`,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    minHeight: '100%',
    padding: theme.spacing(2)
  },
  headerText: {
    fontFamily: 'jaapokkienhance-regular',
    textAlign: 'center',
    fontSize: theme.spacing(3.75),
    color: '#e6e5e8',
    textTransform:'uppercase',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(2.25)
    }
  }
}));

const Header: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        color="textPrimary"
        variant="h1"
        className={classes.headerText}
      >
        Thebe Investment Management
      </Typography>
    </div>
  );
};

export default Header;

