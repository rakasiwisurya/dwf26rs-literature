import { useContext } from "react";

import { AuthContext } from "contexts/AuthContext";

import Header from "components/Header";
import AdminHome from "components/AdminHome";
import UserHome from "components/UserHome";

export default function Home() {
  const { state } = useContext(AuthContext);
  console.log(state);

  return (
    <div className="home">
      <Header />
      {!state.user && (
        <div
          className="d-flex justify-content-center align-items-center w-100"
          style={{ height: "100vh" }}
        >
          Hello World
        </div>
      )}
      {state.user?.role === "admin" && <AdminHome />}
      {state.user?.role === "user" && <UserHome />}
    </div>
  );
}
