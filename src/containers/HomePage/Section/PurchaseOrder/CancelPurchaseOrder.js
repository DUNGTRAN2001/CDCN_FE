import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { withRouter } from "react-router";
import { getDetailPurchaseOrder } from "../../../../services/userService";
import { ROOT } from "../../../../utils/constant";
class CancelPurchaseOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrItemDetail: [],
    };
  }
  async getData() {
    let { item } = this.props;
    let res = await getDetailPurchaseOrder(item.ID);
    console.log("check response", res?.Data);
    this.setState({
      arrItemDetail: res.Data,
    });
  }
  componentDidMount() {
    this.getData();
  }
  async componentDidUpdate(prevProps, prevState, snpashot) {
    if (prevProps.item !== this.props.item) {
      this.getData();
    }
  }
  handleBackHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };
  handleRepurchase = (arrItem) => {
    let arrItemCopy = [...arrItem];
    if (arrItemCopy && arrItemCopy.length > 0) {
      arrItemCopy.map((item) => {
        this.props.addProductToCartRedux(
          {
            userId: this.props.id,
            productID: item.ProductID,
            productCount: item.ProductCount,
            description: item.Description,
          },
          this.props.id
        );
      });
    }
    if (this.props.history) {
      this.props.history.push(`/cart/${this.props.id}`, {
        arrItemIsChecked: arrItemCopy,
      });
    }
  };
  render() {
    let { arrItemDetail } = this.state;
    let sumPrice = 0;
    arrItemDetail.map((item) => {
      return (sumPrice += item.PricePerOne * item.ProductCount);
    });
    console.log("check id 6", this.props.item.ID);
    console.log("check length ", arrItemDetail.length);
    return (
      <>
        <div className="container-main">
          <div className="cancel-content">
            <div className="info-purchase-order">
              <div className="homepage" onClick={() => this.handleBackHome()}>
                <i className="fas fa-home"></i> Xem shop
              </div>
              <div className="status">Đã hủy</div>
            </div>
            {arrItemDetail &&
              arrItemDetail.length > 0 &&
              arrItemDetail.map((item, index) => {
                return (
                  <div className="info-product" key={index}>
                    <div
                      className="image"
                      style={{
                        backgroundImage: `url(${ROOT.ROOT}/api/Product/GetProductImage?productId=${item.ProductID}&imgNumber=1)`,
                      }}
                    ></div>
                    <div className="description">
                      <div className="name">{item.ProductName}</div>
                      <div className="description-product">
                        Mô tả :
                        {item.Description ? item.Description : "Không có mô tả"}
                      </div>
                      <div className="count">x{item.ProductCount}</div>
                    </div>
                    <div className="price">
                      {item.PricePerOne * item.ProductCount}đ
                    </div>
                  </div>
                );
              })}

            <div className="sum-price">
              <span className="title1">
                <i className="fas fa-dollar-sign"></i> Tổng số tiền :
              </span>
              <span className="title2">{sumPrice}đ</span>
            </div>
            <div className="contact">
              <div className="contact-shop">Liên hệ người bán</div>
              <div
                className="repurchase"
                onClick={() => this.handleRepurchase(arrItemDetail)}
              >
                Mua lại
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCartRedux: (data, id) =>
      dispatch(actions.addProductToCartService(data, id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CancelPurchaseOrder)
);
