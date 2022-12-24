import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import authRoutes from "../routes/authRoutes";

const AuthLayout = () => {
  const { isUser } = useSelector((state) => state.authReducer);
  const history = useHistory();

  const getRoutes = (routes) => {
    return routes.map((route, key) => {
      if (route.layout === "/auth") {
        return (
          <Route
            path={route.layout + route.path}
            component={route.component}
            key={key}
            exact
          />
        );
      } else {
        return null;
      }
    });
  };

  useEffect(() => {
    if (isUser !== null) {
      history.push("/user/callsRecord");
    }
  }, [isUser]);
  return (
    <>
      <Switch>
        {getRoutes(authRoutes)}
        <Redirect from="*" to="/auth/sign-in" />
      </Switch>
    </>
  );
};

export default AuthLayout;
