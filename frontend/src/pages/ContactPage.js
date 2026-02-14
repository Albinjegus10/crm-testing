import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Card, Form, Input, Button, message } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { leads } from '../services/api';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await leads.submit(values);
      message.success('Thank you! We will contact you within 24 hours.');
      form.resetFields();
    } catch (error) {
      message.error('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Header />
      <Content>
        {/* Hero */}
        <div style={{ 
          background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)', 
          padding: '80px 24px', 
          textAlign: 'center',
          color: 'white'
        }}>
          <Title style={{ color: 'white', fontSize: '2.5rem' }}>Contact Us</Title>
          <Paragraph style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.9)' }}>
            Get in touch with our expert team
          </Paragraph>
        </div>

        {/* Contact Form & Info */}
        <div style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Row gutter={[48, 48]}>
              <Col xs={24} lg={12}>
                <Title level={3}>Send us a Message</Title>
                <Paragraph style={{ color: '#6b7280', marginBottom: 32 }}>
                  Fill out the form and our team will get back to you within 24 hours
                </Paragraph>
                <Form form={form} layout="vertical" onFinish={onSubmit}>
                  <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Please enter your name' }]}>
                    <Input size="large" placeholder="Your name" />
                  </Form.Item>
                  <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email', message: 'Please enter valid email' }]}>
                    <Input size="large" placeholder="your@email.com" />
                  </Form.Item>
                  <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter phone number' }]}>
                    <Input size="large" placeholder="+91 1234567890" />
                  </Form.Item>
                  <Form.Item name="message" label="Message" rules={[{ required: true, message: 'Please enter your message' }]}>
                    <Input.TextArea rows={5} placeholder="Tell us about your requirements" />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading} size="large" block>
                    Send Message
                  </Button>
                </Form>
              </Col>

              <Col xs={24} lg={12}>
                <Title level={3}>Contact Information</Title>
                <Paragraph style={{ color: '#6b7280', marginBottom: 32 }}>
                  Reach out to us through any of the following channels
                </Paragraph>

                <Card style={{ marginBottom: 16 }}>
                  <PhoneOutlined style={{ fontSize: 24, color: '#1e40af', marginRight: 16 }} />
                  <div style={{ display: 'inline-block' }}>
                    <Text strong>Phone</Text>
                    <br />
                    <Text>+91 1234567890</Text>
                  </div>
                </Card>

                <Card style={{ marginBottom: 16 }}>
                  <MailOutlined style={{ fontSize: 24, color: '#1e40af', marginRight: 16 }} />
                  <div style={{ display: 'inline-block' }}>
                    <Text strong>Email</Text>
                    <br />
                    <Text>info@royalaccounts.com</Text>
                  </div>
                </Card>

                <Card style={{ marginBottom: 16 }}>
                  <EnvironmentOutlined style={{ fontSize: 24, color: '#1e40af', marginRight: 16 }} />
                  <div style={{ display: 'inline-block' }}>
                    <Text strong>Address</Text>
                    <br />
                    <Text>123 Business Street, City, State 123456</Text>
                  </div>
                </Card>

                <Card>
                  <ClockCircleOutlined style={{ fontSize: 24, color: '#1e40af', marginRight: 16 }} />
                  <div style={{ display: 'inline-block' }}>
                    <Text strong>Business Hours</Text>
                    <br />
                    <Text>Mon - Sat: 9:00 AM - 6:00 PM</Text>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        {/* Map */}
        <div style={{ padding: '0 24px 80px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Card>
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968482413!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes+Square!5e0!3m2!1sen!2sus!4v1510579767645"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </Card>
          </div>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Contact;
