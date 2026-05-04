import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor para manejo de errores global
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message: error.response?.data?.error || 'Ocurrió un error inesperado',
      status: error.response?.status || 500,
    };
    return Promise.reject(customError);
  }
);

export const usuariosService = {
  /**
   * Obtiene todos los usuarios
   */
  getAll: async () => {
    try {
      const response = await api.get('/usuarios');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtiene un usuario por ID
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Crea un nuevo usuario
   */
  create: async (usuario) => {
    try {
      const response = await api.post('/usuarios', usuario);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualiza un usuario existente
   */
  update: async (id, usuario) => {
    try {
      const response = await api.put(`/usuarios/${id}`, usuario);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Elimina un usuario por ID
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Verifica el estado de la API
   */
  checkHealth: async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
