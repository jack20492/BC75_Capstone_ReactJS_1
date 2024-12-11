import { Button, Form, Input, message, Space } from "antd";
import axios from "axios";
import { BASE_URL, configHeaders } from "../../api/config";
import { useDispatch } from "react-redux";
import { SET_INFO } from "../../redux/constant/user";
import { useNavigate } from "react-router-dom";
import { userLocalStorage } from "../../api/localService";
import { useEffect, useState } from "react";

// SubmitButton component to handle dynamic enabling/disabling of the submit button
const SubmitButton = ({ form }) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values to enable submit when valid
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
  }, [values, form]);

  return (
    <Button
      type="primary"
      className="bg-blue-500"
      htmlType="submit"
      disabled={!submittable}
    >
      Submit
    </Button>
  );
};

export default function FormLogin() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handles form submission
  const onFinish2 = (values) => {
    axios
      .post(`${BASE_URL}/QuanLyNguoiDung/DangNhap`, values, {
        headers: configHeaders(),
      })
      .then((res) => {
        message.success("Login success!");
        // Store user info in Redux state
        dispatch({
          type: SET_INFO,
          payload: res.data,
        });
        // Store user info in localStorage for persistence
        userLocalStorage.set(res.data);
        // Redirect to homepage after successful login
        navigate("/");
      })
      .catch((err) => {
        message.error("Login failed!");
        console.error(err);
      });
  };

  // Callback for failed form submission
  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish2}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {/* Username Field */}
      <Form.Item
        label="Username"
        name="taiKhoan"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      {/* Password Field */}
      <Form.Item
        label="Password"
        name="matKhau"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      {/* Submit Button and Reset Button */}
      <Form.Item className="flex justify-center">
        <Space>
          <SubmitButton form={form} />
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
