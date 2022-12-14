import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../../../store/actions";
import { toast } from "react-toastify";

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
    if (this.props.history && item.length > 0) {
      this.props.history.push("/payment", {
        itemIsChecked: item,
        id: this.props.match.params.id,
      });
    } else {
      toast.warning("Chưa có sản phẩm được chọn !");
    }
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
            <i className="fas fa-hand-holding-usd"></i>
            <span>Shop voucher</span>
            <input type="text" placeholder="Nhập mã giảm giá" />
          </div>

          <div className="submit-product">
            <div
              className="check-box"
              onClick={() => this.handleCheckAllItem()}
            >
              {this.props.allCheck === false ? (
                <i className="far fa-square"></i>
              ) : (
                <i className="fas fa-check-square"></i>
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
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SubmitCart)
);
