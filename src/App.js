import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import Landing from "pages/Landing";
import Home from "pages/Home";

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
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          {state.user ? (
            <Route exact path="/" component={Home} />
          ) : (
            <Route exact path="/" component={Landing} />
          )}
        </Switch>
      </Router>
      <NotificationContainer />
    </div>
  );
}

export default App;
