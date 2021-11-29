import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import Home from "pages/Home";
import Profile from "pages/Profile";
import AddLiterature from "pages/AddLiterature";
import MyCollection from "pages/MyCollection";
import DetailLiterature from "pages/DetailLiterature";
import NotFound from "pages/NotFound";

import PrivateRoute from "PrivateRoute";
import { AuthContext } from "contexts/AuthContext";
import { API, setAuthToken } from "config/api";

import "react-notifications/lib/notifications.css";
import "assets/scss/style.scss";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const { state, dispatch } = useContext(AuthContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status !== 200) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;
      dispatch({
        type: "AUTH_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="App">
      {state.isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center w-100"
          style={{ height: "100vh" }}
        >
          Loading...
        </div>
      ) : (
        <>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/add-literature" component={AddLiterature} />
              <PrivateRoute path="/detail/:id" component={DetailLiterature} />
              <PrivateRoute path="/collection" component={MyCollection} />
              <Route component={NotFound} />
            </Switch>
          </Router>
          <NotificationContainer />
        </>
      )}
    </div>
  );
}

export default App;
