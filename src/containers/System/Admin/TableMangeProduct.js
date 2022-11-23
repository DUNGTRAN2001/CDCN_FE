import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageProduct.scss";
import * as actions from "../../../store/actions";
import { ROOT } from "../../../utils/constant";

class TableManageProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProducts: [],
      limitProduct: 5,
      listCategory: [],
      showData: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllProductRedux();
    this.props.fetchCategoryProductRedux();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allProducts !== this.props.allProducts) {
      this.setState({
        listProducts: this.props.allProducts,
        showData: this.props.allProducts.slice(0, this.state.limitProduct),
      });
    }
    if (prevProps.allCategory !== this.props.allCategory) {
      this.setState({
        listCategory: this.props.allCategory,
      });
    }
  }
  pagination = (number) => {
    var arr = [];
    for (let i = 1; i < number; i++) {
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
    console.log(number);
    let end = this.state.limitProduct * number;
    this.setState({
      showData: this.props.allProducts.slice(end - 5, end),
    });
  };
  handleDeleteUser = (product) => {
    this.props.deleteProductRedux(product.ID);
  };
  handleEditUser = (product) => {
    this.props.handleEditProductFromParent(product);
  };
  render() {
    let { listProducts, listCategory, showData } = this.state;
    return (
      <>
        <table id="tableManageProduct">
          <tbody>
            <tr>
              <th>Product Id</th>
              <th>Product Name</th>
              <th>Category </th>
              <th>Count</th>
              <th>Product Image</th>
              <th>Action</th>
            </tr>
            {showData &&
              showData.length > 0 &&
              showData.map((item, index) => {
                return (
                  <tr key={index}>
                    {/* <td>{item.email}</td> */}
                    <td>{item.ID}</td>
                    <td>{item.ProductName}</td>
                    <td>{item.CategoryID}</td>
                    <td>{item.Count}</td>
                    <td>
                      <img
                        src={`${ROOT.ROOT}/api/Product/GetProductImage?productId=${item.ID}&imgNumber=1`}
                        alt=""
                      />
                    </td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditUser(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteUser(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="pagination">
          {this.pagination(
            listProducts.length % 5 === 0
              ? listProducts.length / 5
              : listProducts.length / 5 + 1
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allProducts: state.admin.allProducts,
    allCategory: state.admin.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProductRedux: () => dispatch(actions.fetchAllProduct()),
    fetchCategoryProductRedux: () => dispatch(actions.fetchCategoryProduct()),
    deleteProductRedux: (id) => dispatch(actions.deleteProductService(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageProduct);
