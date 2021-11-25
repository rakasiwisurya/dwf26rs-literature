import { useState, useContext } from "react";
import { NotificationManager } from "react-notifications";

import Header from "components/Header";
import { ModalLogin } from "elements";

import { AuthContext } from "contexts/AuthContext";

import Books from "assets/images/books.svg";

export default function Landing() {
  const { state, dispatch } = useContext(AuthContext);

  const [show, setShow] = useState({
    login: false,
    register: false,
  });

  console.log(state);

  const handleClose = () => {
    setShow({ login: false, register: false });
  };

  const handleShowLogin = () => {
    setShow((prevState) => ({ ...prevState, login: true }));
  };

  const handleShowRegister = () => {
    setShow((prevState) => ({ ...prevState, register: true }));
  };

  const handleSwitch = () => {
    if (show.login) {
      setShow({ login: false, register: true });
    } else {
      setShow({ login: true, register: false });
    }
  };

  return (
    <>
      <Header />

      <main className="landing">
        <div className="container">
          <div className="row">
            <div
              className="col-auto d-flex flex-column align-items-start justify-content-center"
              style={{ width: 480 }}
            >
              <div className="mb-3">
                <h1 className="fw-bold" style={{ fontSize: 75 }}>
                  source <span className="fst-italic">of</span> intellegence
                </h1>
              </div>

              <div className="mb-3">
                <p style={{ fontSize: 20 }}>
                  Sign-up and receive unlimited accesss to all of your literatur
                  - share your literature.
                </p>
              </div>

              <div className="w-100 row g-4 justify-content-center">
                <div className="col">
                  <button
                    className="btn btn-danger w-100"
                    onClick={handleShowRegister}
                  >
                    Sign Up
                  </button>
                </div>
                <div className="col">
                  <button
                    className="btn btn-light text-dark w-100"
                    onClick={handleShowLogin}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>

            <div className="col d-flex justify-content-end">
              <img src={Books} alt="Books" width="450" height="450" />
            </div>
          </div>
        </div>
      </main>

      <ModalLogin
        show={show.login}
        handleClose={handleClose}
        handleSwitch={handleSwitch}
        dispatch={dispatch}
      />
    </>
  );
}
