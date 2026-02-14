import React from 'react';
import { Layout, Typography, Row, Col, Card, Button } from 'antd';
import { CheckCircleOutlined, SafetyOutlined, TeamOutlined, RocketOutlined, TrophyOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Services = () => {
  const services = [
    {
      icon: <CheckCircleOutlined />,
      title: 'GST Filing & Compliance',
      desc: 'Complete GST registration, monthly/quarterly filing, and compliance management',
      features: ['GST Registration', 'Monthly/Quarterly Returns', 'Input Tax Credit', 'GST Audit Support']
    },
    {
      icon: <SafetyOutlined />,
      title: 'Tax Planning & Advisory',
      desc: 'Strategic tax planning to minimize liabilities and maximize savings',
      features: ['Income Tax Planning', 'Tax Optimization', 'TDS Compliance', 'Tax Audit']
    },
    {
      icon: <TeamOutlined />,
      title: 'Business Advisory',
      desc: 'Expert financial advice for business growth and expansion',
      features: ['Financial Planning', 'Business Valuation', 'Investment Advisory', 'Risk Management']
    },
    {
      icon: <RocketOutlined />,
      title: 'Startup Services',
      desc: 'Complete support for startups from registration to compliance',
      features: ['Company Registration', 'Startup India Registration', 'MSME Registration', 'Compliance Management']
    },
    {
      icon: <TrophyOutlined />,
      title: 'Audit & Assurance',
      desc: 'Comprehensive audit services ensuring accuracy and compliance',
      features: ['Statutory Audit', 'Internal Audit', 'Tax Audit', 'Stock Audit']
    },
    {
      icon: <UserOutlined />,
      title: 'Payroll Management',
      desc: 'Complete payroll processing and statutory compliance',
      features: ['Salary Processing', 'PF/ESI Compliance', 'TDS on Salary', 'Form 16 Generation']
    }
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
          <Title style={{ color: 'white', fontSize: '2.5rem' }}>Our Services</Title>
          <Paragraph style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.9)' }}>
            Comprehensive financial solutions for your business
          </Paragraph>
        </div>

        {/* Services Grid */}
        <div style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Row gutter={[24, 24]}>
              {services.map((service, idx) => (
                <Col xs={24} md={12} lg={8} key={idx}>
                  <Card hoverable style={{ height: '100%' }}>
                    <div style={{ fontSize: 48, color: '#1e40af', marginBottom: 16 }}>{service.icon}</div>
                    <Title level={3}>{service.title}</Title>
                    <Paragraph style={{ color: '#6b7280', marginBottom: 24 }}>{service.desc}</Paragraph>
                    <ul style={{ paddingLeft: 20, color: '#6b7280' }}>
                      {service.features.map((feature, i) => (
                        <li key={i} style={{ marginBottom: 8 }}>{feature}</li>
                      ))}
                    </ul>
                    <Button type="link" style={{ padding: 0, marginTop: 16 }}>
                      Learn More <ArrowRightOutlined />
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: '80px 24px', background: '#f9fafb', textAlign: 'center' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Title level={2}>Ready to Get Started?</Title>
            <Paragraph style={{ fontSize: 16, color: '#6b7280', marginBottom: 32 }}>
              Contact us today for a free consultation and discover how we can help your business grow
            </Paragraph>
            <Button type="primary" size="large" href="/contact">
              Get Free Consultation
            </Button>
          </div>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Services;
