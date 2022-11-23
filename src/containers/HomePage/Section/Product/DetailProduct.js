import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomeHeader";
import "./DetailProduct.scss";
import * as actions from "../../../../store/actions";
import { LANGUAGES, ROOT } from "../../../../utils";
import Slider from "react-slick";
import DescriptionProduct from "./DescriptionProduct";
import SimilarProduct from "./SimilarProduct";
import { withRouter } from "react-router";
class DetailProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailProduct: {},
      isNumber: 1,
      countNumber: 1,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      await this.props.fetchProductByIdRedux(id);
    }
  }
  componentDidUpdate(prevProps, prevState, snpashot) {
    if (prevProps.objectDetailProduct !== this.props.objectDetailProduct) {
      this.setState({
        detailProduct: this.props.objectDetailProduct,
      });
    }
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.setState({
        detailProduct: this.props.objectDetailProduct,
      });
    }
  }
  hanldeActiveClass = (item) => {
    this.setState({
      isNumber: item,
    });
  };
  handleOnChangeCountNumber = (event) => {
    this.setState({
      countNumber: event.target.value,
    });
  };
  handleMinusNumber = () => {
    if (this.state.countNumber > 1) {
      this.setState({
        countNumber: this.state.countNumber - 1,
      });
    }
  };
  handlePlusNumber = (data) => {
    // console.log("check data pluss", data);
    if (this.state.countNumber < data.Count) {
      this.setState({
        countNumber: this.state.countNumber + 1,
      });
    }
  };
  handleAddProductToCart = (data) => {
    this.props.addProductToCartRedux({
      userId: this.props.userInfo.UserID,
      productID: data.ID,
      productCount: this.state.countNumber,
      description: "",
    });
  };
  render() {
    let settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    let { detailProduct } = this.state;
    console.log("check detail", detailProduct);
    let array = [];
    {
      for (let i = 1; i <= detailProduct.NumberOfImgs; i++) {
        array.push(i);
      }
    }

    let mainImage = `${ROOT.ROOT}/api/Product/GetProductImage?productId=${detailProduct.ID}&imgNumber=${this.state.isNumber}`;
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="detail-container">
          <div className="prodcut-detail-container">
            <div className="detail-product-image">
              <div
                className="main-image"
                style={{
                  backgroundImage: `url(${mainImage})`,
                }}
              ></div>
              <div className="section-body-detail">
                <Slider {...settings}>
                  {array &&
                    array.length > 0 &&
                    array.map((item, index) => {
                      return (
                        <div className="section-customize" key={index}>
                          <div
                            className={
                              item === this.state.isNumber
                                ? "bg-image section-products-bg active"
                                : "bg-image section-products-bg"
                            }
                            style={{
                              backgroundImage: `url(${ROOT.ROOT}/api/Product/GetProductImage?productId=${detailProduct.ID}&imgNumber=${item})`,
                            }}
                            onClick={() => this.hanldeActiveClass(item)}
                          ></div>
                        </div>
                      );
                    })}
                </Slider>
                <div className="share-product">
                  <span className="share-title">Chia sẻ :</span>
                  <i className="fab fa-facebook-messenger i1"></i>
                  <i className="fab fa-facebook i2"></i>
                  <i className="fab fa-instagram i3"></i>
                  <i className="fab fa-twitter i4"></i>
                </div>
              </div>
            </div>
            <div className="detail-product-info">
              <div className="product-name">{detailProduct.ProductName}</div>
              <div className="product-parameter">
                <div className="rate">
                  <span>5:</span>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <div className="review">100 Đánh giá</div>
                <div className="sold">15 Đã bán</div>
              </div>
              <div className="product-price">
                <span> Giá sản phẩm :</span>
                <span className="price">{detailProduct.PricePerOne}đ</span>
              </div>
              <div className="transport">
                <span>Vận chuyển</span>
                <i className="fas fa-shipping-fast"></i>
                <span className="free-ship">Miễn phí vận chuyển</span>
              </div>
              <div className="deal">
                <span>Deal sốc</span>
                <span className="hot-deal">Mua để nhận quà</span>
              </div>
              <div className="size-number">
                <div className="number">
                  <span className="title-number">Số lượng</span>
                  <span
                    className="minus"
                    onClick={() => this.handleMinusNumber()}
                  >
                    -
                  </span>
                  <input
                    type="text"
                    value={this.state.countNumber}
                    onChange={(event) => this.handleOnChangeCountNumber(event)}
                  />
                  <span
                    className="plus"
                    onClick={() => this.handlePlusNumber(detailProduct)}
                  >
                    +
                  </span>
                </div>
                <div className="product-size">
                  <span> Kích cỡ</span>
                  <select className="size">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>
                <div className="product-color">
                  <span>Màu sắc</span>
                  <select className="color">
                    <option value="Đen">Đen</option>
                    <option value="Trăng">Trắng</option>
                    <option value="Vàng">Vàng</option>
                    <option value="Đỏ">Đỏ</option>
                  </select>
                </div>
              </div>
              <div className="product-avalaible">
                {detailProduct.Count} Sản phẩm có sẵn
              </div>
              <div className="add-cart-or-buy">
                <div
                  className="add-cart"
                  onClick={() => this.handleAddProductToCart(detailProduct)}
                >
                  <i className="fas fa-cart-plus"></i>
                  <span>Thêm vào giỏ hàng</span>
                </div>
                <div className="buy-now">Mua ngay</div>
              </div>
            </div>
          </div>
          <SimilarProduct
            categoryId={detailProduct.CategoryID}
            settings={settings}
          />
          <DescriptionProduct detailProduct={this.state.detailProduct} />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    objectDetailProduct: state.admin.infoProduct,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductByIdRedux: (id) => dispatch(actions.fetchProductById(id)),
    addProductToCartRedux: (data) =>
      dispatch(actions.addProductToCartService(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailProduct)
);
