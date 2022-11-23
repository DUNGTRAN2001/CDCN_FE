import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomeHeader";
import * as actions from "../../../../store/actions";
import { LANGUAGES, ROOT } from "../../../../utils";
import { toast } from "react-toastify";
import { withRouter } from "react-router";

import "./MoreProduct.scss";
class MoreProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrProducts: [],
      limit: 4,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      await this.props.fetchAllProductByCategoryIdRedux(id, this.state.limit);
    }
  }
  componentDidUpdate(prevProps, prevState, snpashot) {
    if (
      prevProps.listProductFollowCategory !==
      this.props.listProductFollowCategory
    ) {
      this.setState({
        arrProducts: this.props.listProductFollowCategory,
      });
    }
    if (prevState.limit !== this.state.limit) {
      setTimeout(() => {
        this.props.fetchAllProductByCategoryIdRedux(
          this.props.match.params.id,
          this.state.limit
        );
      }, 300);
    }
  }

  handleSeeMoreProduct = () => {
    this.setState({
      limit: this.state.limit + 4,
    });
  };
  handleOutOfStock = () => {
    toast.error("Sản phẩm tạm thời hết hàng");
  };
  handleViewDetailProduct = (product) => {
    if (this.props.history) {
      this.props.history.push(`/detail-product/${product.ID}`);
    }
    // console.log("check product", product);
  };
  render() {
    let { arrProducts } = this.state;
    console.log("check arr product", arrProducts);
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="more-product-container">
          <div className="more-product-body">
            {arrProducts &&
              arrProducts.length > 0 &&
              arrProducts.map((item, index) => {
                let image = `${ROOT.ROOT}/api/Product/GetProductImage?productId=${item.ID}&imgNumber=1`;

                return (
                  <>
                    {item.Count > 0 ? (
                      <>
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
                            <div className="title-image">
                              {item.ProductName}
                            </div>
                            <div className="price">{item.PricePerOne}</div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div
                        className="section-customize"
                        key={index}
                        onClick={() => this.handleOutOfStock(item)}
                      >
                        <div
                          className="bg-image bg-translucent section-products-bg"
                          style={{
                            backgroundImage: `url(${image})`,
                          }}
                        ></div>
                        <div className="content-bg">
                          <div className="title-image title-out-of-stock">
                            Hết hàng
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
          </div>
          <div
            className="see-more-product"
            onClick={() => this.handleSeeMoreProduct()}
          >
            See more
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    objectMoreProduct: state.admin.infoProduct,
    language: state.app.language,
    listProductFollowCategory: state.admin.allProductfollowCategory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProductByCategoryIdRedux: (id, limit) =>
      dispatch(actions.fetchAllProductByCategoryId(id, limit)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MoreProduct)
);
