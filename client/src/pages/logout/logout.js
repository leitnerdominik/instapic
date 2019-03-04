import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../../components/Modal/Modal';
import Layout from '../../container/Layout/Layout';
import * as actions from '../../store/actions/index';

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {

    if (!this.props.isAuth) {
      setTimeout(() => {
        this.props.history.replace('/');
      }, 3000)
    }

    return (
      <Layout>
        <Modal>
          <div>Logged out. <br/> You will be redirected...</div>
        </Modal>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
