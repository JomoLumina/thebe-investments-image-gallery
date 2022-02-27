import React from 'react';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  makeStyles
} from '@material-ui/core';
import type { Theme } from 'src/theme';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.background.dark,
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3),
    paddingTop: 80,
    paddingBottom: 80
  },
  image: {
    maxWidth: '100%',
    width: 560,
    maxHeight: 300,
    height: 'auto'
  }
}));

const NotFoundView: FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Page
      className={classes.root}
      title="404: Not found"
    >
      <Container maxWidth="lg">
        <Typography
          align="center"
          variant={mobileDevice ? 'h4' : 'h1'}
          color="textPrimary"
        >
          Oops, How did you get here
        </Typography>
        <Typography
          align="center"
          variant="subtitle2"
          color="textSecondary"
        >
          You either tried some shady route or you
          came here by mistake.
        </Typography>
        <Box
          mt={6}
          display="flex"
          justifyContent="center"
        >
          <img
            alt="Under development"
            className={classes.image}
            src="/static/images/undraw_page_not_found_su7k.svg"
          />
        </Box>
        <Box
          mt={6}
          display="flex"
          justifyContent="center"
        >
          <Button
            color="secondary"
            component={RouterLink}
            to="/"
            variant="outlined"
          >
            Back to home
          </Button>
        </Box>
      </Container>
    </Page>
  );
};

export default NotFoundView;
