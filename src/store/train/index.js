import { httpClient } from "src/api/http";
const API_URL = "http://undifinedtrain.azurewebsites.net/api/trains";
const state = {};

const getters = {};

const mutations = {};

const actions = {
  async getListData(ctx, params) {
    try {
      const response = await httpClient.get(`${API_URL}`, {
        params
      });

      return response;
    } catch (error) {
      return { error };
    }
  },
  async createItem(ctx, data) {
    try {
      const response = await httpClient.post(`${API_URL}`, data);

      return response;
    } catch (error) {
      return { error };
    }
  },
  async updateItem(ctx, { id, data }) {
    try {
      const response = await httpClient.put(`${API_URL}/${id}`, data);

      return response;
    } catch (error) {
      return { error };
    }
  },
  async deleteItem(ctx, id) {
    try {
      const response = await httpClient.del(`${API_URL}/${id}`);

      return response;
    } catch (error) {
      return { error };
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
