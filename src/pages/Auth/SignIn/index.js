import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Form, Input, Card, message } from "antd";

import { signIn } from "../../../store/actions/authActions";

const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isUser } = useSelector((state) => state.authReducer);

  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = () => {
    setIsLoading(false);
  };

  const onFailure = (error) => {
    message.error(error);
    setIsLoading(false);
  };

  const onFinish = (values) => {
    dispatch(signIn(values, onSuccess, onFailure));
    setIsLoading(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (isUser) {
      history.push("/user/dashboard");
    }
  }, [isUser]);

  return (
    <>
      <Card
        title={<h1 style={{ textAlign: "center" }}>Sign In</h1>}
        bordered={true}
        className="signIn_main"
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 25,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="UserName"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 9,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default SignIn;
