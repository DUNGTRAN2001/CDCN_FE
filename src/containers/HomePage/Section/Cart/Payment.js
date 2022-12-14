import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../../../store/actions";
import HomeHeader from "../../HomeHeader";
import "./Payment.scss";
import { ROOT } from "../../../../utils/constant";
import { toast } from "react-toastify";
class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeShipping: 30000,
      inforUser: {},
    };
  }
  componentDidMount() {
    let id = this.props.location.state.id;
    this.props.fetchAUsersStart(id);
  }
  componentDidUpdate(prevProps, prevState, snpashot) {
    if (prevProps.aUser !== this.props.aUser) {
      this.setState({
        inforUser: this.props.aUser,
      });
    }
  }

  hanleBanking = () => {
    toast.warning("Chức năng đang được phát triển !");
  };
  handleBuyProduct = async () => {
    let allItem = this.props.location.state.itemIsChecked;
    const formData = new FormData();
    formData.append("userID", this.props.userInfo.UserID);
    if (allItem && allItem.length > 0) {
      allItem.map((item) => {
        formData.append("cartItemsID", item.ID);
      });
    }
    formData.append("Address", this.props.userInfo.Address);
    formData.append("ShippingFee", this.state.feeShipping);
    await this.props.createPayMentRedux(formData);
    this.props.history.push(`/purchase-order/${this.props.userInfo.UserID}`);
  };
  render() {
    console.log("check infor user", this.props.aUser);
    let { inforUser } = this.state;
    let arrItem = this.props.location.state.itemIsChecked;
    let id = this.props.location.state.id;
    console.log("check id", id);
    let allCount = 0;
    let allPrice = 0;
    if (arrItem && arrItem.length > 0) {
      arrItem.map((item) => {
        allCount = allCount + item.ProductCount;
        allPrice = allPrice + item.ProductCount * item.PricePerOne;
        return allCount, allPrice;
      });
    }

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="payment-container">
          <div className="payment-content">
            <div className="border-top"></div>
            <div className="delivery-address">
              <div className="address-title">
                <i className="fas fa-map-marker-alt"></i>
                <span>Địa chỉ nhận hàng</span>
              </div>
              <div className="info-user">
                <span className="name-and-phonenumber">
                  {inforUser?.LastName} {inforUser?.FirstName}{" "}
                  {inforUser?.PhoneNumber}
                </span>
                <div className="address-user">
                  {inforUser?.Address}
                  <span>Mặc định</span>
                </div>
                <div className="change-address">Thay đổi</div>
              </div>
            </div>
            <div className="product-to-payment">
              <div className="payment-main">
                <div className="title-payment">Sản phẩm</div>
                <div className="unit-price">Đơn giá</div>
                <div className="number">Số lượng</div>
                <div className="total-price">Thành tiền</div>
              </div>

              {arrItem &&
                arrItem.length > 0 &&
                arrItem.map((item, index) => {
                  return (
                    <div className="payment-content-product">
                      <div className="product-image">
                        <div
                          className="image"
                          style={{
                            backgroundImage: `url(${ROOT.ROOT}/api/Product/GetProductImage?productId=${item.ProductID}&imgNumber=1)`,
                          }}
                        ></div>
                        <div className="description">
                          <div className="name">{item.ProductName}</div>
                          <div className="description-more">
                            {item.Description}
                          </div>
                        </div>
                      </div>
                      <div className="product-price">{item.PricePerOne}đ</div>
                      <div className="product-number">{item.ProductCount}</div>
                      <div className="product-price-total">
                        {item.PricePerOne * item.ProductCount}đ
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="product-note">
              <div className="note-main">
                <div className="note">
                  <span>Lời nhắn: </span>
                  <input type="text" placeholder="Lưu ý cho Shop..." />
                </div>
                <div className="shipping-unit">
                  <div className="title-shipping">Đơn vị vận chuyển:</div>
                  <div className="name-unit">Đơn vị giao hàng bởi MyShop</div>
                  <div className="fee-shipping">30.000đ</div>
                </div>
              </div>
              <div className="total-all-product">
                <span className="tilte-total">
                  Tổng số tiền({allCount} sản phẩm):
                </span>
                <span className="price-total">{allPrice}đ</span>
              </div>
            </div>

            <div className="payment-method">
              <div className="method-tilte">Phương thức thanh toán</div>
              <div
                className="banking-method"
                onClick={() => this.hanleBanking()}
              >
                Thanh toán qua thẻ tín dụng
              </div>
              <div className="cash-method active">Thanh toán khi nhận hàng</div>
            </div>
            <div className="content-payment-method">
              <div className="contnent-method">
                <span className="title-1">Thanh toán khi nhận hàng</span>
                <span className="title-2">
                  Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng
                  cả với phí thu hộ.
                </span>
              </div>
              <div className="order">
                <div className="total-price-product">
                  Tổng tiền hàng : {allPrice}đ
                </div>
                <div className="fee-shipping-order">
                  Phí vận chuyển : {this.state.feeShipping}đ
                </div>
                <div className="total-payment">
                  <span className="total-1">Tổng thanh toán : </span>
                  <span className="total-2">
                    {allPrice + this.state.feeShipping}đ
                  </span>
                </div>
              </div>
              <div className="submit-order">
                <span onClick={() => this.handleBuyProduct()}>Đặt hàng</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    aUser: state.admin.aUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPayMentRedux: (data) => dispatch(actions.createPayMentService(data)),
    fetchAUsersStart: (id) => dispatch(actions.fetchAUsersStart(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Payment)
);
