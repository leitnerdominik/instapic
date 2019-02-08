import React, { Component } from 'react';

import Layout from '../../components/Layout/Layout';
import Auth from '../../components/Auth/Auth';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import { checkForm, validationSchema } from '../../util/is-valid';

class Login extends Component {
  state = {
    loginForm: {
      email: {
        label: 'E-Mail',
        value: '',
        id: 'email',
        type: 'email',
        control: 'input',
        error: '',
        required: true,
      },
      password: {
        label: 'Password',
        value: '',
        id: 'password',
        type: 'password',
        control: 'input',
        error: '',
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
    validationSchema
      .validateAt('password', { password: 'kennwort'})
      .then(valid => {
        console.log(valid);
      })
      .catch(err => {
        console.log(err);
      });

    // validationSchema.isValid({ [input]: value }).then(isFieldValid => {
    //   console.log('isFieldValid: ', isFieldValid);
    //   const updatedloginForm = {
    //     ...this.state.loginForm,
    //     [input]: {
    //       ...this.state.loginForm[input],
    //       valid: isFieldValid,
    //     },
    //   };
    //   const isFormValid = this.checkForm(input, value);
    //   isFormValid
    //     .then(isValid => {
    //       console.log(isValid);
    //       this.setState({
    //         loginForm: updatedloginForm,
    //         formIsValid: isValid,
    //       });
    //     })
    //     .catch(err => console.log(err));
    // });
  };

  checkForm = (input, value) => {
    const inputValue = {
      input: value,
    };
    return validationSchema
      .validate(inputValue)
      .then(() => {
        return true;
      })
      .catch(err => {
        return false;
      });
  };

  // checkForm = event => {
  //   event.preventDefault();
  //   const inputValues = {};
  //   for (let inputKey in this.state.loginForm) {
  //     inputValues[inputKey] = this.state.loginForm[inputKey].value;
  //   }

  //   console.log(inputValues);
  //   validationSchema
  //     .validate(inputValues)
  //     .then(valid => {
  //       console.log('success: ', valid);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       this.setState(prevState => {
  //         const updateForm = {
  //           ...prevState.loginForm,
  //           [err.path]: {
  //             ...prevState.loginForm[err.path],
  //             error: err.message,
  //           },
  //         };

  //         return {
  //           loginForm: updateForm
  //         }
  //       });
  //     });
  // };

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
          errorMessage={loginForm[input].error}
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
            <Button onClick={this.checkForm}>Login</Button>
          </form>
        </Auth>
      </Layout>
    );
  }
}

export default Login;
