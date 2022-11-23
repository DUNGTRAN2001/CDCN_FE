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
      // gender: "",
      // role: "",
      avatar: "",
      userEditId: "",
      action: "",
    };
  }

  async componentDidMount() {
    // try {
    //   let res = await getAllCodeService("GENDER");
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       genderArr: res.data,
    //     });
    //   }
    //   console.log("chcck res", res);
    // } catch (error) {
    //   console.log(error);
    // }
  }
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
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
  handleSaveUser = () => {
    // let isValid = this.checkValidateInput();
    // if (isValid === false) {
    //   return;
    // }
    // let formData = new FormData();
    // const formData = new FormData();
    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      // this.props.createNewUser({
      //   // email: this.state.email,
      //   // password: this.state.password,
      //   // firstName: this.state.firstName,
      //   // lastName: this.state.lastName,
      //   // address: this.state.address,
      //   // phonenumber: this.state.phoneNumber,
      //   // gender: this.state.gender,
      //   // roleId: this.state.role,
      //   // positionId: this.state.position,
      // });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      const formData = new FormData();
      formData.append("UserId", this.state.userEditId);
      formData.append("FirstName", "a");
      formData.append("LastName", "a");
      formData.append("Address", "a");
      formData.append("PhoneNumber", "a");
      formData.append("Sex", true);
      formData.append("CitizenID", "a");
      formData.append("Avatar", this.state.avatar);
      this.props.editUserRedux(formData);
    }
  };
  handleEditUserFromParent = (user) => {
    let image = "";

    image = `${ROOT.ROOT}/api/Image/GetAvatar/${user.UserID}`;

    this.setState({
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
    // let genders = this.state.genderArr;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
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
              {/* <div className="form-group col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select class="form-control">
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div> */}
              {/* <div className="form-group col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select class="form-control">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="form-group col-3">
                <label htmlFor="">
                  <FormattedMessage id="manage-user.role-id" />
                </label>
                <select class="form-control">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div> */}
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
              <div className="form-group col-12 mt-3">
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUserRedux: (data) => dispatch(actions.editAUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
