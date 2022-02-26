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
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: `${theme.palette.background.dark}`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    overflow: 'hidden',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  searchContainer:{
    padding: theme.spacing(3),
    position: 'relative'
  },
  searchTextField: {
    '& input': {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(9),
    },
    '& fieldset': {
      borderRadius: '30px',
    },
  },
  searchButton: {
    backgroundColor: theme.palette.secondary.main,
    position: 'absolute',
    right: 10,
    padding: 12,
    top: 32,
    bottom: 0,
    height: 64,
    width: 64,
    cursor: 'pointer',
    borderRadius: '100%'
  },
  searchIcon:{
    color: '#fff',
    fontSize: 42
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
      title="Image Gallery"
    >
      <Container maxWidth="lg">
        <Box mt={3}>
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
