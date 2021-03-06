import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Layout from '../../container/Layout/Layout';
import Auth from '../../components/Auth/Auth';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Error from '../../components/Error/Error';
import Form from '../../components/Form/Form';
import Spinner from '../../components/Spinner/Spinner';
import Logo from '../../components/Logo/Logo';

import validationSchema from '../../util/is-valid';

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
          value,
        },
      };

      return {
        signupform: updatedSignUpForm,
      };
    });
  };

  inputBlurHandler = input => {
    const { signupform } = this.state;
    const { value } = signupform[input];

    validationSchema
      .validateAt(input, { [input]: value })
      .then(() => {
        const updatedSignUpForm = {
          ...signupform,
          [input]: {
            ...signupform[input],
            valid: true,
            error: '',
          },
        };
        this.setState({ signupform: updatedSignUpForm });
      })
      .catch(err => {
        console.log(err);
        const errorSignUpForm = {
          ...signupform,
          [input]: {
            ...signupform[input],
            valid: false,
            error: err.message,
          },
        };
        this.setState({ signupform: errorSignUpForm });
      });
  };

  checkForm = event => {
    event.preventDefault();

    const { signupform } = this.state;
    const { onSignUp, history } = this.props;

    const prepData = {
      email: signupform.email.value,
      name: signupform.name.value,
      password: signupform.password.value,
      passwordConfirm: signupform.passwordConfirm.value,
    };

    if (prepData.password !== prepData.passwordConfirm) {
      this.setState(prevState => {
        const updatedSignUpForm = {
          ...prevState.signupform,
          password: {
            ...prevState.signupform.password,
            error: 'passwords dont match!',
            valid: false,
          },
          passwordConfirm: {
            ...prevState.signupform.passwordConfirm,
            error: 'passwords dont match!',
            valid: false,
          },
        };

        return { signupform: updatedSignUpForm };
      });
    } else {
      onSignUp(event, prepData);
      history.replace('/login');
    }

    // const inputValues = {};
    // for (let inputKey in this.state.signupform) {
    //   inputValues[inputKey] = this.state.signupform[inputKey].value;
    // }

    // validationSchema.isValid(inputValues).then(validity => {
    //   this.setState({ formIsValid: validity });
    // });
  };

  render() {
    const { signupform, formIsValid } = this.state;
    const { loading } = this.props;

    const inputs = [];

    Object.keys(signupform).forEach(input => {
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
        />,
      );
    });

    let wrongForm = null;

    if (formIsValid === false) {
      wrongForm = <Error>Verification failed. Please try again.</Error>;
    }

    return (
      <Layout>
        <Auth>
          <ToastContainer position="top-center" />
          <Form onSubmit={event => this.checkForm(event)}>
            <div>
              <Logo />
            </div>
            <h3>Sign Up</h3>
            {wrongForm}
            {inputs}
            {loading ? <Spinner /> : <Button type="submit">Sign Up</Button>}
          </Form>
        </Auth>
      </Layout>
    );
  }
}

export default SignUp;
