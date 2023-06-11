import React from 'react';
import { Button, Card, Form, Input } from 'antd';
import { SignInFormData } from 'shared';

type Props = { onSubmit: (formData: SignInFormData) => void; mismatchPasswordError: boolean };

export function SignInForm({ onSubmit, mismatchPasswordError }: Props) {
  return (
    <Card>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        onFinish={onSubmit}
      >
        {mismatchPasswordError ? <Form.Item>Проверьте данные!</Form.Item> : <Form.Item />}
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
