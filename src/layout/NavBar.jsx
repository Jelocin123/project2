import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './layout.scss';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav>
      <ul className="navBar mt-lg-4 mt-2 text-lg-start text-center ms-lg-5 mb-lg-5 mb-0 p-0">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/servicehome">Service Home</NavLink>
        </li>
        <li>
          <NavLink to="/sliderservice">Reviews</NavLink>
        </li>

        <li className="dropdown">
          <li className="dropdown-toggle" onClick={toggleDropdown}>
            Vejret
          </li>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <NavLink to="/vejret">Vejret</NavLink>
              </li>
              <li>
                <NavLink to="/vejretdawamap">Vejret med DAWA <span className='ms-2'>(Og map)</span></NavLink>
              </li>
            </ul>
          )}
        </li>
        <li><NavLink to="/news">News</NavLink></li>

        <li className="dropdown">
          <li className="dropdown-toggle" onClick={toggleDropdown}>
            Energi
          </li>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li><NavLink to="/energidata">EnergiData</NavLink></li>
              <li><NavLink to="/energidato">EnergiDato</NavLink></li>
            </ul>
          )}
        </li>
        <li><NavLink to="/spacex">Space X</NavLink></li>
        




        <li>
          <NavLink to="/admin">ADMIN</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
