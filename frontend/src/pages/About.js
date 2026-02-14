import React from 'react';
import { Layout, Typography, Row, Col, Card } from 'antd';
import { TrophyOutlined, SafetyOutlined, TeamOutlined, RocketOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const About = () => {
  const values = [
    { icon: <TrophyOutlined />, title: 'Excellence', desc: 'Committed to delivering the highest quality services' },
    { icon: <SafetyOutlined />, title: 'Integrity', desc: 'Maintaining transparency and ethical practices' },
    { icon: <TeamOutlined />, title: 'Client Focus', desc: 'Your success is our priority' },
    { icon: <RocketOutlined />, title: 'Innovation', desc: 'Leveraging technology for better solutions' }
  ];

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
          <Title style={{ color: 'white', fontSize: '2.5rem' }}>About Royal Accounts</Title>
          <Paragraph style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.9)' }}>
            Your trusted partner in financial success
          </Paragraph>
        </div>

        {/* Story */}
        <div style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>Our Story</Title>
            <Paragraph style={{ fontSize: 16, textAlign: 'center', color: '#6b7280', marginBottom: 24 }}>
              Founded in 2010, Royal Accounts has grown to become one of India's leading accounting firms. 
              With over 15 years of experience, we have helped more than 500 businesses achieve their financial goals.
            </Paragraph>
            <Paragraph style={{ fontSize: 16, textAlign: 'center', color: '#6b7280' }}>
              Our team of certified professionals brings expertise in GST, taxation, auditing, and business advisory. 
              We combine traditional accounting principles with modern technology to deliver efficient, accurate, and timely services.
            </Paragraph>
          </div>
        </div>

        {/* Mission & Vision */}
        <div style={{ padding: '80px 24px', background: '#f9fafb' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Row gutter={[48, 48]}>
              <Col xs={24} md={12}>
                <Card>
                  <Title level={3}>Our Mission</Title>
                  <Paragraph style={{ fontSize: 16, color: '#6b7280' }}>
                    To empower businesses with expert financial guidance, ensuring compliance, 
                    optimizing tax efficiency, and driving sustainable growth through innovative accounting solutions.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card>
                  <Title level={3}>Our Vision</Title>
                  <Paragraph style={{ fontSize: 16, color: '#6b7280' }}>
                    To be India's most trusted accounting firm, recognized for excellence, integrity, 
                    and transforming the way businesses manage their finances.
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        {/* Values */}
        <div style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: 48 }}>Our Values</Title>
            <Row gutter={[32, 32]}>
              {values.map((value, idx) => (
                <Col xs={24} sm={12} md={6} key={idx}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 48, color: '#1e40af', marginBottom: 16 }}>{value.icon}</div>
                    <Title level={4}>{value.title}</Title>
                    <Paragraph style={{ color: '#6b7280' }}>{value.desc}</Paragraph>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        {/* Certifications */}
        <div style={{ padding: '80px 24px', background: '#f9fafb', textAlign: 'center' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <Title level={2} style={{ marginBottom: 32 }}>Certifications & Memberships</Title>
            <Paragraph style={{ fontSize: 16, color: '#6b7280' }}>
              Our team holds certifications from ICAI (Institute of Chartered Accountants of India), 
              and we are registered with all relevant regulatory bodies. We maintain the highest 
              professional standards and stay updated with the latest regulations and best practices.
            </Paragraph>
          </div>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default About;
