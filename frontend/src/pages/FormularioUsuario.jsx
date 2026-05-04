import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, X, ArrowLeft } from 'lucide-react';
import { usuariosService } from '../services/usuarios.service';
import { ROUTES } from '../utils/constants';
import { showToast } from '../utils/notifications';
import Button from '../components/Button';
import Input from '../components/Input';
import './FormularioUsuario.css';

const FormularioUsuario = ({ id: propId, onSuccess, onCancel }) => {
  const { id: paramsId } = useParams();
  const navigate = useNavigate();
  const id = propId || paramsId;
  const isEdit = Boolean(id);
  const isModal = Boolean(propId || onSuccess || onCancel);

  const [formData, setFormData] = useState({
    nombre: '',
    correo: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      const fetchUsuario = async () => {
        try {
          const data = await usuariosService.getById(id);
          setFormData({
            nombre: data.nombre,
            correo: data.correo
          });
        } catch (error) {
          showToast('error', error.message);
          if (!isModal) navigate(ROUTES.OPERACIONES);
        } finally {
          setFetching(false);
        }
      };
      fetchUsuario();
    }
  }, [id, isEdit, navigate, isModal]);

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    else if (formData.nombre.length > 120) newErrors.nombre = 'Máximo 120 caracteres';

    if (!formData.correo.trim()) newErrors.correo = 'El correo es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(formData.correo)) newErrors.correo = 'Correo inválido';
    else if (formData.correo.length > 160) newErrors.correo = 'Máximo 160 caracteres';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (isEdit) {
        await usuariosService.update(id, formData);
        showToast('success', 'Usuario actualizado correctamente');
      } else {
        await usuariosService.create(formData);
        showToast('success', 'Usuario creado correctamente');
      }
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate(ROUTES.OPERACIONES);
      }
    } catch (error) {
      showToast('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(ROUTES.OPERACIONES);
    }
  };

  if (fetching) {
    return (
      <div className="form-loader">
        <div className="table-loader__spinner"></div>
        <p>Cargando datos del usuario...</p>
      </div>
    );
  }

  return (
    <div className={`formulario ${!isModal ? 'fade-in' : ''}`}>
      {!isModal && (
        <div className="formulario__header">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCancel}
            className="formulario__back"
          >
            <ArrowLeft size={16} />
            Volver
          </Button>
          <h1 className="formulario__title">
            {isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}
          </h1>
        </div>
      )}

      <form className="formulario__form" onSubmit={handleSubmit}>
        <div className="formulario__body">
          <Input 
            label="Nombre Completo"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            error={errors.nombre}
            placeholder="Ej: Juan Pérez"
            required
          />
          <Input 
            label="Correo Electrónico"
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            error={errors.correo}
            placeholder="Ej: juan@example.com"
            required
          />
        </div>

        <div className="formulario__footer">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            disabled={loading}
          >
            <X size={18} />
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="primary" 
            disabled={loading}
          >
            <Save size={18} />
            {loading ? 'Guardando...' : (isEdit ? 'Actualizar' : 'Guardar')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormularioUsuario;
