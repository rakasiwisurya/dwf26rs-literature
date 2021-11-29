import { useContext } from "react";

import { AuthContext } from "contexts/AuthContext";

import Header from "components/Header";
import Landing from "./Landing";
import AdminHome from "components/AdminHome";
import UserHome from "components/UserHome";

export default function Home() {
  const { state } = useContext(AuthContext);

  return (
    <div className="home">
      <Header />

      {!state.isLogin && <Landing />}
      {state.user?.role === "admin" && <AdminHome />}
      {state.user?.role === "user" && <UserHome />}
    </div>
  );
}
