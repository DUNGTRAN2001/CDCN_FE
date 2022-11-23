import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllUser } from "../../services/userService";
import "./UserManage.scss";
import ModalUser from "./ModalUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
    };
  }

  async componentDidMount() {
    let response = await getAllUser();
    if (response && response.isSuccess === true) {
      this.setState(
        {
          arrUser: response["Data"],
        },
        () => {
          console.log(this.state.arrUser);
        }
      );
    }
    // console.log("data get all user", response);
  }
  handleAddNewUser = () => {
    this.setState({
      isOpenModal: true,
    });
  };
  // từ thằng cha truyền sang thằng con
  toggleUserModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };
  render() {
    let { arrUser } = this.state;
    return (
      <div className="user-container">
        <ModalUser
          isOpen={this.state.isOpenModal}
          toggleFromParent={this.toggleUserModal}
        />
        <div className="title">Manage user with Dũng Trần</div>
        <div className="user-table mt-4 mx-1">
          <div className="mx-1">
            <button
              className="btn btn-primary px-3"
              onClick={() => this.handleAddNewUser()}
            >
              <i className="fas fa-plus"></i> Add New User
            </button>
          </div>
          <table id="customers">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              {/* <th>Picture</th> */}
              <th>PhoneNumber</th>
              <th>Address</th>
              <th>Sex</th>
              <th>Action</th>
            </tr>
            {arrUser &&
              arrUser.map((item, index) => {
                return (
                  <tr>
                    <td>{item.FirstName}</td>
                    <td>{item.LastName}</td>
                    {/* <td>
                      <img
                        src={
                          `http://14.174.210.86:7149/api/Image/GetAvatar/` +
                          item.PictureURL
                        }
                        alt=""
                      />
                    </td> */}
                    <td>{item.PhoneNumber}</td>
                    <td>{item.Address}</td>
                    <td>{item.Sex ? "Nam" : "Nữ"}</td>
                    <td>
                      <button className="btn-edit">
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button className="btn-delete">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
