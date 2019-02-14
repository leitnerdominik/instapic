import React, { Component } from 'react';

import Layout from '../../components/Layout/Layout';
import Auth from '../../components/Auth/Auth';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Error from '../../components/Error/Error';
import Form from '../../components/Form/Form';

import { validationSchema } from '../../util/is-valid';

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
        error: '',
      },
      name: {
        label: 'Name',
        value: '',
        id: 'name',
        type: 'text',
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
      passwordConfirm: {
        label: 'Confirm Password',
        value: '',
        id: 'passwordConfirm',
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

    validationSchema
      .validateAt(input, { [input]: value })
      .then(() => {
        const updatedSignUpForm = {
          ...this.state.signupform,
          [input]: {
            ...this.state.signupform[input],
            valid: true,
            error: '',
          },
        };
        this.setState({ signupform: updatedSignUpForm });
      })
      .catch(err => {
        const errorSignUpForm = {
          ...this.state.signupform,
          [input]: {
            ...this.state.signupform[input],
            valid: false,
            error: err.message,
          },
        };
        this.setState({ signupform: errorSignUpForm });
      });
  };

  checkForm = event => {
    event.preventDefault();
    const inputValues = {};
    for (let inputKey in this.state.signupform) {
      inputValues[inputKey] = this.state.signupform[inputKey].value;
    }

    validationSchema.isValid(inputValues).then(validity => {
      this.setState({ formIsValid: validity });
    });
  };

  render() {
    const { signupform, formIsValid } = this.state;

    let inputs = [];
    for (let input in signupform) {
      inputs.push(
        <Input
          label={signupform[input].label}
          value={signupform[input].value}
          key={signupform[input].id}
          id={signupform[input].id}
          type={signupform[input].type}
          errorMessage={signupform[input].error}
          valid={signupform[input].valid}
          touched={signupform[input].touched}
          control={signupform[input].control}
          onChange={this.inputChangeHandler}
          onBlur={this.inputBlurHandler}
        />
      );
    }

    let wrongForm = null;

    if (this.props.error) {
      wrongForm = <Error>{this.props.error.message}</Error>;
    } else if (formIsValid === false) {
      wrongForm = <Error>Verification failed. Please try again.</Error>;
    }

    const prepData = {
      email: signupform.email.value,
      name: signupform.name.value,
      password: signupform.password.value,
      passwordConfirm: signupform.passwordConfirm.value,
    };

    return (
      <Layout>
        <Auth>
          <Form onSubmit={event => this.props.onSignUp(event, prepData)}>
            {wrongForm}
            {inputs}
            <Button type="submit">Sign Up</Button>
          </Form>
        </Auth>
      </Layout>
    );
  }
}

export default SignUp;
