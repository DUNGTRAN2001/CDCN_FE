import actionTypes from "./actionTypes";
import {
  getAllUser,
  editImageService,
  getProductsByType,
  getCategory,
  getProductById,
  getAUserInFoByID,
  getProductsByCategory,
  getAllProducts,
  DeleteProduct,
  CreateProduct,
  EditProduct,
  getCartByUserId,
  addProductToCart,
  deleteProductFromCart,
  createPayMent,
  editProductToCart,
  searchProduct,
} from "../../services/userService";
import { toast } from "react-toastify";

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUser();
      if (res && res.isSuccess === true) {
        // sort lại
        dispatch(fetchAllUsersSuccess(res.Data.reverse()));
      } else {
        dispatch(fetchAllUsersFail());
      }
    } catch (error) {
      dispatch(fetchAllUsersFail());
      console.log("fetchAllUsersStart:", error);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUsersFail = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editImageService(data);
      if (res && res.isSuccess === true) {
        toast.success("Chỉnh sửa thông tin thành công!");
        dispatch(editImageSuccess());
      } else {
        dispatch(editImageFail());
        toast.error("Edit info user fail!");
      }
    } catch (error) {
      dispatch(editImageFail());
      console.log("editUserFail:", error);
    }
  };
};
export const editImageSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editImageFail = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchProductByCategoryId = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getProductsByType(id, "8");
      if (res && res.isSuccess === true) {
        dispatch(fetchProductByTypeSuccess(res.Data));
      } else {
        dispatch(fetchProductByTypeFail());
      }
    } catch (error) {
      dispatch(fetchProductByTypeFail());
      console.log("fetchProductByTypeFail:", error);
    }
  };
};
export const fetchProductByTypeSuccess = (data) => ({
  type: actionTypes.FETCH_PRODUCTS_BY_TYPE_SUCCESS,
  data: data,
});
export const fetchProductByTypeFail = () => ({
  type: actionTypes.FETCH_PRODUCTS_BY_TYPE_FAILED,
});

export const fetchCategoryProduct = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getCategory();

      if (res && res.isSuccess === true) {
        dispatch(fetchCategorySuccess(res.Data));
      } else {
        dispatch(fetchCategoryFail());
      }
    } catch (error) {
      dispatch(fetchCategoryFail());
      console.log("fetchCategoryFail:", error);
    }
  };
};

export const fetchCategorySuccess = (data) => ({
  type: actionTypes.FETCH_CATEGORY_SUCCESS,
  data: data,
});

export const fetchCategoryFail = () => ({
  type: actionTypes.FETCH_CATEGORY_FAILED,
});

export const fetchProductById = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getProductById(id);
      if (res && res.isSuccess === true) {
        dispatch(fetchProductByIdSuccess(res.Data["0"]));
      } else {
        dispatch(fetchProductByIdFail());
      }
    } catch (error) {
      dispatch(fetchProductByIdFail());
      console.log("fetchProductByIdFail:", error);
    }
  };
};

export const fetchProductByIdSuccess = (data) => ({
  type: actionTypes.FETCH_PRODUCTS_BY_ID_SUCCESS,
  data: data,
});

export const fetchProductByIdFail = () => ({
  type: actionTypes.FETCH_PRODUCTS_BY_ID_FAILED,
});

export const fetchAUsersStart = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAUserInFoByID(id);
      if (res && res.isSuccess === true) {
        dispatch(fetchAUsersSuccess(res.Data[0]));
      } else {
        dispatch(fetchAUsersFail());
      }
    } catch (error) {
      dispatch(fetchAUsersFail());
      console.log("fetchAUsersFail:", error);
    }
  };
};

export const fetchAUsersSuccess = (data) => ({
  type: actionTypes.FETCH_A_USERS_SUCCESS,
  data: data,
});

export const fetchAUsersFail = () => ({
  type: actionTypes.FETCH_A_USERS_FAILED,
});

export const fetchAllProductByCategoryId = (id, limit) => {
  return async (dispatch, getState) => {
    try {
      let res = await getProductsByCategory(id, limit);
      if (res && res.isSuccess === true) {
        dispatch(fetchAllProductByTypeSuccess(res.Data));
      } else {
        dispatch(fetchAllProductByTypeFail());
      }
    } catch (error) {
      dispatch(fetchAllProductByTypeFail());
      console.log("fetchAllProductByTypeFail:", error);
    }
  };
};

export const fetchAllProductByTypeSuccess = (data) => ({
  type: actionTypes.FETCH_PRODUCTS_BY_CATEGORY_SUCCESS,
  data: data,
});
export const fetchAllProductByTypeFail = () => ({
  type: actionTypes.FETCH_PRODUCTS_BY_CATEGORY_FAILED,
});

export const fetchAllProduct = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllProducts();
      if (res && res.isSuccess === true) {
        dispatch(fetchAllProductSuccess(res.Data));
      } else {
        dispatch(fetchAllProductFail());
      }
    } catch (error) {
      dispatch(fetchAllProductFail());
      console.log("fetchAllProductFail:", error);
    }
  };
};
export const fetchAllProductSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_PRODUCTS_SUCCESS,
  data: data,
});
export const fetchAllProductFail = () => ({
  type: actionTypes.FETCH_ALL_PRODUCTS_FAILED,
});

export const creatProductService = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await CreateProduct(data);
      console.log("check res", res);
      if (res && res.isSuccess === true) {
        toast.success("Save product success!");
        dispatch(creatProductSuccess());
        dispatch(fetchAllProduct());
      } else {
        toast.error("Save product fail!");
        dispatch(creatProductFail());
      }
    } catch (error) {
      dispatch(creatProductFail());
      console.log("creatProductFail:", error);
    }
  };
};

export const creatProductSuccess = () => ({
  type: actionTypes.CREATE_PRODUCT_SUCCESS,
});
export const creatProductFail = () => ({
  type: actionTypes.CREATE_PRODUCT_FAILED,
});

export const deleteProductService = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await DeleteProduct(id);
      console.log("check res", res);
      if (res && res.isSuccess === true) {
        toast.success("Delete product success!");
        dispatch(deleteProductSuccess());
        dispatch(fetchAllProduct());
      } else {
        toast.error("Delete product fail!");
        dispatch(deleteProductFail());
      }
    } catch (error) {
      dispatch(deleteProductFail());
      console.log("deleteProductFail:", error);
    }
  };
};

export const deleteProductSuccess = () => ({
  type: actionTypes.DELETE_PRODUCT_SUCCESS,
});
export const deleteProductFail = () => ({
  type: actionTypes.DELETE_PRODUCT_FAILED,
});

export const editProductService = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await EditProduct(data);
      console.log("check res", res);
      if (res && res.isSuccess === true) {
        toast.success("Edit product success!");
        dispatch(editProductSuccess());
        dispatch(fetchAllProduct());
      } else {
        toast.error("Edit product fail!");
        dispatch(editProductFail());
      }
    } catch (error) {
      dispatch(editProductFail());
      console.log("editProductFail:", error);
    }
  };
};

export const editProductSuccess = () => ({
  type: actionTypes.EDIT_PRODUCT_SUCCESS,
});
export const editProductFail = () => ({
  type: actionTypes.EDIT_PRODUCT_FAILED,
});

export const fetchCartByUserId = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await getCartByUserId(userId);
      if (res && res.isSuccess === true) {
        dispatch(fetchCartByUserIdSuccess(res.Data));
      } else {
        dispatch(fetchCartByUserIdFail());
      }
    } catch (error) {
      dispatch(fetchCartByUserIdFail());
      console.log("fetchCartByUserIdFail:", error);
    }
  };
};

export const fetchCartByUserIdSuccess = (data) => ({
  type: actionTypes.FETCH_CART_BY_USER_ID_SUCCESS,
  data: data,
});

export const fetchCartByUserIdFail = () => ({
  type: actionTypes.FETCH_CART_BY_USER_ID_FAILED,
});

export const addProductToCartService = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await addProductToCart(data);
      if (res && res.isSuccess === true) {
        toast.success("Thêm sản phẩm vào giỏ hàng thành công!");
        dispatch(addProductToCartSuccess());
      } else {
        dispatch(addProductToCartFail());
      }
    } catch (error) {
      dispatch(addProductToCartFail());
      console.log("addProductToCartFail:", error);
    }
  };
};

export const addProductToCartSuccess = () => ({
  type: actionTypes.ADD_PRODUCT_TO_CART_SUCCESS,
});

export const addProductToCartFail = () => ({
  type: actionTypes.ADD_PRODUCT_TO_CART_FAILED,
});

export const deleteProductFromCartService = (id, userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteProductFromCart(id);
      console.log("check res", res);
      if (res && res.isSuccess === true) {
        toast.success("Xóa sản phẩm thành công!");
        dispatch(deleteProductFromCartSuccess(id));
        dispatch(fetchCartByUserId(userId));
      } else {
        dispatch(deleteProductFromCartFail());
      }
    } catch (error) {
      dispatch(deleteProductFromCartFail());
      console.log("deleteProductFromCartFail:", error);
    }
  };
};

export const deleteProductFromCartSuccess = () => ({
  type: actionTypes.DELETE_PRODUCT_FROM_CART_SUCCESS,
});
export const deleteProductFromCartFail = () => ({
  type: actionTypes.DELETE_PRODUCT_FROM_CART_FAILED,
});

export const createPayMentService = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createPayMent(data);
      if (res && res.isSuccess === true) {
        toast.success("Mua sản phẩm thành công!");
        dispatch(createPayMentSuccess());
      } else {
        dispatch(createPayMentFail());
      }
    } catch (error) {
      dispatch(createPayMentFail());
      console.log("createPayMentFail:", error);
    }
  };
};

export const createPayMentSuccess = () => ({
  type: actionTypes.CREATE_PAY_MENT_SUCCESS,
});

export const createPayMentFail = () => ({
  type: actionTypes.CREATE_PAY_MENT_FAILED,
});

export const editProductToCartService = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editProductToCart(data);
      if (res && res.isSuccess === true) {
        dispatch(editProductToCartSuccess());
      } else {
        dispatch(editProductToCartFail());
      }
    } catch (error) {
      dispatch(editProductToCartFail());
      console.log("editProductToCartFail:", error);
    }
  };
};

export const editProductToCartSuccess = () => ({
  type: actionTypes.EDIT_PRODUCT_TO_CART_SUCCESS,
});

export const editProductToCartFail = () => ({
  type: actionTypes.EDIT_PRODUCT_TO_CART_FAILED,
});

export const searchProductService = (key) => {
  return async (dispatch, getState) => {
    try {
      let res = await searchProduct(key);
      if (res && res.isSuccess === true) {
        dispatch(searchProductSuccess(res.Data));
      } else {
        dispatch(searchProductFail());
      }
    } catch (error) {
      dispatch(searchProductFail());
      console.log("searchProductFail:", error);
    }
  };
};

export const searchProductSuccess = (data) => ({
  type: actionTypes.SEARCH_PRODUCT_SUCCESS,
  data: data,
});

export const searchProductFail = () => ({
  type: actionTypes.SEARCH_PRODUCT_FAILED,
});
