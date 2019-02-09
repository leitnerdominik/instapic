import React from 'react';

import classes from './Form.module.css';

const form = ({ children }) => <form className={classes.Form}>{children}</form>;

export default form;
