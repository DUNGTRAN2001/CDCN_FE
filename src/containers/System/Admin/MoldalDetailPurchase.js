import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import * as actions from "../../../store/actions";
import "./ModalDetailPurchase.scss";
class ModalDetailPurchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemDetail: [],
      inforUser: {},
      showData: [],
      limitProduct: 3,
    };
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.purchaseOrderDetail !== this.props.purchaseOrderDetail) {
      this.setState({
        itemDetail: this.props.purchaseOrderDetail,
        showData: this.props.purchaseOrderDetail.slice(
          0,
          this.state.limitProduct
        ),
      });
    }
    if (prevProps.aUser !== this.props.aUser) {
      this.setState({
        inforUser: this.props.aUser,
      });
    }
    if (prevProps.dataParent !== this.props.dataParent) {
      this.props.fetchDetailPurchaseOrderRedux(this.props.dataParent.ID);
      this.props.fetchAUsersStart(this.props.dataParent.CreateBy);
    }
  }
  toggle = () => {
    this.props.toggleFromParent();
  };
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
    let end = this.state.limitProduct * number;
    this.setState({
      showData: this.props.purchaseOrderDetail.slice(end - 3, end),
    });
  };
  render() {
    let { itemDetail, inforUser, showData } = this.state;
    console.log("check itemDetail", itemDetail);
    console.log("info", inforUser);
    let sumPrice = 0;
    if (itemDetail && itemDetail.length > 0) {
      itemDetail.map((item) => {
        return (sumPrice += item.PricePerOne * item.ProductCount);
      });
    }

    return (
      <Modal
        //isOpen thu???c t??nh c?? s???n
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>
          <div className="title-modal">Chi ti???t ????n h??ng</div>
        </ModalHeader>
        <ModalBody>
          <>
            <div className="infor-user" key={this.props.index}>
              <div className="name-user">
                H??? v?? t??n : {inforUser.LastName} {inforUser.FirstName}
              </div>
              <div className="address">?????a ch??? : {inforUser.Address}</div>
              <div className="phone-number">
                S??? ??i???n tho???i : {inforUser.PhoneNumber}
              </div>
            </div>
            <div className="infor-order">Th??ng tin ????n h??ng</div>
            {showData &&
              showData.length > 0 &&
              showData.map((item, index) => {
                return (
                  <div className="detail-purchase-order" key={index}>
                    <div className="name-product">
                      T??n s???n ph???m : <span>{item.ProductName}</span>
                    </div>
                    <div className="count-product">
                      S??? l?????ng mua : {item.ProductCount}
                    </div>
                    <div className="price-product">
                      Gi?? s???n ph???m : {item.PricePerOne}??
                    </div>
                    <div className="sum-price-product">
                      T???ng ti???n : {item.ProductCount * item.PricePerOne}??
                    </div>
                    <div className="description-product">
                      M?? t??? :{" "}
                      {item.Description ? item.Description : "Kh??ng c?? m?? t???"}
                    </div>
                  </div>
                );
              })}
            <div className="pagination">
              {this.pagination(
                itemDetail.length % 8 === 0
                  ? (itemDetail.length / 3) >> 0
                  : ((itemDetail.length / 3) >> 0) + 1
              )}
            </div>

            <div className="sum-price-all-product">
              T???ng ti???n t???t c??? : <span>{sumPrice}??</span>
            </div>
          </>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            className="px-3"
            onClick={() => this.toggle()}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    purchaseOrderDetail: state.admin.purchaseOrderDetail,
    aUser: state.admin.aUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAUsersStart: (id) => dispatch(actions.fetchAUsersStart(id)),
    fetchDetailPurchaseOrderRedux: (id) =>
      dispatch(actions.fetchDetailPurchaseOrder(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDetailPurchase);
