import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import decode from "jwt-decode";
import swal from "sweetalert";

import { SIGNIN_SUCCESS } from "../../constants/authConstants";
import { refreshTokenAction } from "../../store/actions/authActions";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleMenuClick = (e) => {
    localStorage.clear();
    dispatch({ type: SIGNIN_SUCCESS, payload: null });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const decodedToken = decode(localStorage.getItem("token"));

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleMenuClick();
      } else if (decodedToken.exp * 1000 - 60000 < new Date().getTime()) {
        // refresh token
        swal({
          title: "Refresh Access Token",
          icon: "warning",
          type: "warning",
          buttons: true,
        }).then(function (isConfirm) {
          if (isConfirm) {
            dispatch(refreshTokenAction());
          }
        });
      }
    }
  }, [location]);

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}></Col>
        <Col span={24} md={18} className="header-control">
          <Button
            placement="bottomLeft"
            icon={<LogoutOutlined />}
            onClick={handleMenuClick}
          >
            Logout
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Header;
