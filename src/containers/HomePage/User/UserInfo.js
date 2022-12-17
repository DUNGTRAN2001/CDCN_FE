import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomeHeader";
import "./UserInfo.scss";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
import { ROOT } from "../../../utils/constant";
import { getAUserInFoByID } from "../../../services/userService";
import ModalChangePassword from "./ModalChangePassword";
class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: "",
      LastName: "",
      PhoneNumber: "",
      Address: "",
      Sex: "",
      CitizenID: "",
      avatar: "",
      UserID: "",
      file: "",
      arrInfoUser: {},
      isOpenModal: false,
    };
  }
  async componentDidMount() {
    let res = await getAUserInFoByID(this.props.match.params.id);
    this.setState({
      arrInfoUser: res.Data[0],
    });
    if (this.state.arrInfoUser) {
      this.setState({
        UserID: this.state.arrInfoUser.UserID,
        FirstName: this.state.arrInfoUser.FirstName,
        LastName: this.state.arrInfoUser.LastName,
        PhoneNumber: this.state.arrInfoUser.PhoneNumber,
        Address: this.state.arrInfoUser.Address,
        Sex: this.state.arrInfoUser.Sex,
        CitizenID: this.state.arrInfoUser.CitizenID,
        avatar: `${ROOT.ROOT}/api/Image/GetAvatar/${this.state.arrInfoUser.UserID}`,
        arrInfoUser: this.state.arrInfoUser,
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.arrInfoUser !== this.state.arrInfoUser) {
      getAUserInFoByID(this.props.match.params.id);
    }
  }
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        avatar: objectUrl,
        file: file,
      });
    }
  };
  handleEditUser = () => {
    const formData = new FormData();
    formData.append("UserId", this.state.UserID);
    formData.append("FirstName", this.state.FirstName);
    formData.append("LastName", this.state.LastName);
    formData.append("Address", this.state.Address);
    formData.append("PhoneNumber", this.state.PhoneNumber);
    formData.append("Sex", this.state.Sex);
    formData.append("CitizenID", this.state.CitizenID);
    formData.append("Avatar", this.state.file);
    this.props.editInfoUser(formData);
    getAUserInFoByID(this.props.match.params.id);
  };
  handleChangePassword = () => {
    this.setState({
      isOpenModal: true,
    });
  };
  toggleUserModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };
  render() {
    let { arrInfoUser } = this.state;
    let { FirstName, LastName, PhoneNumber, Address, Sex, CitizenID } =
      this.state;
    return (
      <div className="user-info-container">
        <HomeHeader isShowBanner={false} />
        <ModalChangePassword
          isOpen={this.state.isOpenModal}
          toggleFromParent={this.toggleUserModal}
        />
        <div className="user-info-container">
          {arrInfoUser && (
            <div className="container-xl px-4 mt-5 ">
              <div className="row">
                <div className="col-xl-4">
                  <div className="card mb-4 mb-xl-0">
                    <div className="card-header">Ảnh người dùng</div>
                    <div className="card-body text-center">
                      <img
                        className="img-account-profile rounded-circle mb-2"
                        src={this.state.avatar}
                        alt=""
                      />
                      <div className="small font-italic text-muted mb-4">
                        JPG or PNG không lớn hơn 5mb
                      </div>
                      <button className="btn btn-primary" type="button">
                        <input
                          id="previewImg"
                          type="file"
                          hidden
                          onChange={(event) => this.handleOnChangeImage(event)}
                        />
                        <label htmlFor="previewImg" className="lable-upload">
                          Tải ảnh <i className="fas fa-upload"></i>
                        </label>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8">
                  <div className="card mb-4">
                    <div className="card-header">Chi tiết tài khoản</div>
                    <div className="card-body">
                      <form>
                        <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label className="small mb-1">Tên người dùng</label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter your first name"
                              value={FirstName}
                              onChange={(event) =>
                                this.onChangeInput(event, "FirstName")
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="small mb-1">Họ người dùng</label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter your last name"
                              value={LastName}
                              onChange={(event) =>
                                this.onChangeInput(event, "LastName")
                              }
                            />
                          </div>
                        </div>
                        <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label className="small mb-1">Số điện thoại</label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter your organization phone number"
                              value={PhoneNumber}
                              onChange={(event) =>
                                this.onChangeInput(event, "PhoneNumber")
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="small mb-1">Dịa chỉ</label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter your location"
                              value={Address}
                              onChange={(event) =>
                                this.onChangeInput(event, "Address")
                              }
                            />
                          </div>
                        </div>
                        <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label className="small mb-1">Giới tính</label>
                            <select
                              name="gender"
                              className="form-control"
                              value={Sex}
                              onChange={(event) =>
                                this.onChangeInput(event, "Sex")
                              }
                            >
                              <option value="true">Nam</option>
                              <option value="false">Nữ</option>
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label className="small mb-1">
                              Số chứng minh nhân dân
                            </label>
                            <input
                              className="form-control"
                              type="tel"
                              placeholder="Enter your citizenID"
                              value={CitizenID}
                              onChange={(event) =>
                                this.onChangeInput(event, "CitizenID")
                              }
                            />
                          </div>
                        </div>
                        <div className="button-change">
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => this.handleEditUser()}
                          >
                            Lưu thay đổi
                          </button>
                          <button
                            className="btn btn-warning"
                            type="button"
                            onClick={() => this.handleChangePassword()}
                          >
                            Thay đổi mật khẩu
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editInfoUser: (data) => dispatch(actions.editAUser(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserInfo)
);
