import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.scss";

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };
  return (
    <nav className="nav-extended  teal darken-2">
      <div className="nav-wrapper navigation">
        <a href="/" className="brand-logo">
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          Агро монитор
        </a>
        <ul className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Создать</NavLink>
          </li>
          <li>
            <NavLink to="/links">Ссылки</NavLink>
          </li>
          <li>
            <NavLink to="/quizes">Квизы</NavLink>
          </li>
          <li>
            <NavLink to="/greenhouses">Теплицы</NavLink>
          </li>
          <li>
            <NavLink to="/tables">Таблицы</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Выйти
            </a>
          </li>
        </ul>
      </div>
      <ul className="sidenav" id="mobile-demo">
        <li>
          <a href="sass.html">Sass</a>
        </li>
        <li>
          <a href="badges.html">Components</a>
        </li>
        <li>
          <a href="collapsible.html">Javascript</a>
        </li>
        <li>
          <a href="mobile.html">Mobile</a>
        </li>
      </ul>
      <div className="nav-content">
        <ul className="tabs tabs-transparent">
          <li className="tab">
            <NavLink to="/">Подробности</NavLink>
          </li>
          <li className="tab">
            <NavLink to="/">Подробности</NavLink>
          </li>
          <li className="tab">
            <NavLink to="/">Подробности</NavLink>
          </li>
          <li className="tab">
            <NavLink to="/">Подробности</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
