import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../../../store/actions";

class SubmitCart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snpashot) {}
  handleCheckAllItem = () => {
    this.props.ChangeStateAllCheck();
  };
  handleOnPayMent = (item) => {
    const formData = new FormData();
    formData.append("userID", this.props.match.params.id);
    if (item && item.length > 0) {
      item.map((item) => {
        formData.append("cartItemsID", item.ID);
      });
    }
    formData.append("Address", "Da Nang");
    this.props.createPayMentRedux(formData);
  };
  render() {
    let { cartItem } = this.props;
    console.log("check list item", cartItem);
    let productSlected = 0;
    let itemSlected = [];
    for (let i = 0; i < cartItem.length; i++) {
      if (cartItem[i].isCheckItem === true) {
        itemSlected.push(cartItem[i]);
        productSlected =
          productSlected + cartItem[i].ProductCount * cartItem[i].PricePerOne;
      }
    }
    return (
      <div className="submit-container">
        <div className="submit-content">
          <div className="shop-voucher">
            <i class="fas fa-hand-holding-usd"></i>
            <span>Shop voucher</span>
            <input type="text" placeholder="Nhập mã giảm giá" />
          </div>
          <div className="submit-product">
            <div
              className="check-box"
              onClick={() => this.handleCheckAllItem()}
            >
              {this.props.allCheck === false ? (
                <i class="far fa-square"></i>
              ) : (
                <i class="fas fa-check-square"></i>
              )}
            </div>
            <div className="product-slected">
              Chọn tất cả({cartItem.length})
            </div>
            <div className="sum-pricre">
              <span className="sum-number">
                Tổng thanh toán ({itemSlected.length}):
              </span>
              <span className="sum-price">{productSlected}đ</span>
            </div>
            <div className="buy-product">
              <span onClick={() => this.handleOnPayMent(itemSlected)}>
                Mua hàng
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPayMentRedux: (data) => dispatch(actions.createPayMentService(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SubmitCart)
);
