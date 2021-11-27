import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "contexts/AuthContext";

import Logo from "assets/images/literature-small.svg";
import { Dropdown } from "react-bootstrap";

export default function Header() {
  const { state, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <header className="header fixed-top">
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#161616" }}
      >
        <div className="container">
          {state.user?.role === "user" && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  aria-current="page"
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  aria-current="page"
                  to="/collection"
                >
                  My Collection
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  aria-current="page"
                  to="/add-literature"
                >
                  Add Literature
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  aria-current="page"
                  to="/"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
            </ul>
          )}

          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="Literature Logo" />
          </Link>

          {state.user?.role === "admin" && (
            <Dropdown>
              <Dropdown.Toggle as="a" id="dropdown-avatar">
                <img
                  src={state.user?.avatar}
                  alt="Avatar"
                  width="40"
                  height="40"
                  className="border border-3 border-light rounded-circle"
                  style={{ cursor: "pointer" }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>
                  <div className="d-flex align-items-center">
                    <i className="fas fa-sign-out-alt text-danger fs-4"></i>
                    <span className="ms-3 fw-bold">Logout</span>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </nav>
    </header>
  );
}
