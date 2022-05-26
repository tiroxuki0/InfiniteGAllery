import { Form, Input, Button, Checkbox } from "antd";
import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import loginStateSlice from "./loginStateSlice";
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  width: 100vw;
  height: 100vh;
  z-index: 100000;
`;

const Login = () => {
  const [accounts, setAccounts] = useState([]);
  const dispatch = useDispatch();
  const handleCallApi = () => {
    axios
      .get(`https://nodejsinfinitegallery2022.herokuapp.com/accounts`)
      .then((res) => {
        setAccounts(res.data);
      })
      .catch((err) => console.log(err));
  };
  const onFinish = (values) => {
    if (accounts.length !== 0) {
      let flag = false;
      accounts.forEach((acc) => {
        if (
          acc.username === values.username &&
          acc.password === values.password
        ) {
          flag = true;
        } else {
          flag = false;
        }
      });
      dispatch(loginStateSlice.actions.loginState(flag));
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <FormWrapper>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
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
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={handleCallApi}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
};

export default Login;
