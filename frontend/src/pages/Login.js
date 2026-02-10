import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Typography } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../services/api';
import { useAuth } from '../services/AuthContext';

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await auth.login(values);
      login(response.data.access, response.data.user);
      message.success('Login successful');
      navigate('/dashboard');
    } catch (error) {
      message.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <Card title="Staff Login" style={{ width: 400 }}>
        <Form layout="vertical" onFinish={onSubmit}>
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form>
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <Link to="/forgot-password"><Text type="secondary">Forgot Password?</Text></Link>
          <br />
          <Link to="/signup" style={{ marginTop: 8, display: 'inline-block' }}><Text type="secondary">Create Account</Text></Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
