import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../../components/Modal/Modal';
import Input from '../../components/Input/Input';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import Image from '../../components/Image/Image';
import Spinner from '../../components/Spinner/Spinner';

import { host } from '../../config.json';
import * as action from '../../store/actions/index';

import { generateBase64FromImage } from '../../util/image';

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
          control: 'filepicker',
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
      imagePreview: null,
      formIsValid: null,
    };
  }

  componentWillMount() {
    if (this.props.editPost && this.props.isEditing) {
      const editPost = this.props.editPost;
      console.log('EditPost: ', this.props.editPost);

      this.setState(prevState => {
        const updateForm = {
          ...prevState.postImg,
          title: {
            ...prevState.postImg.title,
            value: editPost.title,
          },
          image: {
            ...prevState.postImg.image,
            value: editPost.imgUrl,
          },
          description: {
            ...prevState.postImg.description,
            value: editPost.description,
          },
        };

        return { postImg: updateForm, imagePreview: host + editPost.imgUrl };
      });
    }
  }

  inputChangeHandler = (input, value, files) => {
    if (files) {
      generateBase64FromImage(files[0])
        .then(b64 => {
          this.setState({ imagePreview: b64 });
        })
        .catch(error => {
          this.setState({ imagePreview: null });
        });
    }
    this.setState(prevState => {
      const updateForm = {
        ...prevState.postImg,
        [input]: {
          ...prevState.postImg[input],
          value: files ? files[0] : value,
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
    if (this.props.isEditing) {
      const editPostData = {
        ...postData,
        _id: this.props.editPost._id,
      };
      console.log(editPostData);
      this.props.onEditPost(editPostData, this.props.token);
    } else {
      this.props.onAddPost(postData, this.props.token);
    }
  };

  render() {
    const { toggleShow } = this.props;
    const { postImg } = this.state;

    return (
      <Modal close={toggleShow}>
        <h2>Upload Image</h2>
        <Form>
          <Input
            label={postImg.title.label}
            value={postImg.title.value}
            key={postImg.title.id}
            id={postImg.title.id}
            type={postImg.title.type}
            control={postImg.title.control}
            valid={postImg.title.valid}
            errorMessage={postImg.title.error}
            onChange={this.inputChangeHandler}
          />
          <Input
            label={postImg.image.label}
            value={postImg.image.value}
            key={postImg.image.id}
            id={postImg.image.id}
            type={postImg.image.type}
            control={postImg.image.control}
            valid={postImg.image.valid}
            errorMessage={postImg.image.error}
            onChange={this.inputChangeHandler}
          />
          {!this.state.imagePreview && <p>Please choose an image.</p>}
          {this.state.imagePreview && (
            <Image
              containerWidth="100px"
              containerHeight="100px"
              imgUrl={this.state.imagePreview}
            />
          )}
          <Input
            label={postImg.description.label}
            value={postImg.description.value}
            key={postImg.description.id}
            id={postImg.description.id}
            type={postImg.description.type}
            control={postImg.description.control}
            valid={postImg.description.valid}
            errorMessage={postImg.description.error}
            onChange={this.inputChangeHandler}
          />
          <div className={classes.ButtonContainer}>
            <Button design="cancel" onClick={toggleShow}>
              Cancel
            </Button>
            {this.props.loading ? (
              <Spinner />
            ) : (
              <Button
                design="submit"
                onClick={this.addPostHandler}
                type="submit"
              >
                Save
              </Button>
            )}
          </div>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    editPost: state.post.editPost,
    isEditing: state.post.isEditing,
    loading: state.post.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: (postData, token) => dispatch(action.addPost(postData, token)),
    onEditPost: (postData, token) => dispatch(action.editPost(postData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostImage);
