import axios from 'axios';

const API_URL = 'http://votre-api-backend.com/api';

export const getUserArticles = async () => {
  const response = await axios.get(`${API_URL}/articles/user`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const getFriendsArticles = async () => {
  const response = await axios.get(`${API_URL}/articles/friends`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const getArticleById = async (id) => {
  const response = await axios.get(`${API_URL}/articles/${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const createArticle = async (articleData) => {
  const response = await axios.post(`${API_URL}/articles`, articleData, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const updateArticle = async (id, articleData) => {
  const response = await axios.put(`${API_URL}/articles/${id}`, articleData, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const deleteArticle = async (id) => {
  const response = await axios.delete(`${API_URL}/articles/${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};