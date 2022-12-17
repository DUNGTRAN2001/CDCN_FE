import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { toast } from "react-toastify";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showPasswordConfrim: false,
      errMessage: "",
    };
  }
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkSimilarPassword = () => {
    let isValid = true;
    if (this.state.password === this.state.confirmPassword) {
      return isValid;
    } else {
      toast.error("Password and confirm password are incorrect");
      return (isValid = false);
    }
  };
  handleRegister = async () => {
    let checkPassword = this.checkSimilarPassword();
    if (checkPassword) {
      this.props.registerUserRedux({
        email: this.state.userName,
        password: this.state.password,
      });
      if (this.props.history) {
        this.props.history.push("/login");
      }
    } else {
      this.setState({
        confirmPassword: "",
      });
    }
  };
  handleShowHidePassWord = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };
  handleShowHidePassWordConfirm = () => {
    this.setState({
      showPasswordConfrim: !this.state.showPasswordConfrim,
    });
  };
  handleRedirectLogin = () => {
    if (this.props.history) {
      this.props.history.push("/login");
    }
  };
  render() {
    //   JSX
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 login-text">Register</div>
            <div className="col-12 form-group login-input">
              <label htmlFor="">Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                value={this.state.username}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "userName")
                }
              />
            </div>
            <div className="col-12 form-group login-input">
              <label htmlFor="">Password</label>
              <div className="custom-input-password">
                <input
                  type={this.state.showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "password")
                  }
                />
                <span onClick={() => this.handleShowHidePassWord()}>
                  <i
                    className={
                      this.state.showPassword
                        ? "far fa-eye"
                        : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12 form-group login-input">
              <label htmlFor="">Confirm Password</label>
              <div className="custom-input-password">
                <input
                  type={this.state.showPasswordConfrim ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password confirm"
                  value={this.state.confirmPassword}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "confirmPassword")
                  }
                />
                <span onClick={() => this.handleShowHidePassWordConfirm()}>
                  <i
                    className={
                      this.state.showPasswordConfrim
                        ? "far fa-eye"
                        : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => this.handleRegister()}
              >
                Register
              </button>
            </div>
            <div className="col-12">
              <span
                className="redirect-register"
                onClick={() => this.handleRedirectLogin()}
              >
                Login?
              </span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login">Or Login with :</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    registerUserRedux: (data) => dispatch(actions.registerUserService(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
