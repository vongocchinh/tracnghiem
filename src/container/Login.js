import React from "react";
import LoginComponent from "./../components/login/Login";
import { connect } from "react-redux";
import * as action from "./../actions/login";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from "react-router-dom";
import { toast } from 'react-toastify';
function Login(props) {

  var { LoginStore, LayoutStore } = props;
  if (LayoutStore) {
    return <Redirect to="/" />;
  }
  if (LoginStore.login_success) {
    props.RESET();
    return <Redirect to="/" />;
  }
  if (LoginStore.login_error) {
    setTimeout(() => {
      toast.dark("Tài khoản của bạn chưa được cung cấp. Đăng nhập lại !!!")
    }, 200);
  }
  const login = (e) => {
    props.LOGIN_USER(e);
  };
  return (
    <>
    <Dialog
        open={LoginStore.login_loading}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogActions>
          <CircularProgress />
        </DialogActions>
      </Dialog>
      <LoginComponent login={login} />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    LoginStore: state.LoginStore,
    LayoutStore: state.LayoutStore,
  };
};
const dispatchToProps = (dispatch, props) => {
  return {
    LOGIN_USER: (e) => {
      dispatch(action.LOGIN_USER(e));
    },
    RESET: () => {
      dispatch(action.RESET());
    },
  };
};
export default connect(mapStateToProps, dispatchToProps)(Login);
