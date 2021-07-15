import axios from "axios";

const api = axios.create({
  // baseURL: `http://localhost:5000`,
  baseURL: `http://diethell.shop/`,
});

const userAPI = {
  login: (data) =>
    api.post(`/users/login`, { userId: data.userId, password: data.password }),
  register: (data) =>
    api.post(`/users/`, {
      userId: data.userId,
      username: data.username,
      password: data.password,
    }),
  getUserData: (id) => api.get(`/users/${id}`),
  like: (data) =>
    api.post(`/users/${data.productId}`, {
      userId: data.userId,
      like: data.isLike,
    }),
};

const productAPI = {
  add: (data) => api.post(`/product`, data),
  edit: (data) => api.put(`/product/${data._id}`, data),
  remove: (id) => api.delete(`/product/${id}`),
  getOne: (id) => api.get(`/product/${id}`),
  getList: (pageNum) => api.get(`/${pageNum}`),
  search: (data) =>
    api.get(
      `/product/search/${data.pageNum}?option=${data.option}&keyword=${data.keyword}`
    ),
};

// const product = {
//   user: {
//     userId: "",
//     username: "",
//     profile: "",
//   },
//   title: "",
//   description: "",
//   productName: "",
//   productCategory: "",
//   price: 0,
//   images: [],
//   imgUploadCnt: 0,
//   insertedAt: 0,
// };

// const user = {
//   userId: "",
//   username: "",
//   userProfile: "",
//   password: "",
//   favorites: [],
// };

export { userAPI, productAPI };
