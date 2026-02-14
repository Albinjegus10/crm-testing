import React from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined, InstagramOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer: AntFooter } = Layout;
const { Title, Text, Paragraph } = Typography;

const Footer = () => {
  return (
    <AntFooter style={{ background: '#111827', color: '#fff', padding: '60px 24px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: '#fff' }}>Royal Accounts</Title>
            <Paragraph style={{ color: '#9ca3af' }}>
              Professional accounting and financial services for growing businesses across India.
            </Paragraph>
            <div style={{ display: 'flex', gap: 16, fontSize: 20 }}>
              <FacebookOutlined style={{ color: '#9ca3af', cursor: 'pointer' }} />
              <TwitterOutlined style={{ color: '#9ca3af', cursor: 'pointer' }} />
              <LinkedinOutlined style={{ color: '#9ca3af', cursor: 'pointer' }} />
              <InstagramOutlined style={{ color: '#9ca3af', cursor: 'pointer' }} />
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: '#fff' }}>Quick Links</Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link to="/" style={{ color: '#9ca3af' }}>Home</Link>
              <Link to="/services" style={{ color: '#9ca3af' }}>Services</Link>
              <Link to="/about" style={{ color: '#9ca3af' }}>About Us</Link>
              <Link to="/contact" style={{ color: '#9ca3af' }}>Contact</Link>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: '#fff' }}>Services</Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link to="/services" style={{ color: '#9ca3af' }}>GST Filing</Link>
              <Link to="/services" style={{ color: '#9ca3af' }}>Tax Planning</Link>
              <Link to="/services" style={{ color: '#9ca3af' }}>Business Advisory</Link>
              <Link to="/services" style={{ color: '#9ca3af' }}>Audit Services</Link>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: '#fff' }}>Contact Info</Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Text style={{ color: '#9ca3af' }}>
                <PhoneOutlined /> +91 1234567890
              </Text>
              <Text style={{ color: '#9ca3af' }}>
                <MailOutlined /> info@royalaccounts.com
              </Text>
              <Text style={{ color: '#9ca3af' }}>
                <EnvironmentOutlined /> 123 Business Street, City
              </Text>
            </div>
          </Col>
        </Row>

        <div style={{ 
          borderTop: '1px solid #374151', 
          marginTop: 40, 
          paddingTop: 24, 
          textAlign: 'center',
          color: '#9ca3af'
        }}>
          <Text style={{ color: '#9ca3af' }}>
            © 2026 Royal Accounts. All rights reserved. | 
            <Link to="/privacy" style={{ color: '#9ca3af', marginLeft: 8 }}>Privacy Policy</Link> | 
            <Link to="/terms" style={{ color: '#9ca3af', marginLeft: 8 }}>Terms of Service</Link>
          </Text>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
