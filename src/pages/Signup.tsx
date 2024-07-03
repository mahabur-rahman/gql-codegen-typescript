import { useMutation } from "@apollo/client";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { SIGN_UP } from "../graphql/mutations/mutations";
import { useNavigate } from "react-router-dom";
import { ChangeEvent } from "react";

interface FieldType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image?: File;
}

type UploadChangeEvent = ChangeEvent<HTMLInputElement> & {
  fileList: FileList | null; // Add fileList property to handle file uploads
};

const Signup = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const [signUp, { loading }] = useMutation(SIGN_UP, {
    onCompleted: () => {
      form.resetFields();
      message.success("Sign up successful!");
      navigate('/signin');
    },
    onError: (error) => {
      message.error("Sign up failed!");
      console.error("Error:", error);
    },
  });

  const onFinish = async (values: FieldType) => {
    try {
      const { image, ...restValues } = values;
      
      // Upload image to Cloudinary if selected
      let imageUrl;
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "reactNestGql");
        
        const response = await fetch("https://api.cloudinary.com/v1_1/dowpna0vx/image/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        imageUrl = data.secure_url;
      }

      const res = await signUp({ variables: { signUpDto: { ...restValues, image: imageUrl } } });
      if(res) {
        navigate('/signin');
      }
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

      <Form.Item
        label="Profile Image"
        name="image"
        rules={[{ required: true, message: "Please upload your profile image!" }]}
        valuePropName="fileList"
        getValueFromEvent={(e: UploadChangeEvent) => e.fileList}
      >
        <input type="file" accept="image/*" onChange={(e) => form.setFieldsValue({ image: e.target.files?.[0] })} />
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
