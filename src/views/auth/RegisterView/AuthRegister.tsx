import React from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  makeStyles
} from '@material-ui/core';
import type { Theme } from 'src/theme';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

interface AuthRegisterProps {
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  googleButton: {
    backgroundColor: theme.palette.common.white
  },
  providerIcon: {
    marginRight: theme.spacing(2)
  },
  divider: {
    flexGrow: 1
  },
  dividerText: {
    margin: theme.spacing(2)
  }
}));

const AuthRegister: FC<AuthRegisterProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const { createUserWithEmailAndPassword } = useAuth() as any;
  const isMountedRef = useIsMountedRef();

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          passwordConfirmation: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email address').max(255).required('Email Address is required'),
          password: Yup.string().min(7).max(255).required('Password is required'),
          passwordConfirmation: Yup.string().required('Confirm Password is required')
                                  .oneOf([Yup.ref('password'), null], 'Passwords do not match')
        })}
        onSubmit={async (values, {
          setErrors,
          setStatus,
          setSubmitting
        }) => {
          try {
            await createUserWithEmailAndPassword(values.email, values.password);

            if (isMountedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            if (isMountedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form
            noValidate
            className={clsx(classes.root, className)}
            onSubmit={handleSubmit}
            {...rest}
          >
            <TextField
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
              variant="outlined"
            />
            
            <TextField
              error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
              fullWidth
              helperText={touched.passwordConfirmation && errors.passwordConfirmation}
              label="Confirm Password"
              margin="normal"
              name="passwordConfirmation"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.passwordConfirmation}
              variant="outlined"
            />
            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>
                  {errors.submit}
                </FormHelperText>
              </Box>
            )}
            <Box mt={2}>
              <Button
                color="secondary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Register
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

AuthRegister.propTypes = {
  className: PropTypes.string
};

export default AuthRegister;
