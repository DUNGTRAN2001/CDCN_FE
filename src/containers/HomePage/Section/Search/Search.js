import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import HomeHeader from "../../HomeHeader";
import * as actions from "../../../../store/actions";
import { ROOT } from "../../../../utils/constant";
import { toast } from "react-toastify";
import "./Search.scss";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrSearch: [],
      limitProduct: 8,
      showData: [],
    };
  }
  componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.key
    ) {
      let key = this.props.match.params.key;
      this.props.searchProductRedux(key);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.searchResult !== this.props.searchResult) {
      this.setState({
        arrSearch: this.props.searchResult,
        showData: this.props.searchResult.slice(0, this.state.limitProduct),
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
    let end = this.state.limitProduct * number;
    this.setState({
      showData: this.props.searchResult.slice(end - 8, end),
    });
  };
  handleOutOfStock = () => {
    toast.error("Sản phẩm tạm thời hết hàng");
  };
  handleViewDetailProduct = (product) => {
    if (this.props.history) {
      this.props.history.push(`/detail-product/${product.ID}`);
    }
    // console.log("check product", product);
  };
  render() {
    let { showData, arrSearch } = this.state;
    console.log("check arr", arrSearch);
    return (
      <>
        <HomeHeader isShowBanner={false} />
        {showData.length > 0 ? (
          <div className="search-container">
            <div className="search-content">
              {showData &&
                showData.length > 0 &&
                showData.map((item, index) => {
                  let image = `${ROOT.ROOT}/api/Product/GetProductImage?productId=${item.ID}&imgNumber=1`;

                  return (
                    <>
                      {item.Count > 0 ? (
                        <>
                          <div
                            className="section-customize"
                            key={index}
                            onClick={() => this.handleViewDetailProduct(item)}
                          >
                            <div
                              className="bg-image section-products-bg"
                              style={{
                                backgroundImage: `url(${image})`,
                              }}
                            ></div>
                            <div className="content-bg">
                              <div className="title-image">
                                {item.ProductName}
                              </div>
                              <div className="price">{item.PricePerOne}đ</div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div
                          className="section-customize"
                          key={index}
                          onClick={() => this.handleOutOfStock(item)}
                        >
                          <div
                            className="bg-image bg-translucent section-products-bg"
                            style={{
                              backgroundImage: `url(${image})`,
                            }}
                          ></div>
                          <div className="content-bg">
                            <div className="title-image title-out-of-stock">
                              Hết hàng
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
            </div>
            <div className="pagination">
              {this.pagination(
                arrSearch.length % 8 === 0
                  ? (arrSearch.length / 8) >> 0
                  : ((arrSearch.length / 8) >> 0) + 1
              )}
            </div>
          </div>
        ) : (
          <div className="search-no-result">
            <div className="content">
              <div className="image-result"></div>
              <div className="title1">Không tìm thấy kết quả nào</div>
              <div className="title2">
                Hãy thử sử dụng các từ khóa chung chung hơn
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchResult: state.admin.searchResult,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchProductRedux: (key) => dispatch(actions.searchProductService(key)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
