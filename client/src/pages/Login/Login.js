import React, { Component } from 'react';

import Layout from '../../components/Layout/Layout';
import Auth from '../../components/Auth/Auth';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Error from '../../components/Error/Error';
import Form from '../../components/Form/Form';

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
          onChange={this.inputChangeHandler}
          onBlur={this.inputBlurHandler}
        />
      );
    }

    let wrongForm = null;
    if (formIsValid === false) {
      wrongForm = <Error />;
    }

    return (
      <Layout>
        <Auth>
          <Form onSubmit={this.checkForm}>
            {wrongForm}
            {inputs}
            <Button type="submit">Login</Button>
          </Form>
        </Auth>
      </Layout>
    );
  }
}

export default Login;
