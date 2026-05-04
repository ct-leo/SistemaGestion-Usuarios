import React from 'react';
import './Button.css';

/**
 * Componente de botón reutilizable
 */
const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  className = '',
  icon: Icon
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn--${variant} btn--${size} ${className}`}
    >
      {Icon && <Icon size={18} className="btn__icon" />}
      {children}
    </button>
  );
};

export default Button;
