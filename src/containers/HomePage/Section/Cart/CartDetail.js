import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { ROOT } from "../../../../utils/constant";
import { toast } from "react-toastify";
import * as actions from "../../../../store/actions";
class CartDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheck: false,
    };
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snpashot) {
    if (prevProps.item.ProductCount !== this.props.item.ProductCount) {
      this.props.editProductToCartRedux({
        id: this.props.item.ID,
        productCount: this.props.item.ProductCount,
        description: "",
      });
    }
  }
  handleOnChangeCountNumber = (event) => {
    if (event.target.value > this.props.item.ProductQuantityLeft) {
      event.preventDefault();
      toast.warning("Sản phẩm hiện tại không đủ");
    } else {
      this.props.onChangeItem(this.props.index, {
        ...this.props.item,
        ProductCount: event.target.value,
      });
    }
  };
  handleMinusNumber = (item) => {
    if (item.ProductCount < 2) {
      toast.warning("Số lượng sản phẩm không được nhỏ hơn 1");
      return;
    } else {
      this.props.onChangeItem(this.props.index, {
        ...this.props.item,
        ProductCount: item.ProductCount - 1,
      });
    }
  };
  handlePlusNumber = (item) => {
    if (item.ProductCount >= item.ProductQuantityLeft) {
      toast.warning("Sản phẩm hiện tại không đủ");
      return;
    } else {
      this.props.onChangeItem(this.props.index, {
        ...this.props.item,
        ProductCount: item.ProductCount + 1,
      });
    }
  };
  handleOnKeyPress = (event) => {
    if (event.charCode < 47) {
      event.preventDefault();
      toast.warning("Số lượng sản phẩm không được nhỏ hơn 1");
    }
  };
  handleCheckTick = (item) => {
    this.props.onChangeItem(this.props.index, {
      ...this.props.item,
      isCheckItem: !this.props.item.isCheckItem,
    });
  };
  handleDeleteItem = (item) => {
    this.props.deleteProductFromCartRedux(item.ID, this.props.match.params.id);
  };
  render() {
    let { item, index } = this.props;
    return (
      <div className="cart-detail" key={index}>
        <div className="detail">
          <div
            className="tick-product"
            onClick={() => this.handleCheckTick(item)}
          >
            {item?.isCheckItem ? (
              <i class="fas fa-check-square"></i>
            ) : (
              <i class="far fa-square"></i>
            )}
          </div>
          <div className="product-added">
            <div
              className="product-image"
              style={{
                backgroundImage: `url(${ROOT.ROOT}/api/Product/GetProductImage?productId=${item.ProductID}&imgNumber=1)`,
              }}
            ></div>
            <div className="product-name">{item.ProductName}</div>
          </div>
          <div className="product-price">{item.PricePerOne}đ</div>
          <div className="product-number">
            <div className="number">
              <div className="input-number">
                <span
                  className="minus"
                  onClick={() => this.handleMinusNumber(item)}
                >
                  -
                </span>
                <input
                  type="number"
                  value={item.ProductCount}
                  onChange={(event) => this.handleOnChangeCountNumber(event)}
                  onKeyPress={(event) => this.handleOnKeyPress(event)}
                />
                <span
                  className="plus"
                  onClick={() => this.handlePlusNumber(item)}
                >
                  +
                </span>
              </div>
            </div>
            <div className="product-count">
              Còn {item.ProductQuantityLeft} sản phẩm
            </div>
          </div>
          <div className="product-all-price">
            {item.PricePerOne * item.ProductCount}
          </div>
          <div
            className="delete-product"
            onClick={() => this.handleDeleteItem(item)}
          >
            <i class="fas fa-trash-alt"></i>
          </div>
        </div>
        <div className="free-ship">
          <i className="fas fa-shipping-fast"></i>
          <span> Miễn phí vận chuyển</span>
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
    deleteProductFromCartRedux: (id, userId) =>
      dispatch(actions.deleteProductFromCartService(id, userId)),
    fetchCartByUserIdRedux: (id) => dispatch(actions.fetchCartByUserId(id)),
    editProductToCartRedux: (data) =>
      dispatch(actions.editProductToCartService(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartDetail)
);
