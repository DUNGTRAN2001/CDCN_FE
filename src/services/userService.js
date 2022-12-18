import axios from "../axios";
const handleLoginApi = (email, password) => {
  return axios.post("/api/User/UserLogin", { email, password });
};

const getAllUser = () => {
  return axios.get("/api/UserInfo/GetUserInfos");
};
// "/api/UserInfo/EditUserInfo"

const editImageService = (input) => {
  return axios.put("/api/UserInfo/EditUserInfo", input);
};
const getProductsByType = (id, limit) => {
  return axios.get(
    `/api/Product/GetProducts?categoryId=${id}&recordQuantity=${limit}`
  );
};

const getCategory = () => {
  return axios.get("/api/Category/GetCategories");
};
const getProductById = (productId) => {
  return axios.get(`/api/Product/GetProductById?id=${productId}`);
};
const getAUserInFoByID = (id) => {
  return axios.get(`/api/UserInfo/GetUserInfoByID/${id}`);
};
const getProductsByCategory = (id, limit) => {
  return axios.get(
    `/api/Product/GetProducts?categoryId=${id}&recordQuantity=${limit}`
  );
};
const getAllProducts = () => {
  return axios.get("/api/Product/GetProducts");
};
const createOrderForCart = () => {
  return axios.post("/api/Order/CreateOrder");
};
const CreateProduct = (data) => {
  return axios.post("/api/Product/CreateProduct", data);
};
const DeleteProduct = (productId) => {
  return axios.delete(`/api/Product/DeleteProduct?id=${productId}`);
};
const EditProduct = (data) => {
  return axios.put("/api/Product/UpdateProduct", data);
};
const getCartByUserId = (userId) => {
  return axios.get(`/api/Cart/GetCartItemsByUserID?id=${userId}`);
};
const addProductToCart = (product) => {
  return axios.post("/api/Cart/AddProductToCart", product);
};
const editProductToCart = (product) => {
  return axios.put("/api/Cart/EditCartItem", product);
};
const deleteProductFromCart = (id) => {
  return axios.delete(`/api/Cart/DeleteCartItemByID?id=${id}`);
};
const createPayMent = (data) => {
  return axios.post("/api/Cart/OnPayment", data);
};
const searchProduct = (key) => {
  return axios.get(`/api/Product/GetProducts?productName=${key}`);
};
const registerUser = (data) => {
  return axios.post("/api/User/UserRegister", data);
};
const getPurchaseOrder = (status, userID) => {
  return axios.get(`/api/Order/GetOrders?status=${status}&userID=${userID}`);
};
const updateOrderStatus = (data) => {
  return axios.put("/api/Order/UpdateOrderStatus", data);
};
const getDetailPurchaseOrder = (id) => {
  return axios.get(`/api/Order/GetOrderDetailsByOrderID?id=${id}`);
};
const getProductsOutStanding = () => {
  return axios.get("/api/Product/GetProducts");
};
const changePasswordUser = (data) => {
  return axios.put("/api/User/ChangePassword", data);
};
const createAccountUser = (data) => {
  return axios.post("/api/User/UserRegisterFull", data);
};
export {
  handleLoginApi,
  getAllUser,
  editImageService,
  getProductsByType,
  getCategory,
  getProductById,
  getAUserInFoByID,
  getProductsByCategory,
  createOrderForCart,
  getAllProducts,
  CreateProduct,
  DeleteProduct,
  EditProduct,
  getCartByUserId,
  addProductToCart,
  deleteProductFromCart,
  createPayMent,
  editProductToCart,
  searchProduct,
  registerUser,
  getPurchaseOrder,
  updateOrderStatus,
  getDetailPurchaseOrder,
  getProductsOutStanding,
  changePasswordUser,
  createAccountUser,
};
