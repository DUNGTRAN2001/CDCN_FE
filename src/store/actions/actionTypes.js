const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",

  //language
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",

  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",

  //admin
  FETCH_ALL_USERS_SUCCESS: "FETCH_ALL_USERS_SUCCESS",
  FETCH_ALL_USERS_FAILED: "FETCH_ALL_USERS_FAILED",

  FETCH_A_USERS_SUCCESS: "FETCH_A_USERS_SUCCESS",
  FETCH_A_USERS_FAILED: "FETCH_A_USERS_FAILED",

  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
  EDIT_USER_FAILED: "EDIT_USER_FAILED",

  FETCH_PRODUCTS_BY_TYPE_SUCCESS: "FETCH_PRODUCTS_BY_TYPE_SUCCESS",
  FETCH_PRODUCTS_BY_TYPE_FAILED: "FETCH_PRODUCTS_BY_TYPE_FAILED",

  FETCH_CATEGORY_SUCCESS: "FETCH_CATEGORY_SUCCESS",
  FETCH_CATEGORY_FAILED: "FETCH_CATEGORY_FAILED",

  FETCH_PRODUCTS_BY_ID_SUCCESS: "FETCH_PRODUCTS_BY_ID_SUCCESS",
  FETCH_PRODUCTS_BY_ID_FAILED: "FETCH_PRODUCTS_BY_ID_FAILED",

  FETCH_PRODUCTS_BY_CATEGORY_SUCCESS: "FETCH_PRODUCTS_BY_CATEGORY_SUCCESS",
  FETCH_PRODUCTS_BY_CATEGORY_FAILED: "FETCH_PRODUCTS_BY_CATEGORY_FAILED",

  FETCH_ALL_PRODUCTS_SUCCESS: "FETCH_ALL_PRODUCTS_SUCCESS",
  FETCH_ALL_PRODUCTS_FAILED: "FETCH_ALL_PRODUCTS_FAILED",

  CREATE_PRODUCT_SUCCESS: "CREATE_PRODUCT_SUCCESS",
  CREATE_PRODUCT_FAILED: "CREATE_PRODUCT_FAILED",

  DELETE_PRODUCT_SUCCESS: "DELETE_PRODUCT_SUCCESS",
  DELETE_PRODUCT_FAILED: "DELETE_PRODUCT_FAILED",

  EDIT_PRODUCT_SUCCESS: "EDIT_PRODUCT_SUCCESS",
  EDIT_PRODUCT_FAILED: "EDIT_PRODUCT_FAILED",

  FETCH_CART_BY_USER_ID_SUCCESS: "FETCH_CART_BY_USER_ID_SUCCESS",
  FETCH_CART_BY_USER_ID_FAILED: "FETCH_CART_BY_USER_ID_FAILED",

  ADD_PRODUCT_TO_CART_SUCCESS: "ADD_PRODUCT_TO_CART_SUCCESS",
  ADD_PRODUCT_TO_CART_FAILED: "ADD_PRODUCT_TO_CART_FAILED",

  DELETE_PRODUCT_FROM_CART_SUCCESS: "DELETE_PRODUCT_FROM_CART_SUCCESS",
  DELETE_PRODUCT_FROM_CART_FAILED: "DELETE_PRODUCT_FROM_CART_FAILED",

  CREATE_PAY_MENT_SUCCESS: "CREATE_PAY_MENT_SUCCESS",
  CREATE_PAY_MENT_FAILED: "CREATE_PAY_MENT_FAILED",

  EDIT_PRODUCT_TO_CART_SUCCESS: "EDIT_PRODUCT_TO_CART_SUCCESS",
  EDIT_PRODUCT_TO_CART_FAILED: "EDIT_PRODUCT_TO_CART_FAILED",

  SEARCH_PRODUCT_SUCCESS: "SEARCH_PRODUCT_SUCCESS",
  SEARCH_PRODUCT_FAILED: "SEARCH_PRODUCT_FAILED",

  REGISTER_USER_SUCCESS: "REGISTER_USER_SUCCESS",
  REGISTER_USER_FAILED: "REGISTER_USER_FAILED",

  FETCH_PURCHASE_ORDER_START: "FETCH_PURCHASE_ORDER_DETAIL_START",
  FETCH_PURCHASE_ORDER_SUCCESS: "FETCH_PURCHASE_ORDER_SUCCESS",
  FETCH_PURCHASE_ORDER_FAILED: "FETCH_PURCHASE_ORDER_FAILED",

  UPDATE_PURCHASE_ORDER_SUCCESS: "UPDATE_PURCHASE_ORDER_SUCCESS",
  UPDATE_PURCHASE_ORDER_FAILED: "UPDATE_PURCHASE_ORDER_FAILED",

  FETCH_PURCHASE_ORDER_DETAIL_SUCCESS: "FETCH_PURCHASE_ORDER_DETAIL_SUCCESS",
  FETCH_PURCHASE_ORDER_DETAIL_FAILED: "FETCH_PURCHASE_ORDER_DETAIL_FAILED",

  CHANGE_STATUS_PURCHASE_ORDER_SUCCESS: "CHANGE_STATUS_PURCHASE_ORDER_SUCCESS",
  CHANGE_STATUS_PURCHASE_ORDER_FAILED: "CHANGE_STATUS_PURCHASE_ORDER_FAILED",

  FETCH_PRODUCT_OUTSTANDING_SUCCESS: "FETCH_PRODUCT_OUTSTANDING_SUCCESS",
  FETCH_PRODUCT_OUTSTANDING_FAILED: "FETCH_PRODUCT_OUTSTANDING_FAILED",

  CHANGE_PASSWORD_SUCCESS: "CHANGE_PASSWORD_SUCCESS",
  CHANGE_PASSWORD_FAILED: "CHANGE_PASSWORD_FAILED",

  CREATE_ACCOUNT_USER_SUCCESS: "CREATE_ACCOUNT_USER_SUCCESS",
  CREATE_ACCOUNT_USER_FAILED: "CREATE_ACCOUNT_USER_FAILED",

  DELETE_ACCOUNT_USER_SUCCESS: "DELETE_ACCOUNT_USER_SUCCESS",
  DELETE_ACCOUNT_USER_FAILED: "DELETE_ACCOUNT_USER_FAILED",
});

export default actionTypes;
