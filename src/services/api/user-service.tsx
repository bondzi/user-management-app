import axios from "axios";

const API_BASE_URL = "https://dummyjson.com";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const userService = {
  getAllUsers: async (
    limit = 30,
    skip = 0
  ): Promise<{ users: User[]; total: number; skip: number; limit: number }> => {
    const response = await axios.get(
      `${API_BASE_URL}/users?limit=${limit}&skip=${skip}`
    );
    return response.data;
  },

  getUser: async (id: number): Promise<User> => {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
  },

  updateUser: async (id: number, userData: Partial<User>): Promise<User> => {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (
    id: number
  ): Promise<User & { isDeleted: boolean; deletedOn: string }> => {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
    return response.data;
  },

  addUser: async (userData: Omit<User, 'id'>): Promise<User> => {
    const response = await axios.post(`${API_BASE_URL}/users/add`, userData);
    return response.data;
  },

  searchUsers: async (
    query: string,
    limit = 30,
    skip = 0
  ): Promise<{ users: User[]; total: number; skip: number; limit: number }> => {
    const response = await axios.get(
      `${API_BASE_URL}/users/search?q=${query}&limit=${limit}&skip=${skip}`
    );
    return response.data;
  },
};

export default userService;
