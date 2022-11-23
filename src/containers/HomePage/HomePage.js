import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import "./HomePage.scss";
import OutStanding from "./Section/Oustanding";
import Category from "./Section/Category";
import HomeFooter from "./HomeFooter";
import About from "./Section/About";
class HomePage extends Component {
  render() {
    let settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };

    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <OutStanding settings={settings} />
        <Category />
        <About />
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
