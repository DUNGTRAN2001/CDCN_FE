import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import * as actions from "../../../store/actions";
import { ROOT } from "../../../utils/constant";
import { getProductsByType } from "../../../services/userService";
import { withRouter } from "react-router";
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrProducts: [],
    };
  }
  async componentDidMount() {
    let res = await getProductsByType(this.props.id, "8");
    this.setState({
      arrProducts: res.Data,
    });
  }
  handleViewDetailProduct = (product) => {
    if (this.props.history) {
      this.props.history.push(`/detail-product/${product.ID}`);
    }
    // console.log("check product", product);
  };
  render() {
    let settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    let { arrProducts } = this.state;
    return (
      <div className="section-body">
        <Slider {...settings}>
          {arrProducts &&
            arrProducts.length > 0 &&
            arrProducts.map((item, index) => {
              let image = `${ROOT.ROOT}/api/Product/GetProductImage?productId=${item.ID}&imgNumber=1`;
              if (item.Count > 0) {
                return (
                  <div
                    className="section-customize"
                    key={index}
                    onClick={() => this.handleViewDetailProduct(item)}
                  >
                    <div
                      className="bg-image section-products-bg"
                      style={{
                        backgroundImage: `url(${image})`,
                      }}
                    ></div>
                    <div className="content-bg">
                      <div className="title-image">{item.ProductName}</div>
                      <div className="price">{item.PricePerOne}</div>
                    </div>
                  </div>
                );
              }
            })}
        </Slider>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    productsRedux: state.admin.products,
    listCategory: state.admin.category,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Product)
);
