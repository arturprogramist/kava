import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './Layout.css';

const links = [
  { name: 'home', path: '/' },
  { name: 'to-do', path: '/to-do' },
  { name: 'about', path: '/about' },
  { name: 'login', path: '/login-page' }
];

const Layout = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <div className='container'>
      <header className='header'>
        <div className='logo'>
          <h1>KAVA</h1>
          <button 
            onClick={() => setToggle(!toggle)} 
            className="toggle-button" 
            aria-label="Toggle menu"
          >
            <span className="span-toggle"></span>
            <span className="span-toggle"></span>
            <span className="span-toggle"></span>
          </button>
        </div>
        <nav className={`menu-link ${toggle ? '' : 'nav-hidden'}`} >
          {links.map((link) => (
            <NavLink
              key={link.path}
              className={({ isActive }) =>
                isActive ? 'active-nav-link main-menu-link' : 'main-menu-link'
              }
              to={link.path}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
