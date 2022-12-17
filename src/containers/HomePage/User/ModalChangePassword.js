import React, { Component } from "react";
import { connect } from "react-redux";
// import "./ModalChangePassword.scss";
import * as actions from "../../../store/actions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";

class ModalChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
    };
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {}
  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleShowHideCurrentPassWord = () => {
    this.setState({
      showCurrentPassword: !this.state.showCurrentPassword,
    });
  };
  handleShowHideNewPassWord = () => {
    this.setState({
      showNewPassword: !this.state.showNewPassword,
    });
  };
  handleShowHideConfirmPassWord = () => {
    this.setState({
      showConfirmPassword: !this.state.showConfirmPassword,
    });
  };
  checkValidatePassword = () => {
    let isCheck = true;
    let { newPassword, confirmPassword } = this.state;
    if (newPassword !== confirmPassword) {
      isCheck = false;
      toast.error("Mật khẩu xác nhận không trùng mật khẩu mới");
    }
    return isCheck;
  };
  handleSavePassword = () => {
    let isCheckPassword = this.checkValidatePassword();
    console.log(isCheckPassword);
    if (isCheckPassword === false) {
      this.setState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      this.props.changePasswordRedux({
        oldPassword: this.state.currentPassword,
        newPassword: this.state.newPassword,
      });
      this.setState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };
  render() {
    let {
      currentPassword,
      newPassword,
      confirmPassword,
      showCurrentPassword,
      showNewPassword,
      showConfirmPassword,
    } = this.state;
    return (
      <Modal
        //isOpen thuộc tính có sẵn
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="medium"
      >
        <ModalHeader toggle={() => this.toggle()}>
          <div className="title-modal">Thay đổi password</div>
        </ModalHeader>
        <ModalBody>
          <div class="container">
            <div class="row">
              <div class="col-sm-12">
                <label>Mật khẩu hiện tại</label>
                <div class="form-group pass_show custom-input-password">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    class="form-control"
                    placeholder="Mật khẩu hiện tại..."
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "currentPassword")
                    }
                  />
                  <span onClick={() => this.handleShowHideCurrentPassWord()}>
                    <i
                      className={
                        showCurrentPassword ? "far fa-eye" : "far fa-eye-slash"
                      }
                    ></i>
                  </span>
                </div>
                <label>Mật khẩu mới</label>
                <div class="form-group pass_show custom-input-password">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    class="form-control"
                    placeholder="Mật khẩu mới..."
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "newPassword")
                    }
                  />
                  <span onClick={() => this.handleShowHideNewPassWord()}>
                    <i
                      className={
                        showNewPassword ? "far fa-eye" : "far fa-eye-slash"
                      }
                    ></i>
                  </span>
                </div>
                <label>Xác nhận mật khẩu</label>
                <div class="form-group pass_show custom-input-password">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    class="form-control"
                    placeholder="Xác nhận mật khẩu..."
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "confirmPassword")
                    }
                  />
                  <span onClick={() => this.handleShowHideConfirmPassWord()}>
                    <i
                      className={
                        showConfirmPassword ? "far fa-eye" : "far fa-eye-slash"
                      }
                    ></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            className="px-3"
            onClick={() => this.handleSavePassword()}
          >
            Lưu thay đổi
          </Button>
          <Button
            color="secondary"
            className="px-3"
            onClick={() => this.toggle()}
          >
            Đóng
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePasswordRedux: (data) =>
      dispatch(actions.changePasswordService(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalChangePassword);
