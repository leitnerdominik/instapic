import React from 'react';

import ProfilePost from './ProfilePost/ProfilePost';

import classes from './ProfilePosts.module.css';

const profilePosts = ({ posts }) => {
  return (
    <ul className={classes.ProfilePosts}>
      {posts.map(post => (
        <ProfilePost key={post._id} postId={post._id} title={post.title} />
      ))}
    </ul>
  );
};

export default profilePosts;
