import React, { Component } from 'react';

import Layout from '../../components/Layout/Layout';
import Auth from '../../components/Auth/Auth';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

class Login extends Component {
  state = {
    form: {
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
        ...prevState.form,
        [input]: {
          ...prevState.form[input],
          value: value,
        },
      };

      // TODO: ueberprufen ob Input gueltig ist

      return {
        form: updatedForm,
      };
    });
  };

  inputBlurHandler = input => {
    this.setState(prevState => {
      const updatedForm = {
        ...prevState.form,
        [input]: {
          ...prevState.form[input],
          touched: true,
        },
      };

      return { form: updatedForm };
    });
  };

  render() {
    const { form } = this.state;

    let inputs = [];

    for (let input in this.state.form) {
      inputs.push(
        <Input
          label={form[input].label}
          value={form[input].value}
          key={form[input].id}
          id={form[input].id}
          type={form[input].type}
          valid={form[input].valid}
          touched={form[input].touched}
          control={form[input].control}
          required={form[input].required}
          onChange={this.inputChangeHandler}
          onBlur={this.inputBlurHandler}
        />
      );
    }

    return (
      <Layout>
        <Auth>
          <form>{inputs}<Button>Login</Button></form>
        </Auth>
      </Layout>
    );
  }
}

export default Login;
