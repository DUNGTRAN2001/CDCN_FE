import React, { Component } from "react";
import { connect } from "react-redux";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import Product from "./Product";
import { withRouter } from "react-router";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCategory: [],
    };
  }
  componentDidMount() {
    this.props.fetchCategoryRedux();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listCategory !== this.props.listCategory) {
      this.setState({
        arrCategory: this.props.listCategory,
      });
    }
  }
  handleDirectMore = (id) => {
    if (this.props.history) {
      this.props.history.push(`/more-product/${id}`);
    }
  };
  render() {
    let { arrCategory } = this.state;
    return (
      <>
        {arrCategory &&
          arrCategory.length > 0 &&
          arrCategory.map((item, index) => {
            return (
              <div className="section-share section-products" key={index}>
                <div className="section-container">
                  <div className="section-header">
                    <span className="title-section">{item.CategoryName}</span>
                    <button
                      className="btn-section"
                      onClick={() => this.handleDirectMore(item.ID)}
                    >
                      Xem thêm
                    </button>
                  </div>

                  <Product id={item.ID} />
                </div>
              </div>
            );
          })}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    listCategory: state.admin.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategoryRedux: () => dispatch(actions.fetchCategoryProduct()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Category)
);
