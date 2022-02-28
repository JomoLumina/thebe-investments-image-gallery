import React from 'react';
import type { FC } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  AppBar,
  Box,
  Hidden,
  Toolbar,
  makeStyles,
} from '@material-ui/core';
import { THEMES } from 'src/constants';
import type { Theme } from 'src/theme';
import Account from './Account';
import Header from 'src/components/Header';
import Logo from 'src/components/Logo';

interface TopBarProps {
  className?: string;
  onMobileNavOpen?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    ...theme.name === THEMES.ONE_DARK ? {
      backgroundColor: theme.palette.background.default
    } : {}
  },
  toolbar: {
    minHeight: 64
  },
  logoContainer: {
    maxHeight: 64
  }
}));

const TopBar: FC<TopBarProps> = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Hidden smUp>
          <Box>
            <Logo />
          </Box>
        </Hidden>
        <Hidden xsDown>
          <Header />
        </Hidden>
        <Box
          ml={2}
          flexGrow={1}
        />
        <Box ml={2}>
          <Account />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

TopBar.defaultProps = {
  onMobileNavOpen: () => {}
};

export default TopBar;
