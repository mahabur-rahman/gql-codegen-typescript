
import type { FormProps } from "antd";
import { Button,  Form, Input } from "antd";

type FieldType = {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;

};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Signup = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="lastName"
      name="lastName"
      rules={[{ required: true, message: "Please input your lastName!" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="firstName"
      name="firstName"
      rules={[{ required: true, message: "Please input your firstName!" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Email"
      name="email"
      rules={[{ required: true, message: "Please input your email!" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: "Please input your password!" }]}
    >
      <Input.Password />
    </Form.Item>


    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
       Sign Up
      </Button>
    </Form.Item>
  </Form>
);

export default Signup;
