import React, { Component } from 'react';

import Layout from '../../components/Layout/Layout';
import Auth from '../../components/Auth/Auth';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import validation from '../../util/is-valid';

class SignUp extends Component {
  state = {
    signupform: {
      email: {
        label: 'E-Mail',
        value: '',
        id: 'email',
        type: 'email',
        control: 'input',
        valid: false,
        required: true,
        errorMessage: '',
      },
      name: {
        label: 'Name',
        value: '',
        id: 'name',
        type: 'text',
        control: 'input',
        valid: false,
        required: true,
        errorMessage: '',
      },
      password: {
        label: 'Password',
        value: '',
        id: 'password',
        type: 'password',
        control: 'input',
        valid: false,
        required: true,
        errorMessage: '',
      },
      passwordConfirm: {
        label: 'Confirm Password',
        value: '',
        id: 'passwordConfirm',
        type: 'password',
        control: 'input',
        valid: false,
        required: true,
        errorMessage: '',
      },
    },
    formIsValid: false,
  };

  inputChangeHandler = (input, value) => {
    this.setState(prevState => {
      const updatedSignUpForm = {
        ...prevState.signupform,
        [input]: {
          ...prevState.signupform[input],
          value: value,
        },
      };

      return {
        signupform: updatedSignUpForm,
      };
    });
  };

  inputBlurHandler = input => {
    const value = this.state.signupform[input].value;

    validation
      .validate({ [input]: value })
      .then(() => {
        const updatedSignUpForm = {
          ...this.state.signupform,
          [input]: {
            ...this.state.signupform[input],
            valid: true,
            errorMessage: '',
          },
        };
        this.isFormValid();
        this.setState({ signupform: updatedSignUpForm });
      })
      .catch(err => {
        const errorSignUpForm = {
          ...this.state.signupform,
          [input]: {
            ...this.state.signupform[input],
            valid: false,
            errorMessage: err.message,
          },
        };
        this.setState({ signupform: errorSignUpForm });
      });
  };

  isFormValid = () => {
    let valueObj = {};
    for (let inputKey in this.state.signupform) {
      valueObj[inputKey] = this.state.signupform[inputKey].value;
    }
    validation
      .validate(valueObj)
      .then(() => {
        this.setState({ formIsValid: true });
      })
      .catch(err => {
        this.setState({ formIsValid: false})
      });
  };

  render() {
    const { signupform } = this.state;
    let inputs = [];
    for (let input in signupform) {
      inputs.push(
        <Input
          label={signupform[input].label}
          value={signupform[input].value}
          key={signupform[input].id}
          id={signupform[input].id}
          type={signupform[input].type}
          errorMessage={signupform[input].errorMessage}
          valid={signupform[input].valid}
          touched={signupform[input].touched}
          control={signupform[input].control}
          required={signupform[input].required}
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
            <Button disabled={!this.state.formIsValid}>Sign Up</Button>
          </form>
        </Auth>
      </Layout>
    );
  }
}

export default SignUp;
