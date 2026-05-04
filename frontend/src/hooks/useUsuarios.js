import { useState, useEffect, useCallback } from 'react';
import { usuariosService } from '../services/usuarios.service';

/**
 * Hook para la gestión del estado de usuarios
 */
export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsuarios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await usuariosService.getAll();
      setUsuarios(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUsuario = async (id) => {
    try {
      await usuariosService.delete(id);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  return {
    usuarios,
    loading,
    error,
    fetchUsuarios,
    deleteUsuario,
  };
};
