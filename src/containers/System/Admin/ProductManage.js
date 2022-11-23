import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ProductManage.scss";
import TableMangeProduct from "./TableMangeProduct";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { CRUD_ACTIONS, ROOT } from "../../../utils/constant";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt();
class ProductManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Category: [],
      CategoryId: "",
      ProductName: "",
      Description: "",
      Count: "",
      PricePerOne: "",
      file: [],
      imageProduct: [],
      contentMarkDown: "",
      contentHTML: "",
      action: "",
      productId: "",
      isChange: false,
    };
  }

  componentDidMount() {
    this.props.fetchCategoryProductRedux();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listCategory !== this.props.listCategory) {
      this.setState({
        Category: this.props.listCategory,
        CategoryId:
          this.props.listCategory && this.props.listCategory.length > 0
            ? this.props.listCategory[0].ID
            : "",
      });
    }
    if (prevProps.allProducts !== this.props.allProducts) {
      this.setState({
        CategoryId:
          this.props.listCategory && this.props.listCategory.length > 0
            ? this.props.listCategory[0].ID
            : "",
        ProductName: "",
        Description: "",
        Count: "",
        PricePerOne: "",
        imageProduct: [],
        contentMarkDown: "",
        contentHTML: "",
        action: CRUD_ACTIONS.CREATE,
      });
    }
  }

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleOnChangeImage = (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      if (
        this.state.action === CRUD_ACTIONS.EDIT &&
        this.state.isChange === false
      ) {
        this.setState({
          imageProduct: [objectUrl],
          file: [file],
          isChange: true,
        });
      } else {
        this.setState({
          imageProduct: [...this.state.imageProduct, objectUrl],
          file: [...this.state.file, file],
        });
      }
    }
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "ProductName",
      "Description",
      // "Count",
      "PricePerOne",
      "file",
      "imageProduct",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        toast.warn("This input is required: " + arrCheck[i]);
        break;
      }
    }

    return isValid;
  };
  handleSaveData = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) {
      return;
    }
    let { file, action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      const formData = new FormData();
      formData.append("ProductName", this.state.ProductName);
      formData.append("Description", this.state.Description);
      formData.append("Count", this.state.Count);
      formData.append("PricePerOne", this.state.PricePerOne);
      formData.append("CategoryID", this.state.CategoryId);
      formData.append("HtmlDescription", this.state.contentHTML);
      formData.append("MarkdownDescription", this.state.contentMarkDown);

      if (file && file.length > 0) {
        file.map((item) => {
          formData.append("Imgs", item);
        });
      }
      this.props.createProductRedux(formData);
    }
    if (action === CRUD_ACTIONS.EDIT) {
      const formData = new FormData();
      formData.append("ID", this.state.productId);
      formData.append("ProductName", this.state.ProductName);
      formData.append("ProductName", this.state.ProductName);
      formData.append("Description", this.state.Description);
      formData.append("Count", this.state.Count);
      formData.append("PricePerOne", this.state.PricePerOne);
      formData.append("CategoryID", this.state.CategoryId);
      formData.append("HtmlDescription", this.state.contentHTML);
      formData.append("MarkdownDescription", this.state.contentMarkDown);

      if (file && file.length > 0) {
        file.map((item) => {
          formData.append("Imgs", item);
        });
      }
      this.props.editProductRedux(formData);
    }
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkDown: text,
      contentHTML: html,
    });
  };
  handleEditProductFromParent = (product) => {
    let image = [];
    let arr = [];
    for (let i = 1; i <= product.NumberOfImgs; i++) {
      arr.push(i);
    }
    if (arr && arr.length > 0) {
      arr.map((item) => {
        image.push(
          `${ROOT.ROOT}/api/Product/GetProductImage?productId=${product.ID}&imgNumber=${item}`
        );
      });
    }
    this.setState({
      productId: product.ID,
      CategoryId: product.CategoryID,
      ProductName: product.ProductName,
      Description: product.Description,
      Count: product.Count,
      PricePerOne: product.PricePerOne,
      imageProduct: image,
      contentMarkDown:
        product.MarkdownDescription === null ? "" : product.MarkdownDescription,
      contentHTML:
        product.HtmlDescription === null ? "" : product.HtmlDescription,
      action: CRUD_ACTIONS.EDIT,
      isChange: false,
    });
  };
  render() {
    let {
      ProductName,
      Description,
      Count,
      PricePerOne,
      file,
      imageProduct,
      Category,
      CategoryId,
    } = this.state;
    return (
      <>
        <div className="product-redux-container">
          <div className="title">Manage product with Dũng Trần </div>
          <div className="product-redux-body">
            {/* của bootstrap */}
            <div className="container">
              <div className="row">
                <div className="form group col-12 my-3">
                  {/* <FormattedMessage id="manage-user.add" /> */}
                  Thêm mới sản phẩm
                </div>
                <div className="form-group col-3">
                  <label htmlFor="">
                    {/* <FormattedMessage id="manage-user.email" /> */}
                    ProductName
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={ProductName}
                    onChange={(event) =>
                      this.onChangeInput(event, "ProductName")
                    }
                  />
                </div>
                <div className="form-group col-3">
                  <label htmlFor="">
                    {/* <FormattedMessage id="manage-user.password" /> */}
                    Description
                  </label>
                  {/* <input
                    type="text"
                    className="form-control"
                    value={Description}
                    onChange={(event) =>
                      this.onChangeInput(event, "Description")
                    }
                  /> */}
                  <textarea
                    rows="4"
                    cols="50"
                    className="form-control"
                    value={Description}
                    onChange={(event) =>
                      this.onChangeInput(event, "Description")
                    }
                  />
                </div>
                <div className="form-group col-2">
                  <label htmlFor="">
                    {/* <FormattedMessage id="manage-user.gender" /> */}
                    Category
                  </label>
                  <select
                    className="form-control"
                    onChange={(event) =>
                      this.onChangeInput(event, "CategoryId")
                    }
                    value={CategoryId}
                  >
                    {Category &&
                      Category.length > 0 &&
                      Category.map((item, index) => {
                        return (
                          <option key={index} value={item.ID}>
                            {item.CategoryName}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="form-group col-2">
                  <label htmlFor="">
                    {/* <FormattedMessage id="manage-user.first-name" /> */}
                    Count
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={Count}
                    onChange={(event) => this.onChangeInput(event, "Count")}
                  />
                </div>
                <div className="form-group col-2">
                  <label htmlFor="">
                    {/* <FormattedMessage id="manage-user.last-name" /> */}
                    PricePerOne
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={PricePerOne}
                    onChange={(event) =>
                      this.onChangeInput(event, "PricePerOne")
                    }
                  />
                </div>

                <div className="form-group col-3">
                  <label htmlFor="">
                    {/* <FormattedMessage id="manage-user.image" /> */}
                    Image
                  </label>
                  <div className="preview-img-cotainer">
                    <input
                      id="previewImg"
                      type="file"
                      hidden
                      onChange={(event) => this.handleOnChangeImage(event)}
                    />
                    <label htmlFor="previewImg" className="lable-upload">
                      Tải ảnh <i className="fas fa-upload"></i>
                    </label>
                    {imageProduct &&
                      imageProduct.length > 0 &&
                      imageProduct.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="preview-image"
                            style={{
                              backgroundImage: `url(${item})`,
                            }}
                            // onClick={() => this.openPreviewImg()}
                          ></div>
                        );
                      })}
                  </div>
                </div>
                <div className="col-12 mb-5">
                  <MdEditor
                    style={{ height: "500px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                    value={this.state.contentMarkDown}
                  />
                </div>
                <div
                  className="form-group col-12 mt-3"
                  onClick={() => this.handleSaveData()}
                >
                  <button
                    className={
                      this.state.action === CRUD_ACTIONS.CREATE
                        ? "btn btn-primary"
                        : "btn btn-warning"
                    }
                  >
                    {this.state.action === CRUD_ACTIONS.CREATE
                      ? "Lưu dữ liệu"
                      : "Sửa dữ liệu"}
                  </button>
                </div>

                <div className="col-12 mb-5">
                  <TableMangeProduct
                    handleEditProductFromParent={
                      this.handleEditProductFromParent
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listCategory: state.admin.category,
    allProducts: state.admin.allProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProductRedux: (data) => dispatch(actions.creatProductService(data)),
    fetchCategoryProductRedux: () => dispatch(actions.fetchCategoryProduct()),
    editProductRedux: (data) => dispatch(actions.editProductService(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
