import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomeHeader";
import "./PurchaseOrder.scss";
import * as actions from "../../../../store/actions";
import { withRouter } from "react-router";
import WaitConfirm from "./WaitConfirm";
import Confirm from "./Confirm";
import WaitGoods from "./WaitGoods";
import Shipping from "./Shipping";
import Complete from "./Complete";
import CancelPurchaseOrder from "./CancelPurchaseOrder";
class PurchaseOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPurchaseOrder: [],
      type: "",
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.props.fetchPurchaseOrderRedux(-1, id);
    }
  }
  componentDidUpdate(prevProps, prevState, snpashot) {
    if (prevProps.purchaseOrder !== this.props.purchaseOrder) {
      this.setState({
        arrPurchaseOrder: this.props.purchaseOrder,
      });
    }
  }
  handleAllPurchaseOrder = () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.props.fetchPurchaseOrderRedux(-1, id);
      this.setState({
        type: -1,
      });
    }
  };
  handleWaitConfirm = () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.props.fetchPurchaseOrderRedux(1, id);
      this.setState({
        type: 1,
      });
    }
  };
  handleConfirm = () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.props.fetchPurchaseOrderRedux(2, id);
      this.setState({
        type: 2,
      });
    }
  };
  handleWaitGoods = () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.props.fetchPurchaseOrderRedux(3, id);
      this.setState({
        type: 3,
      });
    }
  };
  handleShipping = () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.props.fetchPurchaseOrderRedux(4, id);
      this.setState({
        type: 4,
      });
    }
  };
  handleComplete = () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.props.fetchPurchaseOrderRedux(5, id);
      this.setState({
        type: 5,
      });
    }
  };
  handleCancel = () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.props.fetchPurchaseOrderRedux(6, id);
      this.setState({
        type: 6,
      });
    }
  };

  render() {
    let { arrPurchaseOrder, type } = this.state;
    let { isLoadingItem } = this.props;
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="purchase-order-container">
          <div className="purchase-order-content">
            <div className="purchase-order-all">
              <div
                className={
                  type === "" || type === -1 ? "all-order active" : "all-order"
                }
                onClick={() => this.handleAllPurchaseOrder()}
              >
                Tất cả
              </div>
              <div
                className={type === 1 ? "wait-confirm active" : "wait-confirm"}
                onClick={() => this.handleWaitConfirm()}
              >
                Chờ xác nhận
              </div>
              <div
                className={type === 2 ? "confirm active" : "confirm"}
                onClick={() => this.handleConfirm()}
              >
                Xác nhận
              </div>
              <div
                className={type === 3 ? "wait-goods active" : "wait-goods"}
                onClick={() => this.handleWaitGoods()}
              >
                Chờ lấy hàng
              </div>
              <div
                className={type === 4 ? "shipping active" : "shipping"}
                onClick={() => this.handleShipping()}
              >
                Đang giao
              </div>
              <div
                className={type === 5 ? "complete active" : "complete"}
                onClick={() => this.handleComplete()}
              >
                Đã giao
              </div>
              <div
                className={type === 6 ? "cancel active" : "cancel"}
                onClick={() => this.handleCancel()}
              >
                Đã hủy
              </div>
            </div>
          </div>

          <div className="content-type">
            {arrPurchaseOrder && arrPurchaseOrder.length > 0 ? (
              arrPurchaseOrder.map((item, index) => {
                return (
                  <>
                    {type === 1 && (
                      <WaitConfirm
                        item={item}
                        index={index}
                        id={this.props.match.params.id}
                      />
                    )}
                    {type === 2 && (
                      <Confirm
                        item={item}
                        index={index}
                        id={this.props.match.params.id}
                      />
                    )}
                    {type === 3 && (
                      <WaitGoods
                        item={item}
                        index={index}
                        id={this.props.match.params.id}
                      />
                    )}
                    {type === 4 && (
                      <Shipping
                        item={item}
                        index={index}
                        id={this.props.match.params.id}
                      />
                    )}
                    {type === 5 && (
                      <Complete
                        item={item}
                        index={index}
                        id={this.props.match.params.id}
                      />
                    )}
                    {type === 6 && (
                      <CancelPurchaseOrder
                        item={item}
                        index={index}
                        id={this.props.match.params.id}
                      />
                    )}
                    {(type === "" || type === -1) && (
                      <>
                        {item.Status === 1 && (
                          <WaitConfirm
                            item={item}
                            index={index}
                            id={this.props.match.params.id}
                          />
                        )}
                        {item.Status === 2 && (
                          <Confirm
                            item={item}
                            index={index}
                            id={this.props.match.params.id}
                          />
                        )}
                        {item.Status === 3 && (
                          <WaitGoods
                            item={item}
                            index={index}
                            id={this.props.match.params.id}
                          />
                        )}
                        {item.Status === 4 && (
                          <Shipping
                            item={item}
                            index={index}
                            id={this.props.match.params.id}
                          />
                        )}
                        {item.Status === 5 && (
                          <Complete
                            item={item}
                            index={index}
                            id={this.props.match.params.id}
                          />
                        )}
                        {item.Status === 6 && (
                          <CancelPurchaseOrder
                            item={item}
                            index={index}
                            id={this.props.match.params.id}
                          />
                        )}
                      </>
                    )}
                  </>
                );
              })
            ) : (
              <div className="non-item">
                <div className="image"></div>
                <div className="text">Chưa có đơn hàng</div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    purchaseOrder: state.admin.purchaseOrder,
    isLoadingItem: state.admin.isLoadingItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPurchaseOrderRedux: (status, id) =>
      dispatch(actions.fetchPurchaseOrder(status, id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PurchaseOrder)
);
