import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Result } from 'antd';
import { Link } from 'react-router-dom';
import { auth } from '../services/api';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await auth.forgotPassword(values);
      setSent(true);
      message.success('Password reset instructions sent to your email');
    } catch (error) {
      message.error('Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
        <Card style={{ width: 400 }}>
          <Result
            status="success"
            title="Check Your Email"
            subTitle="Password reset instructions have been sent to your email address."
            extra={<Link to="/login"><Button type="primary">Back to Login</Button></Link>}
          />
        </Card>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <Card title="Forgot Password" style={{ width: 400 }}>
        <Form layout="vertical" onFinish={onSubmit}>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="Enter your email address" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Send Reset Link
          </Button>
        </Form>
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <Link to="/login">Back to Login</Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
