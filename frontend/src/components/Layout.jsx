import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, PlusCircle, Layout as LayoutIcon } from 'lucide-react';
import { ROUTES } from '../utils/constants';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    { path: ROUTES.HOME, icon: Home, label: 'Inicio' },
    { path: ROUTES.OPERACIONES, icon: Users, label: 'Operaciones' },
  ];

  return (
    <div className="layout">
      <header className="header">
        <div className="header__container container">
          <Link to="/" className="header__logo">
            <LayoutIcon className="header__logo-icon" />
            <span className="header__logo-text">Gestión Usuarios</span>
          </Link>

          <nav className="header__nav">
            <ul className="header__list">
              {menuItems.map((item) => (
                <li key={item.path} className="header__item">
                  <Link
                    to={item.path}
                    className={`header__link ${
                      location.pathname === item.path ? 'header__link--active' : ''
                    }`}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="layout__main container">
        <div className="content">
          {children}
        </div>
      </main>

      <footer className="footer">
        <div className="footer__container container">
          <p className="footer__text">
            © {new Date().getFullYear()} Sistema de Gestión de Usuarios. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
