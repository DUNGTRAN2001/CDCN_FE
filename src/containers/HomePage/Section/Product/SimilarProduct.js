import React, { Component } from "react";
import { connect } from "react-redux";
// import { getProductsByType } from "../../../../services/userService";
import * as actions from "../../../../store/actions";
import Slider from "react-slick";
import { ROOT } from "../../../../utils/constant";
import { withRouter } from "react-router";

class SimilarProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrProductsSimiLar: [],
    };
  }
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snpashot) {
    let categoryId = this.props.categoryId;
    if (prevProps.listProduct !== this.props.listProduct) {
      this.setState({
        arrProductsSimiLar: this.props.listProduct,
      });
    }
    if (prevProps.categoryId !== this.props.categoryId) {
      this.props.fetchProductBySimilarRedux(categoryId);
    }
  }
  handleViewDetailProduct = (product) => {
    if (this.props.history) {
      this.props.history.push(`/detail-product/${product.ID}`);
      this.props.fetchProductByIdRedux(product.ID);
    }
  };
  render() {
    let { arrProductsSimiLar } = this.state;
    return (
      <div className="similar-product-container">
        <span>Sản phẩm tương tự</span>
        <div className="section-body">
          <Slider {...this.props.settings}>
            {arrProductsSimiLar &&
              arrProductsSimiLar.length > 0 &&
              arrProductsSimiLar.map((item, index) => {
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listProduct: state.admin.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductBySimilarRedux: (id) =>
      dispatch(actions.fetchProductByCategoryId(id)),
    fetchProductByIdRedux: (id) => dispatch(actions.fetchProductById(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SimilarProduct)
);
