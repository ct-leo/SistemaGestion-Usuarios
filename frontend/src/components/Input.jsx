import React from 'react';
import './Input.css';

/**
 * Componente de entrada de texto reutilizable
 */
const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label className="form-group__label" htmlFor={name}>
          {label} {required && <span className="form-group__required">*</span>}
        </label>
      )}
      <input
        className={`form-group__input ${error ? 'form-group__input--error' : ''}`}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        {...props}
      />
      {error && <span className="form-group__error-msg">{error}</span>}
    </div>
  );
};

export default Input;
