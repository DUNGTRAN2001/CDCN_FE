import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils/constant";
import "./UserRedux.scss";
import TableManageUser from "./TableManageUser";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { ROOT } from "../../../utils/constant";
import { toast } from "react-toastify";
// import formData from "form-data";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImgUrl: "",
      isOpen: false,

      // thông tin user
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      citizenID: "",
      sex: true,
      avatar: "",
      role: "R1",
      userEditId: "",
      action: CRUD_ACTIONS.CREATE,
    };
  }

  async componentDidMount() {}
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  // listUser
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUser !== this.props.listUser) {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        citizenID: "",
        sex: true,
        avatar: "",
        role: "R1",
        action: CRUD_ACTIONS.CREATE,
      });
    }
  }
  handleOnChangeImage = (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectUrl,
        avatar: file,
      });
    }
  };
  openPreviewImg = () => {
    if (!this.state.previewImgUrl) return;
    this.setState({
      isOpen: true,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
      "citizenID",
      "avatar",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        toast.warn("This input is required: " + arrCheck[i]);
        break;
      }
    }

    return isValid;
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) {
      return;
    }

    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      const formData = new FormData();
      formData.append("Email", this.state.email);
      formData.append("Password", this.state.password);
      formData.append("FirstName", this.state.firstName);
      formData.append("LastName", this.state.lastName);
      formData.append("Address", this.state.address);
      formData.append("PhoneNumber", this.state.phoneNumber);
      formData.append("Sex", this.state.sex);
      formData.append("CitizenID", this.state.citizenID);
      // formData.append("Role", this.state.role);
      formData.append("Avatar", this.state.avatar);
      this.props.createAccountUserRedux(formData);
    }
    if (action === CRUD_ACTIONS.EDIT) {
      const formData = new FormData();
      formData.append("UserId", this.state.userEditId);
      formData.append("FirstName", this.state.firstName);
      formData.append("LastName", this.state.lastName);
      formData.append("Address", this.state.address);
      formData.append("PhoneNumber", this.state.phoneNumber);
      formData.append("Sex", this.state.sex);
      formData.append("CitizenID", this.state.citizenID);
      formData.append("Role", this.state.role);
      formData.append("Avatar", this.state.avatar);
      this.props.editUserRedux(formData);
    }
  };
  handleEditUserFromParent = (user) => {
    let image = "";

    image = `${ROOT.ROOT}/api/Image/GetAvatar/${user.UserID}`;

    this.setState({
      email: user.Email,
      password: "123456789",
      phoneNumber: user.PhoneNumber,
      citizenID: user.CitizenID,
      role: user.Role,
      sex: user.Sex,
      firstName: user.FirstName,
      lastName: user.LastName,
      address: user.Address,
      avatar: "",
      previewImgUrl: image,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.UserID,
    });
  };
  render() {
    let language = this.props.language;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      citizenID,
      sex,
      role,
      avatar,
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title">User Redux with Dũng Trần </div>
        <div className="user-redux-body">
          {/* của bootstrap */}
          <div className="container">
            <div className="row">
              <div className="form group col-12 my-3">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="form-group col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(event) => this.onChangeInput(event, "email")}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                />
              </div>
              <div className="form-group col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(event) => this.onChangeInput(event, "password")}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                />
              </div>
              <div className="form-group col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(event) => this.onChangeInput(event, "firstName")}
                />
              </div>
              <div className="form-group col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.last-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(event) => this.onChangeInput(event, "lastName")}
                />
              </div>
              <div className="form-group col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(event) => this.onChangeInput(event, "phoneNumber")}
                />
              </div>
              <div className="form-group col-9">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(event) => this.onChangeInput(event, "address")}
                />
              </div>

              <div className="form-group col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-img-cotainer">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                  <label htmlFor="previewImg" className="lable-upload">
                    Tải ảnh <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImgUrl})`,
                    }}
                    onClick={() => this.openPreviewImg()}
                  ></div>
                </div>
              </div>

              <div className="form-group col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.citizenID" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={citizenID}
                  onChange={(event) => this.onChangeInput(event, "citizenID")}
                />
              </div>
              <div className="form-group col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.sex" />
                </label>

                <select
                  name="gender"
                  className="form-control"
                  value={sex}
                  onChange={(event) => this.onChangeInput(event, "sex")}
                >
                  <option value="true">Nam</option>
                  <option value="false">Nữ</option>
                </select>
              </div>
              <div className="form-group col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.role" />
                </label>

                <select
                  name="gender"
                  className="form-control"
                  value={role}
                  onChange={(event) => this.onChangeInput(event, "role")}
                >
                  <option value="R1">Quản trị viên</option>
                  <option value="R2">Khách hàng</option>
                </select>
              </div>
              <div className="form-group col-12 mt-3">
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.CREATE
                      ? "btn btn-primary"
                      : "btn btn-warning"
                  }
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.action === CRUD_ACTIONS.CREATE ? (
                    <FormattedMessage id="manage-user.save" />
                  ) : (
                    <FormattedMessage id="manage-user.edit" />
                  )}
                </button>
              </div>
              <div className="col-12">
                <TableManageUser
                  handleEditUserFromParentKey={this.handleEditUserFromParent}
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listUser: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUserRedux: (data) => dispatch(actions.editAUser(data)),
    createAccountUserRedux: (data) =>
      dispatch(actions.createAccountUserService(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
