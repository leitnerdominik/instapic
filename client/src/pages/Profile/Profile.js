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
  constructor(props) {
    super(props);

    const { profileStatus } = this.props;

    this.state = {
      status: {
        value: profileStatus || '',
      },
    };
  }

  componentDidMount() {
    const { token, onFetchProfile } = this.props;
    if (token) {
      onFetchProfile(token);
    }
  }

  componentDidUpdate(prevProps) {
    const { token, onFetchProfile } = this.props;
    if (token !== prevProps.token) {
      onFetchProfile(token);
    }
  }

  statusChangeHandler = (id, value) => {
    this.setState({
      status: {
        value,
      },
    });
  };

  setStatusHandler = () => {
    const { status } = this.state;
    const { token, onSetStatus } = this.props;
    onSetStatus(status.value, token);
  };

  render() {
    const {
      profileName,
      profileEmail,
      profilePosts,
      loadingProfile,
      loadingStatus,
    } = this.props;
    const { status } = this.state;

    // let content = <Spinner />; // TODO Spinner wirklich nur anzeigen, wenn etwas am laden ist!

    let content = null;
    let statusButton = null;

    if (loadingStatus) {
      statusButton = <Spinner />;
    } else {
      statusButton = <Button onClick={this.setStatusHandler}>Save</Button>;
    }

    if (loadingProfile) {
      content = <Spinner />;
    } else if (profileName && profileEmail) {
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
            <span className={classes.ProfileData}>{profileName}</span>
          </p>

          <p className={classes.ProfileTitle}>
            E-Mail
            <span className={classes.ProfileData}>{profileEmail}</span>
          </p>

          <Input
            label="Set your status"
            value={status.value}
            id="status"
            type="text"
            control="input"
            onChange={this.statusChangeHandler}
            // ich hab bind geloescht!! this.statusChangeHandler.bind(this)
          />
          {statusButton}

          <h3>Your Posts</h3>
          {profilePosts.length > 0 ? (
            <ProfilePosts posts={profilePosts} />
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

const mapStateToProps = state => ({
  token: state.auth.token,
  profileName: state.user.name,
  profileEmail: state.user.email,
  profileStatus: state.user.status,
  profilePosts: state.user.posts,
  loadingProfile: state.user.loadingProfile,
  loadingStatus: state.user.loadingStatus,
});

const mapDispatchToProps = dispatch => ({
  onSetStatus: (status, token) => dispatch(action.setStatus(status, token)),
  onFetchProfile: token => dispatch(action.fetchProfile(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
