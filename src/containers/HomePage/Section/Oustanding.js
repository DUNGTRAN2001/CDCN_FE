import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import { ROOT } from "../../../utils";
import { withRouter } from "react-router";

class Outstanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrOutstandingProduct: [],
      showData: [],
      limitProduct: 8,
    };
  }
  componentDidMount() {
    this.props.fetchProductOutstanding();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.outStandingProduct !== this.props.outStandingProduct) {
      this.setState({
        arrOutstandingProduct: this.props.outStandingProduct,
        showData: this.props.outStandingProduct.slice(
          0,
          this.state.limitProduct
        ),
      });
    }
  }
  handleViewDetailProduct = (product) => {
    if (this.props.history) {
      this.props.history.push(`/detail-product/${product.ID}`);
    }
  };
  render() {
    let { showData } = this.state;
    console.log("check arr", showData);
    return (
      <div className="section-share section-outstanding">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Sản phẩm nổi bật</span>
            {/* <button className="btn-section">Xem thêm</button> */}
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {showData &&
                showData.length > 0 &&
                showData.map((item, index) => {
                  let image = `${ROOT.ROOT}/api/Product/GetProductImage?productId=${item.ID}&imgNumber=1`;
                  return (
                    <div
                      className="section-customize "
                      key={index}
                      onClick={() => this.handleViewDetailProduct(item)}
                    >
                      <div
                        className="bg-image section-products-bg border-outstanding"
                        style={{
                          backgroundImage: `url(${image})`,
                        }}
                      ></div>
                      <div className="content-bg">
                        <div className="title-image">{item.ProductName}</div>
                        <div className="price">{item.PricePerOne}đ</div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    outStandingProduct: state.admin.outStandingProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductOutstanding: () => dispatch(actions.fetchProductOutstanding()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Outstanding)
);
