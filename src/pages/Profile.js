import { useContext } from "react";

import { AuthContext } from "contexts/AuthContext";

import Header from "components/Header";
import MyLiterature from "components/MyLiterature";
import MyProfile from "components/MyProfile";

export default function Profile() {
  const { state } = useContext(AuthContext);

  return (
    <div className="profile">
      <Header />
      <main className="py-4">
        <MyProfile state={state} />
        <MyLiterature state={state} />
      </main>
    </div>
  );
}
