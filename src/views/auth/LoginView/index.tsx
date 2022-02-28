import React from 'react';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  Typography,
  makeStyles,
} from '@material-ui/core';
import type { Theme } from 'src/theme';
import Page from 'src/components/Page';
import AuthLogin from './AuthLogin';
import Header from 'src/components/Header';

const background = "/static/images/background.jpg";
const icon= "/static/images/react.png";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background:`url(${background}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  icon: {
    height: 30,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  cardContainer: {
    paddingBottom: 40,
    paddingTop: 40,
  },
  cardContent: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    minHeight: 400
  },
  cardContentContainer:{
    background: 'rgba(60,60,60,0.2);',
    borderRadius: 8
  },
  currentIcon: {
    height: 40,
    '& > img': {
      width: 'auto',
      maxHeight: '100%'
    }
  }
}));

const LoginView: FC = () => {
  const classes = useStyles();
  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Container
        className={classes.cardContainer}
        maxWidth="sm"
      >
        <Box
          mb={3}
          display="flex"
          justifyContent="center"
        >
            <Header />
        </Box>
        <Card className={classes.cardContentContainer}>
          <CardContent className={classes.cardContent}>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mb={3}
            >
              <div>
                <Typography
                  color="textPrimary"
                  gutterBottom
                  variant={'h3'}
                >
                  Log in
                </Typography>
              </div>
              <div className={classes.currentIcon}>
                <img
                  alt="Thebe Investments Icon"
                  src={icon}
                />
              </div>
            </Box>
            <Box
              flexGrow={1}
              mt={3}
            >
            <AuthLogin />
            </Box>
            <Box my={3}>
              <Divider />
            </Box>
            <Link
              component={RouterLink}
              to="/register"
              variant="body2"
              color="textSecondary"
            >
              Create new account
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default LoginView;
