import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "contexts/AuthContext";

import Logo from "assets/images/literature-small.svg";

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
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {state.user && (
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
                    to=""
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
          </div>
        </div>
      </nav>
    </header>
  );
}
