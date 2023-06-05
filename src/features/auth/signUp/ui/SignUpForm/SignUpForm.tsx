import React from 'react';
import { Button, Card, Form, Input } from 'antd';
import { User } from 'shared';
import { RuleObject } from 'antd/es/form';

type Props = { onSubmit: (formData: User) => void };

export function SignUpForm({ onSubmit }: Props) {
  const [form] = Form.useForm();

  const checkPasswordsEquality = (_: RuleObject, value: string) => {
    if (!value || form.getFieldValue('password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('The two passwords that you entered do not match!'));
  };

  return (
    <Card>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ minWidth: 600 }}
        autoComplete="off"
        onFinish={onSubmit}
      >
        <Form.Item
          label="User name"
          name="userName"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirm"
          rules={[
            { required: true, message: 'Please input your password!' },
            { validator: checkPasswordsEquality },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
