import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { withRouter } from "react-router";
import { getDetailPurchaseOrder } from "../../../../services/userService";
import { ROOT } from "../../../../utils/constant";
class Complete extends Component {
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
    console.log("check id 5", this.props.item.ID);
    console.log("check arrItemDetail", arrItemDetail);
    return (
      <div className="container-main">
        <div className="complete-content">
          <div className="info-purchase-order">
            <div className="homepage" onClick={() => this.handleBackHome()}>
              <i className="fas fa-home"></i> Xem shop
            </div>
            <div className="status">???? giao</div>
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
                      M?? t??? :
                      {item.Description ? item.Description : "Kh??ng c?? m?? t???"}
                    </div>
                    <div className="count">x{item.ProductCount}</div>
                  </div>
                  <div className="price">
                    {item.PricePerOne * item.ProductCount}??
                  </div>
                </div>
              );
            })}

          <div className="sum-price">
            <span className="title1">
              <i className="fas fa-dollar-sign"></i> T???ng s??? ti???n :
            </span>
            <span className="title2">{sumPrice}??</span>
          </div>
          <div className="contact">
            <div className="contact-shop">Li??n h??? ng?????i b??n</div>
            <div className="rate">????nh gi??</div>
            <div
              className="repurchase"
              onClick={() => this.handleRepurchase(arrItemDetail)}
            >
              Mua l???i
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
    addProductToCartRedux: (data, id) =>
      dispatch(actions.addProductToCartService(data, id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Complete)
);
