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
  /**
   * Fetches a list of users with pagination support
   * @param limit - The maximum number of users to fetch (default: 30)
   * @param skip - The number of users to skip (default: 0)
   * @returns A promise that resolves to an object containing user data and pagination info
   */
  getAllUsers: async (
    limit = 30,
    skip = 0
  ): Promise<{ users: User[]; total: number; skip: number; limit: number }> => {
    const response = await axios.get(
      `${API_BASE_URL}/users?limit=${limit}&skip=${skip}`
    );
    return response.data;
  },

  /**
   * Fetches a single user by their ID
   * @param id - The ID of the user to fetch
   * @returns A promise that resolves to a User object
   */
  getUser: async (id: number): Promise<User> => {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
  },

  /**
   * Updates a user's information
   * @param id - The ID of the user to update
   * @param userData - An object containing the fields to update
   * @returns A promise that resolves to the updated User object
   */
  updateUser: async (id: number, userData: Partial<User>): Promise<User> => {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData);
    return response.data;
  },

  /**
   * Deletes a user
   * @param id - The ID of the user to delete
   * @returns A promise that resolves to an object containing the deleted user's data and deletion info
   */
  deleteUser: async (
    id: number
  ): Promise<User & { isDeleted: boolean; deletedOn: string }> => {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
    return response.data;
  },

  /**
   * Adds a new user
   * @param userData - An object containing the new user's data (excluding the ID)
   * @returns A promise that resolves to the newly created User object
   */
  addUser: async (userData: Omit<User, 'id'>): Promise<User> => {
    const response = await axios.post(`${API_BASE_URL}/users/add`, userData);
    return response.data;
  },

  /**
   * Searches for users based on a query string
   * @param query - The search query
   * @param limit - The maximum number of users to fetch (default: 30)
   * @param skip - The number of users to skip (default: 0)
   * @returns A promise that resolves to an object containing matching user data and pagination info
   */
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
