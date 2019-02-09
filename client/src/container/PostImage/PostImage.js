import React, { Component } from 'react';

import Modal from '../../components/Modal/Modal';
import Input from '../../components/Input/Input';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';

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
        />
      );
    }

    return (
      <Modal close={close}>
        <h2>Upload Image</h2>
        <Form>
          {inputs}
          <div className={classes.ButtonContainer}>
            <Button type='cancel' onClick={close}>Cancel</Button>
            <Button type='submit'>Save</Button>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default PostImage;
