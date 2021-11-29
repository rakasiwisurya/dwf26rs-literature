import { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "contexts/AuthContext";

export default function LoggedIn() {
  const history = useHistory();

  const { state } = useContext(AuthContext);

  const handleToHome = () => {
    history.push("/home");
  };

  return (
    <div
      className="logged-in d-flex justify-content-center align-items-center w-100"
      style={{ height: "100vh" }}
    >
      <div className="d-flex flex-column align-items-center">
        <div className="fw-bold mb-3">
          You are logged in as {state.user.fullname}
        </div>
        <button className="btn btn-danger" onClick={handleToHome}>
          Back To Home
        </button>
      </div>
    </div>
  );
}
