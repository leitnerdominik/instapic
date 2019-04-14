/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from '../../Image/Image';
import Button from '../../Button/Button';
import { clientUrl, serverUrl } from '../../../config.json';

import classes from './Post.module.css';

const post = props => {
  const { postData, editPost, deletePost, likePost, sharePost } = props;

  const currentUserId = localStorage.getItem('userId');
  let hearthColor = 'black';
  if (postData.likedUser.includes(currentUserId)) {
    hearthColor = 'red';
  }

  const maxDescriptionLength = 100;
  let description = postData.description.slice(0, maxDescriptionLength);
  console.log(description.length);

  if (description.length === 100) {
    description = description.concat('...');
  }

  let showPostOptions = null;
  if (postData.creator._id === currentUserId) {
    showPostOptions = (
      <div className={classes.OptionsContainer}>
        <div className={classes.ButtonContainer}>
          <Button onClick={() => editPost(postData._id)}>Edit</Button>
          <Button design="cancel" onClick={() => deletePost(postData._id)}>
            {'Delete'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <article className={classes.Container}>
      <div className={classes.Header}>
        <div className={classes.ProfilePhoto}>
          <Image imgUrl={serverUrl + postData.creator.photoUrl} />
        </div>
        <span>{postData.creator.name}</span>
        <Link className={classes.Title} to={`post/${postData._id}`}>
          <h2>{postData.title}</h2>
        </Link>
      </div>
      <div className={classes.ImageContainer}>
        <Image imgUrl={serverUrl + postData.imgUrl} />
      </div>
      <div className={classes.Options}>
        <Button
          onClick={event => likePost(event, postData._id)}
          design="transparent"
          tooltip="Like Post"
        >
          <FontAwesomeIcon
            className={classes.Heart}
            style={{
              color: hearthColor,
            }}
            icon={['far', 'heart']}
            size="2x"
          />
        </Button>
        <CopyToClipboard
          onCopy={sharePost}
          text={`${clientUrl}post/${postData._id}`}
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
        <span className={classes.Likes}>
          {postData.likes}
          {postData.likes === 1 ? ' like' : ' likes'}
        </span>
      </div>
      <div className={classes.Text}>{description}</div>
      {showPostOptions}
    </article>
  );
};

export default post;
