import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Layout from '../../container/Layout/Layout';
import Auth from '../../components/Auth/Auth';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import Spinner from '../../components/Spinner/Spinner';
import Logo from '../../components/Logo/Logo';

import validationSchema from '../../util/is-valid';

import classes from './Login.module.css';

class Login extends Component {
  state = {
    loginForm: {
      email: {
        label: 'E-Mail',
        value: '',
        id: 'email',
        type: 'email',
        control: 'input',
        valid: false,
        error: '',
      },
      password: {
        label: 'Password',
        value: '',
        id: 'password',
        type: 'password',
        control: 'input',
        valid: false,
        error: '',
      },
    },
  };

  componentDidUpdate() {
    const { isAuth, history } = this.props;
    if (isAuth) {
      history.replace('/');
    }
  }

  inputChangeHandler = (input, value) => {
    this.setState(prevState => {
      const updatedForm = {
        ...prevState.loginForm,
        [input]: {
          ...prevState.loginForm[input],
          value,
        },
      };

      return {
        loginForm: updatedForm,
      };
    });
  };

  inputBlurHandler = input => {
    const { loginForm } = this.state;
    const { value } = loginForm[input];
    validationSchema
      .validateAt(input, { [input]: value })
      .then(valid => {
        const updatedLoginForm = {
          ...loginForm,
          [input]: {
            ...loginForm[input],
            valid: true,
            error: '',
          },
        };

        this.setState({ loginForm: updatedLoginForm });
      })
      .catch(err => {
        const errorLoginForm = {
          ...loginForm,
          [input]: {
            ...loginForm[input],
            valid: false,
            error: err.message,
          },
        };

        this.setState({ loginForm: errorLoginForm });
      });
  };

  checkForm = event => {
    event.preventDefault();

    const { loginForm } = this.state;
    const { onLogin } = this.props;

    const prepData = {
      email: loginForm.email.value,
      password: loginForm.password.value,
    };

    onLogin(event, prepData);
  };

  render() {
    const { loginForm } = this.state;
    const { loading } = this.props;

    const inputs = [];

    Object.keys(loginForm).forEach(input => {
      inputs.push(
        <Input
          label={loginForm[input].label}
          value={loginForm[input].value}
          key={loginForm[input].id}
          id={loginForm[input].id}
          type={loginForm[input].type}
          errorMessage={loginForm[input].error}
          valid={loginForm[input].valid}
          touched={loginForm[input].touched}
          control={loginForm[input].control}
          onChange={this.inputChangeHandler}
          onBlur={this.inputBlurHandler}
        />,
      );
    });

    return (
      <Layout>
        <Auth>
          <ToastContainer position="top-center" />
          <Form onSubmit={event => this.checkForm(event)}>
            <div>
              <Logo />
            </div>
            <h3>Login</h3>
            {inputs}
            {loading ? <Spinner /> : <Button type="submit">Login</Button>}
            <p className={classes.SignUp}>
              {'New to Instapic? '}
              <Link to="/signup">SIGN UP</Link>
            </p>
          </Form>
        </Auth>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default withRouter(connect(mapStateToProps)(Login));
