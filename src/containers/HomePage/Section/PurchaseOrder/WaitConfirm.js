import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { withRouter } from "react-router";
import { getDetailPurchaseOrder } from "../../../../services/userService";
import { ROOT } from "../../../../utils/constant";
import { toast } from "react-toastify";

class WaitConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrItemDetail: [],
    };
  }
  async componentDidMount() {
    let { item } = this.props;
    let res = await getDetailPurchaseOrder(item.ID);
    this.setState({
      arrItemDetail: res.Data,
    });
  }
  async componentDidUpdate(prevProps, prevState, snpashot) {
    if (prevProps.item !== this.props.item) {
      let { item } = this.props;
      let res = await getDetailPurchaseOrder(item.ID);
      this.setState({
        arrItemDetail: res.Data,
      });
    }
  }
  handleCancelPurchase = (item) => {
    toast.success("Đơn đã bị hủy");
    this.props.changeStatusPurchaseOrderRedux(
      {
        id: item.ID,
        status: 6,
      },
      1,
      this.props.id
    );
  };
  handleBackHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };
  render() {
    let { arrItemDetail } = this.state;
    let sumPrice = 0;
    arrItemDetail.map((item) => {
      return (sumPrice += item.PricePerOne * item.ProductCount);
    });
    console.log("check id 1", this.props.item.ID);
    return (
      <>
        <div className="container-main">
          <div className="wait-confirm-content">
            <div className="info-purchase-order">
              <div className="homepage" onClick={() => this.handleBackHome()}>
                <i className="fas fa-home"></i> Xem shop
              </div>
              <div className="status">Chờ xác nhận</div>
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
                className="cancel"
                onClick={() => this.handleCancelPurchase(this.props.item)}
              >
                Hủy đơn
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
    changeStatusPurchaseOrderRedux: (data, status, id) =>
      dispatch(actions.changeStatusPurchaseOrder(data, status, id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WaitConfirm)
);
