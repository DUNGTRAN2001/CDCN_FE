import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomeHeader";
import "./UserInfo.scss";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
import { ROOT } from "../../../utils/constant";
import { getAUserInFoByID } from "../../../services/userService";
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
      Role: "R2",
      arrInfoUser: {},
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
    formData.append("Role", this.state.Role);
    this.props.editInfoUser(formData);
    getAUserInFoByID(this.props.match.params.id);
  };
  render() {
    let { arrInfoUser } = this.state;
    let { FirstName, LastName, PhoneNumber, Address, Sex, CitizenID } =
      this.state;
    return (
      <div className="user-info-container">
        <HomeHeader isShowBanner={false} />
        <div className="user-info-container">
          {arrInfoUser && (
            <div className="container-xl px-4 mt-5 ">
              <div className="row">
                <div className="col-xl-4">
                  <div className="card mb-4 mb-xl-0">
                    <div className="card-header">Profile Picture</div>
                    <div className="card-body text-center">
                      <img
                        className="img-account-profile rounded-circle mb-2"
                        src={this.state.avatar}
                        alt=""
                      />
                      <div className="small font-italic text-muted mb-4">
                        JPG or PNG no larger than 5 MB
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
                    <div className="card-header">Account Details</div>
                    <div className="card-body">
                      <form>
                        <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label className="small mb-1">First name</label>
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
                            <label className="small mb-1">Last name</label>
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
                            <label className="small mb-1">PhoneNumber</label>
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
                            <label className="small mb-1">Address</label>
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
                            <label className="small mb-1">Sex</label>
                            <select
                              name="gender"
                              className="form-control"
                              value={Sex}
                              onChange={(event) =>
                                this.onChangeInput(event, "Sex")
                              }
                            >
                              <option value="true">Male</option>
                              <option value="false">FeMale</option>
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label className="small mb-1">CitizenID</label>
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

                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={() => this.handleEditUser()}
                        >
                          Save changes
                        </button>
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
