import React, {useState} from 'react';
import type { FC } from 'react';
import {
  Box,
  Container,
  Divider,
  makeStyles,
} from '@material-ui/core';
import Search from './Search';
import Page from 'src/components/Page';
import type { Theme } from 'src/theme';
import PhotoContainer from './PhotoContainer';
import TopBar from './TopBar';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: `${theme.palette.background.dark}`,
    minHeight: '100vh',
    overflow: 'hidden',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingTop: 64
  },
  topBar:{
    zIndex: 10
  }
}));

const AccountView: FC = () => {
  const classes = useStyles();
  const [query, setQuery] = useState<string | null>(null);

  const searchFn = (_query) => {
    setQuery(_query);
  }
  return (
    <Page
      className={classes.root}
      title="Photo Gallery">
      <TopBar className={classes.topBar} />
      <Container maxWidth="lg" className={classes.content}>
        <Box>
          <Search searchFn={searchFn} />
        </Box>
        <Divider />
        <Box mt={3}>
          <PhotoContainer query={query}/>
        </Box>
      </Container>
    </Page>
  );
};

export default AccountView;
