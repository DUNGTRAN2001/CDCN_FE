import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../assets/logo.png";
// biến chuyển đổi ngôn ngữ
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
// do index đã export ra
import * as actions from "../../store/actions";
import { withRouter } from "react-router";
import { path, ROOT } from "../../utils/constant";
class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      orderIdForCart: "",
      searchValue: null,
    };
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (prevProps.oderIdRedux !== this.props.oderIdRedux) {
    //   this.setState({
    //     orderIdForCart: this.props.oderIdRedux,
    //   });
    // }
  }
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  handleLogin = () => {
    if (!this.props.userInfo) {
      if (this.props.history) {
        this.props.history.push(path.LOGIN);
      }
    }
  };
  handleEditInfoUser = (user) => {
    if (this.props.history) {
      this.props.history.push(`/info-user/${user.UserID}`);
    }
  };
  returnToHome = async () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  handleLogout = () => {
    this.props.processLogout();
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  handleToggleInfo = () => {
    this.setState({
      isShow: !this.state.isShow,
    });
  };
  handleViewCart = (item) => {
    if (this.props.history) {
      this.props.history.push(`/cart/${item}`);
    }
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (this.props.history && this.state.searchValue) {
        this.props.history.push(`/search/${this.state.searchValue}`);
      }
      if (this.props.history && this.state.searchValue === null) {
        this.props.history.push(`/home`);
      }
    }
  };
  handleOnChangeSearch = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
  };
  render() {
    let { language, isLoggedIn, userInfo } = this.props;
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <img
                className="header-logo"
                src={logo}
                alt=""
                onClick={() => this.returnToHome()}
              />
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.time-gold" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="home-header.time-frame-sale" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.transport" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="home-header.free-transport" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.discount" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="home-header.discount-code" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.service" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="home-header.good-service" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="home-header.support" />
              </div>
              {isLoggedIn && userInfo ? (
                <>
                  <div
                    className="avatar-img"
                    style={{
                      backgroundImage: `url(${ROOT.ROOT}/api/Image/GetAvatar/${userInfo.UserID})`,
                    }}
                    onClick={() => this.handleToggleInfo()}
                  >
                    <ul
                      className={
                        this.state.isShow ? "list list-show" : "list list-hiden"
                      }
                    >
                      <li onClick={() => this.handleEditInfoUser(userInfo)}>
                        <i className="fas fa-edit"></i> Chỉnh sửa thông tin
                      </li>
                      <li onClick={() => this.handleViewCart(userInfo.UserID)}>
                        <i className="fas fa-shopping-cart"></i> Giỏ hàng
                      </li>
                      <li onClick={() => this.handleLogout()}>
                        <i className="fas fa-sign-out-alt"></i> Đăng xuất
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="login" onClick={() => this.handleLogin()}>
                  <FormattedMessage id="home-header.login" />
                </div>
              )}
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.shopping-bg" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.online-shopping" />
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tìm sản phẩm ..."
                  value={this.state.searchValue}
                  onChange={(event) => this.handleOnChangeSearch(event)}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
              </div>
            </div>
            <div className="content-down">
              <div className="option">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-hospital-alt"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child1" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child2" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-procedures"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child3" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-vials"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child4" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-briefcase-medical"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child5" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-diagnoses"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
    // oderIdRedux: state.admin.oderId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fire action của redux , đầu vào là language
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
    processLogout: () => dispatch(actions.processLogout()),
    // createOderIdForCart: () => dispatch(actions.CreatOrderForCart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
