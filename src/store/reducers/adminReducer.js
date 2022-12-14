import actionTypes from "../actions/actionTypes";

const initialState = {
  users: [],
  products: [],
  category: [],
  infoProduct: {},
  aUser: {},
  allProductfollowCategory: [],
  orderId: "",
  allProducts: [],
  cartByUserId: [],
  searchResult: [],
  purchaseOrder: [],
  purchaseOrderDetail: [],
  isLoadingItem: false,
  outStandingProduct: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAILED:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_PRODUCTS_BY_TYPE_SUCCESS:
      state.products = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_PRODUCTS_BY_TYPE_FAILED:
      state.products = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_CATEGORY_SUCCESS:
      state.category = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_CATEGORY_FAILED:
      state.category = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_PRODUCTS_BY_ID_SUCCESS:
      state.infoProduct = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_PRODUCTS_BY_ID_FAILED:
      state.infoProduct = {};
      return {
        ...state,
      };
    case actionTypes.FETCH_A_USERS_SUCCESS:
      state.aUser = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_A_USERS_FAILED:
      state.aUser = {};
      return {
        ...state,
      };
    case actionTypes.FETCH_PRODUCTS_BY_CATEGORY_SUCCESS:
      state.allProductfollowCategory = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_PRODUCTS_BY_CATEGORY_FAILED:
      state.allProductfollowCategory = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_PRODUCTS_SUCCESS:
      state.allProducts = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_PRODUCTS_FAILED:
      state.allProducts = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_CART_BY_USER_ID_SUCCESS:
      state.cartByUserId = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_CART_BY_USER_ID_FAILED:
      state.cartByUserId = [];
      return {
        ...state,
      };
    case actionTypes.SEARCH_PRODUCT_SUCCESS:
      state.searchResult = action.data;
      return {
        ...state,
      };
    case actionTypes.SEARCH_PRODUCT_FAILED:
      state.searchResult = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_PURCHASE_ORDER_START:
      state.isLoadingItem = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_PURCHASE_ORDER_SUCCESS:
      state.purchaseOrder = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_PURCHASE_ORDER_FAILED:
      state.purchaseOrder = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_PURCHASE_ORDER_DETAIL_SUCCESS:
      state.purchaseOrderDetail = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_PURCHASE_ORDER_DETAIL_FAILED:
      state.purchaseOrderDetail = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_PRODUCT_OUTSTANDING_SUCCESS:
      console.log("check ss", action);
      state.outStandingProduct = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_PRODUCT_OUTSTANDING_FAILED:
      console.log("check f", action);
      state.outStandingProduct = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
