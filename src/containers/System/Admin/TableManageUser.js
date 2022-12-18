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
      showData: [],
      limitUser: 5,
    };
  }
  componentDidMount() {
    this.props.getAllUserStart();
  }
  componentDidUpdate(prevProps, prevState, snpashot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        userRedux: this.props.listUsers,
        showData: this.props.listUsers.slice(0, this.state.limitUser),
      });
    }
  }
  pagination = (number) => {
    console.log("number", number);
    var arr = [];
    for (let i = 1; i <= number; i++) {
      arr.push(i);
    }
    return arr.map((element) => {
      return (
        <div key={element}>
          <button
            className="btn btn-primary mr-3"
            onClick={() => this.nextPage(element)}
          >
            {element}
          </button>
        </div>
      );
    });
  };
  nextPage = (number) => {
    console.log(number);
    let end = this.state.limitUser * number;
    this.setState({
      showData: this.props.listUsers.slice(end - 5, end),
    });
  };
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
    let showData = this.state.showData;
    return (
      <>
        <table id="tableManageUser">
          <tbody>
            <tr>
              <th>Id User</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              {/* <th>Picture</th> */}
              <th>Action</th>
            </tr>
            {showData &&
              showData.length > 0 &&
              showData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.UserID}</td>
                    <td>{item.FirstName}</td>
                    <td>{item.LastName}</td>
                    <td>{item.Address}</td>

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
        <div className="pagination mb-5">
          {this.pagination(
            arrUser.length % 5 === 0
              ? (arrUser.length / 5) >> 0
              : ((arrUser.length / 5) >> 0) + 1
          )}
        </div>
      </>
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
