import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  Link,
  useHistory,
} from "react-router-dom";
import { Layout, Menu } from "antd";

import Header from "../components/Header/Header";
import adminRoutes from "../routes/adminRoutes";

const { Header: Content, Sider } = Layout;

function getItem(label, key, isview) {
  return {
    key,
    isview,
    label,
  };
}

const DashboardLayout = () => {
  const history = useHistory();
  let { pathname } = useLocation();
  const { isUser } = useSelector((state) => state.authReducer);

  const [collapsed, setCollapsed] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (isUser == null) {
      history.push("/auth/sign-in");
    }
  }, [isUser]);

  const getRoutes = (routes) => {
    return routes.map((route, key) => {
      if (route.layout === "/user") {
        return (
          <Route
            path={route.layout + route.path}
            component={route.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  useEffect(() => {
    const tempArr = [];
    adminRoutes?.map((route) => {
      if (route.isview) {
        tempArr.push(
          getItem(route.name, route.layout + route.path, route.isview)
        );
      }
    });
    setItems(tempArr);
  }, [adminRoutes, pathname]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo">
          <img
            alt="example"
            src="https://i.pinimg.com/originals/e9/e2/78/e9e2787d0cb55d570fe1c76843506759.jpg"
            className="logo"
          />
        </div>
        <Menu theme="dark" defaultSelectedKeys={[pathname]} mode="inline">
          {items?.map((route) => {
            return (
              <Menu.Item key={route.key}>
                <Link to={route.key} className="nav-text">
                  {route.label}
                </Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            margin: "10px 0px 10px 180px",
            padding: "10px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <Header />
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Switch>
              {getRoutes(adminRoutes)}
              <Redirect from="*" to="/user/callsRecord" />
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
