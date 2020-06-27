import React from "react";
import "normalize.css";
import useRoutes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar/Navbar";
import Loader from "./components/Loader";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthontificated = !!token;
  const routes = useRoutes(isAuthontificated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <Provider store={store}>
      <AuthContext.Provider
        value={{ token, login, logout, userId, isAuthontificated }}
      >
        <div>
          <Router>
            {isAuthontificated && <Navbar />}
            {routes}
          </Router>
        </div>
      </AuthContext.Provider>
    </Provider>
  );
};

export default App;
