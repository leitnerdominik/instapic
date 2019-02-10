import React from 'react';

import classes from './Form.module.css';

const form = ({ children, onSubmit }) => <form onSubmit={onSubmit} className={classes.Form}>{children}</form>;

export default form;
