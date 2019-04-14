import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Layout from '../../container/Layout/Layout';
import Spinner from '../../components/Spinner/Spinner';
import ProfilePosts from '../../components/ProfilePosts/ProfilePosts';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import Image from '../../components/Image/Image';
import { serverUrl } from '../../config.json';

import generateBase64FromImage from '../../util/image';

import classes from './Profile.module.css';

import * as action from '../../store/actions/index';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imagePreview: null,
      photo: null,
    };
  }

  componentWillMount() {
    const { token, onFetchProfile } = this.props;
    if (token) {
      onFetchProfile(token);
    }
  }

  // componentDidMount() {
  //   const { profile } = this.props;
  //   const { status } = this.state;

  //   if (profile.status !== status.value) {
  //     console.log(profile, status);
  //     this.setState({ status: { value: profile.status } });
  //   }
  // }

  componentDidUpdate(prevProps) {
    const { token, onFetchProfile } = this.props;
    if (token !== prevProps.token) {
      onFetchProfile(token);
    }
  }

  // statusChangeHandler = (id, value) => {
  //   this.setState({
  //     status: {
  //       value,
  //     },
  //   });
  // };

  // setStatusHandler = () => {
  //   const { status } = this.state;
  //   const { token, onSetStatus } = this.props;
  //   onSetStatus(status.value, token);
  // };

  setProfilePhoto = (id, value, files) => {
    if (files.length > 0) {
      generateBase64FromImage(files[0])
        .then(b64 => {
          this.setState({ imagePreview: b64, photo: files[0] });
        })
        .catch(() => {
          this.setState({ imagePreview: null, photo: null });
        });
    }
  };

  saveProfile = () => {
    const { photo } = this.state;
    const { token, onSaveProfile, profile } = this.props;
    const profileObj = {
      photo,
      status: profile.status,
    };
    onSaveProfile(profileObj, token);
  };

  render() {
    const {
      profile,
      profilePosts,
      loadingProfile,
      loadingSaveProfile,
      profileError,
      onProfileReset,
      onChangeStatus,
    } = this.props;
    const { imagePreview } = this.state;

    let content = null;
    let saveProfile = null;

    if (loadingSaveProfile) {
      saveProfile = <Spinner />;
    } else {
      saveProfile = <Button onClick={this.saveProfile}>Save</Button>;
    }

    if (!loadingProfile && profile.name) {
      let profilePhoto = serverUrl + profile.photoUrl;
      if (imagePreview) {
        profilePhoto = imagePreview;
      }
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
          <ErrorModal error={profileError} close={onProfileReset} />
          <h2>Profile</h2>
          <p className={classes.ProfileTitle}>
            Name
            <span className={classes.ProfileData}>{profile.name}</span>
          </p>
          <div className={classes.ProfileTitle}>
            Profile Picture
            <div className={classes.ProfilePhoto}>
              <Image imgUrl={profilePhoto} />
              <Input
                control="filepicker"
                type="file"
                id="image"
                onChange={this.setProfilePhoto}
              />
            </div>
          </div>
          <p className={classes.ProfileTitle}>
            E-Mail
            <span className={classes.ProfileData}>{profile.email}</span>
          </p>

          <Input
            label="Set your status"
            value={profile.status}
            id="status"
            type="text"
            control="input"
            onChange={(id, value) => onChangeStatus(value)}
          />
          {saveProfile}

          <h3>Your Posts</h3>
          {profilePosts ? (
            <ProfilePosts posts={profilePosts} />
          ) : (
            <p>No Posts found!</p>
          )}
        </Fragment>
      );
    } else {
      content = <Spinner />;
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
  profile: state.user.user,
  profilePosts: state.user.posts,
  loadingProfile: state.user.loadingProfile,
  loadingSaveProfile: state.user.loadingSaveProfile,
  profileError: state.user.error,
});

const mapDispatchToProps = dispatch => ({
  onSaveProfile: (photo, status, token) =>
    dispatch(action.saveProfile(photo, status, token)),
  onFetchProfile: token => dispatch(action.fetchProfile(token)),
  onProfileReset: () => dispatch(action.profileReset()),
  onChangeStatus: value => dispatch(action.statusChangeHandler(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
