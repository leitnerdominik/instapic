import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../../components/Modal/Modal';
import Input from '../../components/Input/Input';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import * as action from '../../store/actions/index';

import classes from './PostImage.module.css';

class PostImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postImg: {
        title: {
          label: 'Title',
          value: '',
          id: 'title',
          type: 'text',
          control: 'input',
          valid: false,
          error: '',
        },
        image: {
          label: 'Image',
          value: '',
          id: 'image',
          type: 'file',
          control: 'input',
          valid: false,
          error: '',
        },
        description: {
          label: 'Description',
          value: '',
          id: 'description',
          type: 'textarea',
          control: 'textarea',
          valid: false,
          error: '',
        },
      },
      formIsValid: null,
    };
  }

  inputChangeHandler = (input, value) => {
    this.setState(prevState => {
      const updateForm = {
        ...prevState.postImg,
        [input]: {
          ...prevState.postImg[input],
          value: value,
        },
      };

      return {
        postImg: updateForm,
      };
    });
  };

  addPostHandler = event => {
    event.preventDefault();
    const { postImg } = this.state;
    const postData = {
      title: postImg.title.value,
      imgUrl: postImg.image.value,
      description: postImg.description.value,
    };
    console.log(postData.imgUrl)
    this.props.onAddPost(postData, this.props.token);
  };

  render() {
    const { close } = this.props;
    const { postImg } = this.state;

    let inputs = [];
    for (let inputKey in postImg) {
      inputs.push(
        <Input
          label={postImg[inputKey].label}
          value={postImg[inputKey].value}
          key={postImg[inputKey].id}
          id={postImg[inputKey].id}
          type={postImg[inputKey].type}
          control={postImg[inputKey].control}
          valid={postImg[inputKey].valid}
          errorMessage={postImg[inputKey].error}
          onChange={this.inputChangeHandler}
        />
      );
    }

    return (
      <Modal close={close}>
        <h2>Upload Image</h2>
        <Form>
          {inputs}
          <div className={classes.ButtonContainer}>
            <Button design="cancel" onClick={close}>
              Cancel
            </Button>
            <Button design="submit" onClick={this.addPostHandler} type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: (postData, token) => dispatch(action.addPost(postData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostImage);
