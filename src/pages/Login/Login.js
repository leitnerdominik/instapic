import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Layout from '../../components/Layout/Layout';
import Auth from '../../components/Auth/Auth';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import { validationSchema } from '../../util/is-valid';

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
        required: true,
      },
      password: {
        label: 'Password',
        value: '',
        id: 'password',
        type: 'password',
        control: 'input',
        valid: false,
        error: '',
        touched: false,
        required: true,
      },
    },
    formIsValid: null,
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
    const inputValues = {};
    for (let inputKey in this.state.loginForm) {
      inputValues[inputKey] = this.state.loginForm[inputKey].value;
    }

    console.log('InputvaluesObj: ', inputValues);
    validationSchema.isValid(inputValues).then(validity => {
      this.setState({ formIsValid: validity });
    });
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
          required={loginForm[input].required}
          onChange={this.inputChangeHandler}
          onBlur={this.inputBlurHandler}
        />
      );
    }

    let wrongForm = null;
    if (formIsValid === false) {
      wrongForm = (
        <div className={classes.WrongForm}>
          <FontAwesomeIcon icon="exclamation-triangle" />
          <span>Verification failed. Please try again.</span>
        </div>
      );
    }

    return (
      <Layout>
        <Auth>
          <form className={classes.Form}>
            {wrongForm}
            {inputs}
            <Button onClick={this.checkForm}>Login</Button>
          </form>
        </Auth>
      </Layout>
    );
  }
}

export default Login;
