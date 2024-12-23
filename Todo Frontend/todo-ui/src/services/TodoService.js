import axios from "axios";
import { getToken,clearToken } from "./AuthService";

const BASE_REST_API_URL = "http://localhost:8080/api/todos";

axios.interceptors.request.use(
  function (config) {
      const token = getToken();
      if (token) {
          console.log('Adding token to request:', token);
          config.headers['Authorization'] = token;
      } else {
          console.warn('No token found for request');
      }
      return config;
  },
  function (error) {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => response,
  error => {
      console.error('Response error:', error.response?.status, error.response?.data);
      if (error.response?.status === 401) {
          // handle unauthorized access
          console.log('Unauthorized access detected');
          clearToken();
            
      }
      return Promise.reject(error);
  }
);


export const getAllTodos = () => axios.get(BASE_REST_API_URL);

export const newTodoToBeAdded = (newTodo) =>
  axios.post(BASE_REST_API_URL, newTodo);

export const getTodoById = (id) => axios.get(`${BASE_REST_API_URL}/${id}`);

export const updateTodo = (id, newTodo) =>
  axios.put(`${BASE_REST_API_URL}/${id}`, newTodo);

export const deleteTodoById = (id) => axios.delete(`${BASE_REST_API_URL}/${id}`)

export const toggleCompleteTodo = (id) => axios.patch(`${BASE_REST_API_URL}/${id}`)
