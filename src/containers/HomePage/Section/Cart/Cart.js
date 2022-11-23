import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomeHeader";
import "./Cart.scss";
import * as actions from "../../../../store/actions";
import { LANGUAGES, ROOT } from "../../../../utils";
import { withRouter } from "react-router";
import CartDetail from "./CartDetail";
import SubmitCart from "./SubmitCart";
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItem: [],
      productCount: "",
      allCheck: false,
    };
  }
  componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.props.fetchCartByUserIdRedux(id);
    }
  }
  componentDidUpdate(prevProps, prevState, snpashot) {
    if (prevProps.listItemInCart !== this.props.listItemInCart) {
      this.setState({
        cartItem: this.props.listItemInCart,
      });
    }
  }
  handleOnChangeCountNumber = (event) => {
    this.setState({});
  };
  onChangeCartItem = (index, newItem) => {
    let newCartItem = [...this.state.cartItem];
    newCartItem[index] = newItem;
    this.setState({
      cartItem: newCartItem,
    });
  };
  handleCheckAllItem = () => {
    this.setState({
      allCheck: !this.state.allCheck,
    });
    let newListCartItem = [...this.state.cartItem];
    if (newListCartItem.length > 0) {
      newListCartItem = newListCartItem.map((item, index) => {
        return { ...item, isCheckItem: !this.state.allCheck };
      });
    }
    this.setState({
      cartItem: newListCartItem,
    });
  };
  ChangeStateAllCheck = () => {
    this.setState({
      allCheck: !this.state.allCheck,
    });
    let newListCartItem = [...this.state.cartItem];
    if (newListCartItem.length > 0) {
      newListCartItem = newListCartItem.map((item, index) => {
        return { ...item, isCheckItem: !this.state.allCheck };
      });
    }
    this.setState({
      cartItem: newListCartItem,
    });
  };
  render() {
    let { cartItem } = this.state;
    let { allCheck } = this.state;
    // console.log("check list item", cartItem);
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="cart-container">
          <div className="cart-all-product">
            <div
              className="check-box"
              onClick={() => this.handleCheckAllItem()}
            >
              {allCheck === false ? (
                <i class="far fa-square"></i>
              ) : (
                <i class="fas fa-check-square"></i>
              )}
            </div>
            <div className="cart-item">Sản phẩm</div>
            <div className="unit-price">Đơn giá</div>
            <div className="cart-number">Số lượng</div>
            <div className="price">Số tiền</div>
            <div className="delete-product">Xóa sản phẩm</div>
          </div>
          {cartItem &&
            cartItem.length > 0 &&
            cartItem.map((item, index) => {
              return (
                <CartDetail
                  item={item}
                  index={index}
                  onChangeItem={this.onChangeCartItem}
                />
              );
            })}
        </div>
        <SubmitCart
          allCheck={this.state.allCheck}
          ChangeStateAllCheck={this.ChangeStateAllCheck}
          cartItem={this.state.cartItem}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listItemInCart: state.admin.cartByUserId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCartByUserIdRedux: (id) => dispatch(actions.fetchCartByUserId(id)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
