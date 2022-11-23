import React, { Component } from "react";
import { connect } from "react-redux";

class DescriptionProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snpashot) {}
  render() {
    let { detailProduct } = this.props;
    return (
      <div className="description-container">
        <div className="description-content">
          <div className="title-description">Mô tả sản phẩm</div>
          {detailProduct && detailProduct.HtmlDescription && (
            <div
              dangerouslySetInnerHTML={{
                __html: detailProduct.HtmlDescription,
              }}
            ></div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionProduct);
