import Swal from 'sweetalert2';

/**
 * Utilidad para mostrar notificaciones Toast usando SweetAlert2
 */
export const showToast = (icon, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon,
    title,
  });
};

/**
 * Diálogo de confirmación
 */
export const showConfirmDialog = async (title, text, confirmButtonText = 'Sí, eliminar') => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText,
    cancelButtonText: 'Cancelar',
  });
};
