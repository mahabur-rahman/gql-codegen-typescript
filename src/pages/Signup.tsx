import { useMutation } from "@apollo/client";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { SIGN_UP } from "../graphql/mutations/mutations";

interface FieldType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [form] = useForm();

  const [signUp, { loading }] = useMutation(SIGN_UP, {
    onCompleted: () => {
      // Reset form fields on successful signup
      form.resetFields();
      message.success("Sign up successful!");
    },
    onError: (error) => {
      message.error("Sign up failed!");
      console.error("Error:", error);
    },
  });

  const onFinish = async (values: FieldType) => {
    try {
      await signUp({ variables: { signUpDto: values } });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 6, message: "Password must be at least 6 characters long!" },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Signup;
