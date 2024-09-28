import axios from 'axios';

const API_URL = 'http://votre-api-backend.com/api';

export const getComments = async (articleId) => {
  const response = await axios.get(`${API_URL}/articles/${articleId}/comments`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const createComment = async (articleId, commentData) => {
  const response = await axios.post(`${API_URL}/articles/${articleId}/comments`, commentData, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await axios.delete(`${API_URL}/comments/${commentId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};