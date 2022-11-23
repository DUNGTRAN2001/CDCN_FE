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
      console.log("check ss", action);
      state.searchResult = action.data;
      return {
        ...state,
      };
    case actionTypes.SEARCH_PRODUCT_FAILED:
      console.log("check f", action);
      state.searchResult = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
