import React, { useState } from 'react';
import { Form, Input, Button, message, Layout, Typography, Card, Row, Col } from 'antd';
import { CheckCircleOutlined, SafetyOutlined, TeamOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { leads } from '../services/api';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await leads.submit(values);
      message.success('Thank you! We will contact you soon.');
      form.resetFields();
    } catch (error) {
      message.error('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Header style={{ background: '#001529', padding: '0 50px', position: 'sticky', top: 0, zIndex: 1 }}>
        <Title level={3} style={{ color: 'white', margin: '16px 0' }}>Royal Accounts</Title>
      </Header>
      
      <Content>
        {/* Hero Section */}
        <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '80px 50px', color: 'white', textAlign: 'center' }}>
          <Title style={{ color: 'white', fontSize: 48 }}>Professional Accounting Services</Title>
          <Paragraph style={{ fontSize: 20, color: 'white' }}>
            Expert financial management and accounting solutions for your business growth
          </Paragraph>
        </div>

        {/* About Section */}
        <div id="about" style={{ padding: '60px 50px', background: '#f5f5f5' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>About Us</Title>
            <Paragraph style={{ fontSize: 16, textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
              Royal Accounts is a leading accounting firm providing comprehensive financial services. 
              With years of experience, we help businesses manage their finances efficiently, ensure compliance, 
              and achieve sustainable growth through expert guidance and innovative solutions.
            </Paragraph>
          </div>
        </div>

        {/* Services Section */}
        <div id="services" style={{ padding: '60px 50px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>Our Services</Title>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <Card hoverable style={{ textAlign: 'center', height: '100%' }}>
                  <CheckCircleOutlined style={{ fontSize: 48, color: '#1890ff', marginBottom: 16 }} />
                  <Title level={4}>GST Filing</Title>
                  <Paragraph>Complete GST registration, filing, and compliance management services</Paragraph>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card hoverable style={{ textAlign: 'center', height: '100%' }}>
                  <SafetyOutlined style={{ fontSize: 48, color: '#52c41a', marginBottom: 16 }} />
                  <Title level={4}>Tax Planning</Title>
                  <Paragraph>Strategic tax planning and advisory to optimize your tax liabilities</Paragraph>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card hoverable style={{ textAlign: 'center', height: '100%' }}>
                  <TeamOutlined style={{ fontSize: 48, color: '#fa8c16', marginBottom: 16 }} />
                  <Title level={4}>Business Advisory</Title>
                  <Paragraph>Expert financial advice to help your business grow and succeed</Paragraph>
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" style={{ padding: '60px 50px', background: '#f5f5f5' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>Contact Us</Title>
            <Row gutter={[48, 48]}>
              <Col xs={24} md={12}>
                <Card>
                  <Title level={4}>Get in Touch</Title>
                  <div style={{ marginTop: 24 }}>
                    <Paragraph><PhoneOutlined /> +91 1234567890</Paragraph>
                    <Paragraph><MailOutlined /> info@royalaccounts.com</Paragraph>
                    <Paragraph><EnvironmentOutlined /> 123 Business Street, City, State 123456</Paragraph>
                  </div>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card title="Send us a message">
                  <Form form={form} layout="vertical" onFinish={onSubmit}>
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter your name' }]}>
                      <Input placeholder="Your name" />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter valid email' }]}>
                      <Input placeholder="your@email.com" />
                    </Form.Item>
                    <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please enter phone number' }]}>
                      <Input placeholder="+91 1234567890" />
                    </Form.Item>
                    <Form.Item name="message" label="Message" rules={[{ required: true, message: 'Please enter message' }]}>
                      <Input.TextArea rows={4} placeholder="How can we help you?" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block size="large">
                      Submit Inquiry
                    </Button>
                  </Form>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', background: '#001529', color: 'white', padding: '24px 50px' }}>
        <div>Royal Accounts © 2026 | Professional Accounting Services.</div>
        <Link to="/login" style={{ color: '#888', fontSize: 12, marginTop: 8, display: 'inline-block' }}>Staff Login</Link>
      </Footer>
    </Layout>
  );
};

export default Home;
