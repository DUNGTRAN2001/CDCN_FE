import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./PurchaseOrderManage.scss";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import MoldalDetailPurchase from "./MoldalDetailPurchase";
class PurchaseOrderManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPurchaseOrder: [],
      limitPurchaseOrder: 10,
      showData: [],
      isOpenModal: false,
      itemDetail: {},
    };
  }

  componentDidMount() {
    this.props.fetchPurchaseOrderRedux(-1, 0);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.purchaseOrder !== this.props.purchaseOrder) {
      this.setState({
        arrPurchaseOrder: this.props.purchaseOrder,
        showData: this.props.purchaseOrder.slice(
          0,
          this.state.limitPurchaseOrder
        ),
      });
    }
  }
  pagination = (number) => {
    var arr = [];
    for (let i = 1; i <= number; i++) {
      arr.push(i);
    }
    return arr.map((element) => {
      return (
        <div key={element}>
          <button
            className="btn btn-primary mr-3"
            onClick={() => this.nextPage(element)}
          >
            {element}
          </button>
        </div>
      );
    });
  };
  nextPage = (number) => {
    let end = this.state.limitPurchaseOrder * number;
    this.setState({
      showData: this.props.purchaseOrder.slice(end - 10, end),
    });
  };
  handleConfirm = (item) => {
    if (item.Status === 6) {
      toast.error("Đơn đã bị hủy");
      this.props.updateOrderStatusRedux({
        id: item.ID,
        status: 6,
      });
    } else {
      this.props.updateOrderStatusRedux({
        id: item.ID,
        status: 2,
      });
    }
  };
  handleWaitGoods = (item) => {
    if (item.Status === 6) {
      toast.error("Đơn đã bị hủy");
      this.props.updateOrderStatusRedux({
        id: item.ID,
        status: 6,
      });
    } else {
      this.props.updateOrderStatusRedux({
        id: item.ID,
        status: 3,
      });
    }
  };
  handleShipping = (item) => {
    if (item.Status === 6) {
      toast.error("Đơn đã bị hủy");
      this.props.updateOrderStatusRedux({
        id: item.ID,
        status: 6,
      });
    } else {
      this.props.updateOrderStatusRedux({
        id: item.ID,
        status: 4,
      });
    }
  };
  handleComplete = (item) => {
    if (item.Status === 6) {
      toast.error("Đơn đã bị hủy");
      this.props.updateOrderStatusRedux({
        id: item.ID,
        status: 6,
      });
    } else {
      this.props.updateOrderStatusRedux({
        id: item.ID,
        status: 5,
      });
    }
  };
  handleCancel = (item) => {
    if (item.Status === 5) {
      toast.error("Đơn đã hoàn thành không thể hủy");
      this.props.updateOrderStatusRedux({
        id: item.ID,
        status: 5,
      });
    } else {
    }
  };
  handleViewDetail = (item) => {
    this.setState({
      isOpenModal: true,
      itemDetail: item,
    });
  };
  // từ thằng cha truyền sang thằng con
  toggleUserModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };
  render() {
    let { arrPurchaseOrder, showData, itemDetail } = this.state;
    return (
      <div className="purchase-manage-container">
        <MoldalDetailPurchase
          isOpen={this.state.isOpenModal}
          toggleFromParent={this.toggleUserModal}
          dataParent={itemDetail}
        />
        <div className="title">Purchase order manage with dũng trần</div>

        <div className="table-main">
          <table id="tableManageUser">
            <tbody>
              <tr>
                <th>ID đơn hàng</th>
                <th>ID khách hàng</th>
                <th>Chi tiết đơn</th>
                <th>Xác nhận đơn</th>
                <th>Chờ lấy hàng từ shipper</th>
                <th>Đơn đang giao</th>
                <th>Hoàn thành đơn</th>
                <th>Hủy đơn</th>
              </tr>
              {showData &&
                showData.length > 0 &&
                showData.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{item.ID}</td>
                        <td>{item.CreateBy}</td>
                        <td
                          className="detail"
                          onClick={() => this.handleViewDetail(item)}
                        >
                          Chi tiết <i className="fas fa-info-circle"></i>
                        </td>
                        <td
                          className={
                            item.Status === 2 ? "confirm active" : "confirm"
                          }
                          onClick={() => this.handleConfirm(item)}
                        >
                          Xác nhận <i className="fas fa-check-circle"></i>
                        </td>
                        <td
                          className={
                            item.Status === 3
                              ? "wait-goods active"
                              : "wait-goods"
                          }
                          onClick={() => this.handleWaitGoods(item)}
                        >
                          Chờ lấy hàng <i className="fas fa-box"></i>
                        </td>
                        <td
                          className={
                            item.Status === 4 ? "shipping active" : "shipping"
                          }
                          onClick={() => this.handleShipping(item)}
                        >
                          Đang giao <i className="fas fa-shipping-fast"></i>
                        </td>
                        <td
                          className={
                            item.Status === 5 ? "compplete active" : "compplete"
                          }
                          onClick={() => this.handleComplete(item)}
                        >
                          Hoàn thành đơn <i className="far fa-handshake"></i>
                        </td>
                        <td
                          className={
                            item.Status === 6 ? "cancel active" : "cancel"
                          }
                          onClick={() => this.handleCancel(item)}
                        >
                          Hủy đơn <i className="fas fa-trash-alt"></i>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          <div className="pagination">
            {this.pagination(
              arrPurchaseOrder.length % 10 === 0
                ? (arrPurchaseOrder.length / 10) >> 0
                : ((arrPurchaseOrder.length / 10) >> 0) + 1
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    purchaseOrder: state.admin.purchaseOrder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPurchaseOrderRedux: (status, id) =>
      dispatch(actions.fetchPurchaseOrder(status, id)),
    updateOrderStatusRedux: (data) =>
      dispatch(actions.updateOrderStatusService(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchaseOrderManage);
