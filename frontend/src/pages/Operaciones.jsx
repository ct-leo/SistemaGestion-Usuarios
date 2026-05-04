import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Plus, Edit, Trash2, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useUsuarios } from '../hooks/useUsuarios';
import { ROUTES } from '../utils/constants';
import { showToast, showConfirmDialog } from '../utils/notifications';
import Table from '../components/Table';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';
import FormularioUsuario from './FormularioUsuario';
import './Operaciones.css';

const Operaciones = () => {
  const navigate = useNavigate();
  const { usuarios, loading, fetchUsuarios, deleteUsuario } = useUsuarios();
  
  // Estados para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  
  // Ordenamiento
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const openCreateModal = () => {
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (id) => {
    setEditingId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleFormSuccess = () => {
    closeModal();
    fetchUsuarios();
  };

  // Lógica de filtrado y ordenamiento
  const filteredUsuarios = useMemo(() => {
    let result = usuarios.filter(u => {
      const matchesName = u.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesEmail = u.correo.toLowerCase().includes(emailFilter.toLowerCase());
      
      let matchesDate = true;
      if (dateStart || dateEnd) {
        const userDate = new Date(u.createdAt);
        if (dateStart && userDate < new Date(dateStart)) matchesDate = false;
        if (dateEnd && userDate > new Date(dateEnd)) matchesDate = false;
      }
      
      return matchesName && matchesEmail && matchesDate;
    });

    // Ordenamiento
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return result;
  }, [usuarios, searchTerm, emailFilter, dateStart, dateEnd, sortConfig]);

  // Lógica de paginación
  const totalPages = Math.ceil(filteredUsuarios.length / itemsPerPage);
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsuarios.slice(start, start + itemsPerPage);
  }, [filteredUsuarios, currentPage, itemsPerPage]);

  const handleDelete = async (id) => {
    const result = await showConfirmDialog(
      '¿Estás seguro?',
      'Esta acción no se puede deshacer.'
    );

    if (result.isConfirmed) {
      const success = await deleteUsuario(id);
      if (success) {
        showToast('success', 'Usuario eliminado correctamente');
      } else {
        showToast('error', 'Error al eliminar el usuario');
      }
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'nombre', label: 'Nombre', sortable: true },
    { key: 'correo', label: 'Correo Electrónico', sortable: true },
    { 
      key: 'createdAt', 
      label: 'Fecha de Creación',
      sortable: true,
      render: (val) => new Date(val).toLocaleDateString()
    }
  ];

  const actions = (row) => (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => openEditModal(row.id)}
      >
        <Edit size={16} />
      </Button>
      <Button 
        variant="danger" 
        size="sm" 
        onClick={() => handleDelete(row.id)}
      >
        <Trash2 size={16} />
      </Button>
    </>
  );

  return (
    <motion.div 
      className="operaciones fade-in"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="operaciones__header">
        <h1 className="operaciones__title">Gestión de Usuarios</h1>
        <Button 
          icon={Plus} 
          onClick={openCreateModal}
        >
          Nuevo Usuario
        </Button>
      </div>

      <div className="operaciones__filters">
        <div className="filter-group">
          <Input 
            placeholder="Buscar por nombre..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-input"
            icon={Search}
          />
          <Input 
            placeholder="Filtrar por correo..." 
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            className="filter-input"
          />
        </div>
        <div className="filter-group">
          <Input 
            type="date" 
            label="Desde"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            className="filter-date"
          />
          <Input 
            type="date" 
            label="Hasta"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
            className="filter-date"
          />
        </div>
      </div>

      <Table 
        columns={columns} 
        data={currentData} 
        actions={actions} 
        loading={loading}
        onSort={handleSort}
        sortConfig={sortConfig}
      />

      <div className="pagination">
        <div className="pagination__info">
          Mostrando {currentData.length} de {filteredUsuarios.length} registros
        </div>
        <div className="pagination__controls">
          <select 
            value={itemsPerPage} 
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="pagination__select"
          >
            <option value={10}>10 por página</option>
            <option value={25}>25 por página</option>
            <option value={50}>50 por página</option>
          </select>
          <div className="pagination__buttons">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              <ChevronLeft size={16} />
            </Button>
            <span className="pagination__page-info">
              Página {currentPage} de {totalPages || 1}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={editingId ? 'Editar Usuario' : 'Nuevo Usuario'}
      >
        <FormularioUsuario 
          id={editingId} 
          onSuccess={handleFormSuccess} 
          onCancel={closeModal} 
        />
      </Modal>
    </motion.div>
  );
};

export default Operaciones;
