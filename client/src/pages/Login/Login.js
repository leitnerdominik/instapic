import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Layout from '../../container/Layout/Layout';
import Auth from '../../components/Auth/Auth';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Error from '../../components/Error/Error';
import Form from '../../components/Form/Form';
import Spinner from '../../components/Spinner/Spinner';

import { validationSchema } from '../../util/is-valid';

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
    formIsValid: null,
  };

  componentDidUpdate() {
    if (this.props.isAuth) {
      this.props.history.replace('/');
    }
  }

  inputChangeHandler = (input, value) => {
    this.setState(prevState => {
      const updatedForm = {
        ...prevState.loginForm,
        [input]: {
          ...prevState.loginForm[input],
          value: value,
        },
      };

      return {
        loginForm: updatedForm,
      };
    });
  };

  inputBlurHandler = input => {
    const value = this.state.loginForm[input].value;
    validationSchema
      .validateAt(input, { [input]: value })
      .then(valid => {
        const updatedLoginForm = {
          ...this.state.loginForm,
          [input]: {
            ...this.state.loginForm[input],
            valid: true,
            error: '',
          },
        };

        this.setState({ loginForm: updatedLoginForm });
      })
      .catch(err => {
        const errorLoginForm = {
          ...this.state.loginForm,
          [input]: {
            ...this.state.loginForm[input],
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

    const prepData = {
      email: loginForm.email.value,
      password: loginForm.password.value,
    };

    this.props.onLogin(event, prepData);
  };

  render() {
    const { loginForm, formIsValid } = this.state;

    let inputs = [];

    for (let input in loginForm) {
      inputs.push(
        <Input
          label={loginForm[input].label}
          value={loginForm[input].value}
          key={loginForm[input].id}
          id={loginForm[input].id}
          type={loginForm[input].type}
          valid={loginForm[input].valid}
          errorMessage={loginForm[input].error}
          control={loginForm[input].control}
          onChange={this.inputChangeHandler}
          onBlur={this.inputBlurHandler}
        />
      );
    }

    let wrongForm = null;

    if (this.props.error) {
      wrongForm = <Error>{this.props.error}</Error>;
    } else if (formIsValid === false) {
      wrongForm = <Error />;
    }

    return (
      <Layout>
        <Auth>
          <Form onSubmit={event => this.checkForm(event)}>
            {wrongForm}
            {inputs}
            {this.props.loading ? <Spinner /> : <Button type="submit">Login</Button>}
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
