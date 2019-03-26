import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Layout from '../../container/Layout/Layout';
import Spinner from '../../components/Spinner/Spinner';
import ProfilePosts from '../../components/ProfilePosts/ProfilePosts';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import classes from './Profile.module.css';

import * as action from '../../store/actions/index';

class Profile extends Component {
  state = {
    status: {
      value: '',
    },
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      this.props.onFetchProfile(token);
    }
  }

  statusChangeHandler = (id, value) => {
    this.setState({
      status: {
        value: value,
      },
    });
  };

  setStatusHandler = () => {
    const status = { status: this.state.status.value };
    const token = this.props.token;
    this.props.onSetStatus(status, token);
  };

  componentDidUpdate(prevProps) {
    const { token } = this.props;
    if (token !== prevProps.token) {
      this.props.onFetchProfile(token);
    }
  }

  render() {
    let content = <Spinner />;

    if (this.props.profile && this.props.profilePosts) {
      content = (
        <Fragment>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
          <h2>Profile</h2>
          <p className={classes.ProfileTitle}>
            Name
            <span className={classes.ProfileData}>
              {this.props.profile.name}
            </span>
          </p>

          <p className={classes.ProfileTitle}>
            E-Mail
            <span className={classes.ProfileData}>
              {this.props.profile.email}
            </span>
          </p>

          <Input
            label="Set your status"
            value={this.state.status.value}
            id="status"
            type="text"
            control="input"
            onChange={this.statusChangeHandler.bind(this)}
          />
          <Button onClick={this.setStatusHandler.bind(this)}>Save</Button>

          <h3>Your Posts</h3>
          {this.props.profilePosts.length > 0 ? (
            <ProfilePosts posts={this.props.profilePosts} />
          ) : (
            <p>No Posts found!</p>
          )}
        </Fragment>
      );
    }

    return (
      <Layout>
        <div className={classes.Container}>{content}</div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    profile: state.user.user,
    profilePosts: state.user.posts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetStatus: (status, token) => dispatch(action.setStatus(status, token)),
    onFetchProfile: token => dispatch(action.fetchProfile(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
