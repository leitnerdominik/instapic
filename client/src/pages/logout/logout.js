import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../../components/Modal/Modal';
import Layout from '../../container/Layout/Layout';
import * as actions from '../../store/actions/index';

class Logout extends Component {
  componentDidMount() {
    const { onLogout, onUserLogout } = this.props;
    onLogout();
    onUserLogout();
  }

  render() {
    const { isAuth, history } = this.props;
    if (!isAuth) {
      setTimeout(() => {
        history.replace('/');
      }, 3000);
    }

    return (
      <Layout>
        <Modal>
          <div>
            Logged out.
            <br />
            You will be redirected...
          </div>
        </Modal>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actions.logout()),
  onUserLogout: () => dispatch(actions.userLogout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout);
