/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from '../Image/Image';
import Button from '../Button/Button';
import { host } from '../../config.json';

import classes from './ImageList.module.css';

const imageList = props => {
  const { posts, editPost, deletePost, likePost, sharePost, isAuth } = props;
  const maxDescriptionLength = 100;
  const img = images.map(image => {

    const currentUserId = localStorage.getItem('userId');

    let hearthColor = 'black';
    if (image.likedUser.includes(currentUserId)) {
      hearthColor = 'red';
    }

    let changePostButtons = null;
    if (isAuth) {
      changePostButtons = (
        <div className={classes.ButtonContainer}>
          <Button design="cancel" onClick={() => deletePost(image._id)}>
            {'Delete'}
          </Button>
          <Button onClick={() => editPost(image._id)}>Edit</Button>
        </div>
      );
    } else {
      hearthColor = 'blue';
    }

    return (
      <div key={image._id} className={classes.Container}>
        <Link className={classes.Title} to={`post/${image._id}`}>
          <h2>{image.title}</h2>
        </Link>
        <div className={classes.ImageContainer}>
          <Image imgUrl={host + image.imgUrl} />
        </div>
        <p>{description}</p>
        <div className={classes.OptionsContainer}>
          <div className={classes.Options}>
            <Button
              onClick={event => likePost(event, image._id)}
              design="transparent"
              tooltip="Like Post"
            >
              <span className={classes.Likes}>{image.likes}</span>
              <FontAwesomeIcon
                style={{
                  color: hearthColor,
                }}
                icon={['far', 'heart']}
                size="2x"
              />
            </Button>
            <CopyToClipboard
              onCopy={sharePost}
              text={`${host}post/${image._id}`}
            >
              <Button tooltip="Copy Post-Link" design="transparent">
                <FontAwesomeIcon
                  style={{
                    color: 'blue',
                  }}
                  icon={['far', 'copy']}
                  size="2x"
                />
              </Button>
            </CopyToClipboard>
          </div>
          {changePostButtons}
        </div>
      </div>
    );
  });
  return <div className={classes.ImageList}>{img}</div>;
};

export default imageList;
