import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import HomeHeader from "../../HomeHeader";
import * as actions from "../../../../store/actions";
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrSearch: [],
    };
  }
  componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.key
    ) {
      let key = this.props.match.params.key;
      this.props.searchProductRedux(key);
    }
  }

  componentDidUpdate(prevProps, prevState, snpashot) {
    if (prevProps.searchResult !== this.props.searchResult) {
      this.setState({
        arrSearch: this.props.searchResult,
      });
    }
  }

  render() {
    let { arrSearch } = this.state;
    console.log("checl arr search", arrSearch);
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="search-container">
          <div className="search-content">Search result</div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchResult: state.admin.searchResult,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchProductRedux: (key) => dispatch(actions.searchProductService(key)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
