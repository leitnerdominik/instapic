/* eslint-disable no-underscore-dangle */
import React from 'react';

import Post from './Post/Post';
import classes from './Posts.module.css';

const posts = ({ postsData, deletePost, editPost, likePost, sharePost }) => {
  const postsArr = postsData.map(post => (
    <Post
      postData={post}
      key={post._id}
      deletePost={deletePost}
      likePost={likePost}
      sharePost={sharePost}
      editPost={editPost}
    />
  ));
  return <div className={classes.Posts}>{postsArr}</div>;
};

export default posts;
