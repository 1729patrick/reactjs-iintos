import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import LockIcon from '@material-ui/icons/Lock';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
import People from '@material-ui/icons/People';
// core components
import { withRouter, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import Header from '~/components/Header/Header';
import HeaderLinks from '~/components/Header/HeaderLinks';
import Footer from '~/components/Footer/Footer';
import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import Button from '~/components/CustomButtons/Button';
import Card from '~/components/Card/Card';
import CardBody from '~/components/Card/CardBody';
import CardHeader from '~/components/Card/CardHeader';
import CardFooter from '~/components/Card/CardFooter';
import CustomInput from '~/components/CustomInput/CustomInput';
import api from '~/services/api';
import apiCalendar from '~/services/apiCalendar';
import styles from '~/assets/jss/material-kit-react/views/loginPage';
import { useUserContext } from '~/context/UserContext';
import validationSchema from '~/validations/login';

import image from '~/assets/img/bg7.jpg';

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  // Variables
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
  const { setUser } = React.useCallback(useUserContext(), []);
  setTimeout(function() {
    setCardAnimation('');
  }, 700);

  const submitForm = async credentials => {
    console.log('asdasdasd');
    console.log(credentials);
    try {
      const response = await api.post('/sessions', credentials);
      const { user, token, school } = response.data;

      if (!user.active) {
        return props?.history?.push('/await_verification');
      }

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('school', JSON.stringify(school));
      localStorage.setItem('token', token);

      api.defaults.headers.authorization = `Bearer ${token}`;
      apiCalendar.defaults.headers.userID = user?.email;

      setUser({ user, school, token });
      console.log(response);
      console.log(props.history);
      // props.history.push('/dashboard');
    } catch ({ response }) {
      console.log({ response });
      toast.error(response?.data?.error || 'Invalid credentials');
    }
  };

  // form logic
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: submitForm,
  });
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header absolute color="transparent" {...rest} />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form onSubmit={formik.handleSubmit} className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: 'email',
                        name: 'email',
                        onChange: formik.handleChange,
                        value: formik.values.email,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                      onChange={formik.handleChange}
                      values={formik.values}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      name="password"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: 'password',
                        name: 'password',
                        onChange: formik.handleChange,
                        value: formik.values.password,
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: 'off',
                      }}
                      onChange={formik.handleChange}
                      values={formik.values}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" color="primary" size="lg">
                      Login
                    </Button>
                  </CardFooter>
                  <CardFooter className={classes.cardFooter}>
                    <p>
                      Don't have account?{' '}
                      <Link to="signup">Create your account</Link>
                    </p>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
