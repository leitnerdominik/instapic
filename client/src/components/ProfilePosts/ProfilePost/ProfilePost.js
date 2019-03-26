import React from 'react';
import { Link } from 'react-router-dom';

import classes from './ProfilePost.module.css';

const profilePost = ({ postId, title }) => {
  return (
    <li className={classes.ProfilePost}>
      <Link to={`post/${postId}`}>
        <span>{title}</span>
      </Link>
    </li>
  );
};

export default profilePost;
