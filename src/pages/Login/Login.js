import React, { Component } from 'react';

import Layout from '../../components/Layout/Layout';
import Auth from '../../components/Auth/Auth';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import validation from '../../util/is-valid';

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
        touched: false,
        required: true,
      },
      password: {
        label: 'Password',
        value: '',
        id: 'password',
        type: 'password',
        control: 'input',
        valid: false,
        touched: false,
        required: true,
      },
    },
    formIsValid: false,
  };

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

    validation
      .validate({ [input]: value })
      .then(() => {
        const updatedloginForm = {
          ...this.state.loginForm,
          [input]: {
            ...this.state.loginForm[input],
            valid: true,
            errorMessage: '',
          },
        };
        this.isFormValid();
        this.setState({ loginForm: updatedloginForm });
      })
      .catch(err => {
        const errorloginForm = {
          ...this.state.loginForm,
          [input]: {
            ...this.state.loginForm[input],
            valid: false,
            errorMessage: err.message,
          },
        };
        this.setState({ loginForm: errorloginForm });
      });
  };

  render() {
    const { loginForm } = this.state;

    let inputs = [];

    for (let input in loginForm) {
      inputs.push(
        <Input
          label={loginForm[input].label}
          value={loginForm[input].value}
          key={loginForm[input].id}
          id={loginForm[input].id}
          type={loginForm[input].type}
          errorMessage={loginForm[input].errorMessage}
          valid={loginForm[input].valid}
          touched={loginForm[input].touched}
          control={loginForm[input].control}
          required={loginForm[input].required}
          onChange={this.inputChangeHandler}
          onBlur={this.inputBlurHandler}
        />
      );
    }

    return (
      <Layout>
        <Auth>
          <form>
            {inputs}
            <Button disabled={!this.state.formIsValid}>Login</Button>
          </form>
        </Auth>
      </Layout>
    );
  }
}

export default Login;
