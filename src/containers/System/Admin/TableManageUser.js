import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }
  componentDidMount() {
    this.props.getAllUserStart();
  }
  componentDidUpdate(prevProps, prevState, snpashot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        userRedux: this.props.listUsers,
      });
    }
  }
  //   handleDeleteUser = (user) => {
  //     this.props.deleteAUserRedux(user.id);
  //   };
  handleEditUser = (user) => {
    this.props.handleEditUserFromParentKey(user);
    console.log(user);
  };

  render() {
    // console.log("check list User", this.props.listUsers);
    // console.log("check list state", this.state.userRedux);
    let arrUser = this.state.userRedux;
    return (
      <table id="tableManageUser">
        <tbody>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            {/* <th>Picture</th> */}
            <th>Action</th>
          </tr>
          {arrUser &&
            arrUser.length > 0 &&
            arrUser.map((item, index) => {
              return (
                <tr key={index}>
                  {/* <td>{item.email}</td> */}
                  <td>{item.FirstName}</td>
                  <td>{item.LastName}</td>
                  <td>{item.Address}</td>
                  {/* <td>
                    <img
                      src={
                        `http://14.174.210.86:7149/api/Image/GetAvatar/` +
                        item.PictureURL
                      }
                      alt=""
                    />
                  </td> */}
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => this.handleEditUser(item)}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button
                      className="btn-delete"
                      //   onClick={() => this.handleDeleteUser(item)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserStart: () => dispatch(actions.fetchAllUsersStart()),
    // deleteAUserRedux: (UserId) => dispatch(actions.deleteAUser(UserId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
