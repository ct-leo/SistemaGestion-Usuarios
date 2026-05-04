import React from 'react';
import './Switch.css';

/**
 * Componente de interruptor (Switch) reutilizable
 */
const Switch = ({ isOn, handleToggle, label, disabled = false }) => {
  return (
    <div className="switch-container">
      {label && <span className="switch-label">{label}</span>}
      <label className={`switch ${disabled ? 'switch--disabled' : ''}`}>
        <input
          type="checkbox"
          checked={isOn}
          onChange={handleToggle}
          disabled={disabled}
          className="switch__input"
        />
        <span className="switch__slider"></span>
      </label>
    </div>
  );
};

export default Switch;
