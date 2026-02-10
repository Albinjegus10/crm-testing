import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../services/api';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      await auth.signup(values);
      message.success('Account created! Please login.');
      navigate('/login');
    } catch (error) {
      message.error(error.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <Card title="Create Account" style={{ width: 400 }}>
        <Form layout="vertical" onFinish={onSubmit}>
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Confirm Password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Sign Up
          </Button>
        </Form>
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
