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
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import type { Theme } from 'src/theme';
import Page from 'src/components/Page';
import AuthRegister from './AuthRegister';
import Header from 'src/components/Header';

const icon = "/static/images/react.png";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.background.dark,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  banner: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  bannerChip: {
    marginRight: theme.spacing(2)
  },
  methodIcon: {
    height: 30,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  cardContainer: {
    paddingBottom: 80,
    paddingTop: 80,
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
  currentMethodIcon: {
    height: 40,
    '& > img': {
      width: 'auto',
      maxHeight: '100%'
    }
  }
}));

const RegisterView: FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Page
      className={classes.root}
      title="Register"
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
                  variant={mobileDevice ? 'h5' : 'h2'}
                >
                  Register
                </Typography>
              </div>
              <div className={classes.currentMethodIcon}>
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
            <AuthRegister />
            </Box>
            <Box my={3}>
              <Divider />
            </Box>
            <Link
              component={RouterLink}
              to="/login"
              variant="body2"
              color="textSecondary"
            >
              Having an account
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default RegisterView;
