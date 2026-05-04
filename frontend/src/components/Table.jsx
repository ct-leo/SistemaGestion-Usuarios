import React from 'react';
import './Table.css';

/**
 * Componente de tabla reutilizable
 */
const Table = ({ columns, data, actions, loading, onSort, sortConfig }) => {
  if (loading) {
    return (
      <div className="table-loader">
        <div className="table-loader__spinner"></div>
        <p>Cargando datos...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div className="table-empty">No se encontraron registros.</div>;
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead className="table__head">
          <tr>
            {columns.map((col) => (
              <th 
                key={col.key} 
                className={`table__th ${col.sortable ? 'table__th--sortable' : ''}`}
                onClick={() => col.sortable && onSort && onSort(col.key)}
              >
                <div className="table__th-content">
                  {col.label}
                  {col.sortable && sortConfig?.key === col.key && (
                    <span className="table__sort-icon">
                      {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
            {actions && <th className="table__th">Acciones</th>}
          </tr>
        </thead>
        <tbody className="table__body">
          {data.map((row, index) => (
            <tr key={row.id || index} className="table__tr">
              {columns.map((col) => (
                <td key={col.key} className="table__td">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              {actions && (
                <td className="table__td table__td--actions">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
