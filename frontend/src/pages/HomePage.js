import React, { useState, useEffect } from 'react';
import { Layout, Typography, Button, Row, Col, Card, Statistic, Form, Input, message } from 'antd';
import { CheckCircleOutlined, SafetyOutlined, TeamOutlined, RocketOutlined, TrophyOutlined, UserOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined, ArrowRightOutlined, StarFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { leads } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './HomePage.css';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [stats, setStats] = useState({ clients: 0, projects: 0, years: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        clients: prev.clients < 500 ? prev.clients + 10 : 500,
        projects: prev.projects < 1000 ? prev.projects + 20 : 1000,
        years: prev.years < 15 ? prev.years + 1 : 15
      }));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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

  const services = [
    { icon: <CheckCircleOutlined />, title: 'GST Filing & Compliance', desc: 'Complete GST registration, filing, and compliance management', color: '#3b82f6' },
    { icon: <SafetyOutlined />, title: 'Tax Planning & Advisory', desc: 'Strategic tax planning to optimize your tax liabilities', color: '#10b981' },
    { icon: <TeamOutlined />, title: 'Business Advisory', desc: 'Expert financial advice for business growth', color: '#f59e0b' },
    { icon: <RocketOutlined />, title: 'Startup Services', desc: 'Company registration, compliance, and startup support', color: '#8b5cf6' },
    { icon: <TrophyOutlined />, title: 'Audit & Assurance', desc: 'Comprehensive audit services and financial assurance', color: '#ef4444' },
    { icon: <UserOutlined />, title: 'Payroll Management', desc: 'Complete payroll processing and compliance', color: '#06b6d4' }
  ];

  const testimonials = [
    { name: 'Rajesh Kumar', company: 'Tech Solutions Pvt Ltd', text: 'Royal Accounts transformed our financial management. Highly professional!', rating: 5 },
    { name: 'Priya Sharma', company: 'Retail Ventures', text: 'Excellent GST filing services. Always on time and accurate.', rating: 5 },
    { name: 'Amit Patel', company: 'Manufacturing Co', text: 'Best accounting firm we have worked with. Highly recommended!', rating: 5 }
  ];

  const features = [
    { icon: <CheckCircleOutlined />, title: 'Expert Team', desc: 'Certified professionals with years of experience' },
    { icon: <SafetyOutlined />, title: '100% Compliance', desc: 'Ensure full regulatory compliance' },
    { icon: <RocketOutlined />, title: 'Fast Service', desc: 'Quick turnaround time on all services' },
    { icon: <TrophyOutlined />, title: 'Trusted Partner', desc: '500+ satisfied clients across India' }
  ];

  return (
    <Layout>
      <Header />
      <Content>
        {/* Hero Section with Background */}
        <div className="hero-section">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="hero-text animate-fade-in">
              <Title className="hero-title">
                Professional Accounting Services for Growing Businesses
              </Title>
              <Paragraph className="hero-subtitle">
                Expert GST filing, tax planning, and financial advisory services across India
              </Paragraph>
              <div className="hero-buttons">
                <Link to="/contact">
                  <Button type="primary" size="large" className="cta-button primary">
                    Get Free Consultation
                  </Button>
                </Link>
                <Link to="/services">
                  <Button size="large" className="cta-button secondary">
                    View Services <ArrowRightOutlined />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="hero-wave">
            <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
              <path fill="#ffffff" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
            </svg>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section animate-on-scroll" id="stats">
          <div className="container">
            <Row gutter={[32, 32]} justify="center">
              <Col xs={24} sm={8}>
                <Card className="stat-card" hoverable>
                  <Statistic 
                    title={<span className="stat-title">Happy Clients</span>} 
                    value={stats.clients} 
                    suffix="+" 
                    valueStyle={{ color: '#1e40af', fontWeight: 700 }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card className="stat-card" hoverable>
                  <Statistic 
                    title={<span className="stat-title">Projects Completed</span>} 
                    value={stats.projects} 
                    suffix="+"
                    valueStyle={{ color: '#10b981', fontWeight: 700 }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card className="stat-card" hoverable>
                  <Statistic 
                    title={<span className="stat-title">Years Experience</span>} 
                    value={stats.years} 
                    suffix="+"
                    valueStyle={{ color: '#f59e0b', fontWeight: 700 }}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        {/* Services Section */}
        <div className="services-section animate-on-scroll" id="services">
          <div className="container">
            <div className="section-header">
              <Title level={2} className="section-title">Our Services</Title>
              <Paragraph className="section-subtitle">
                Comprehensive financial solutions tailored to your business needs
              </Paragraph>
            </div>
            <Row gutter={[24, 24]}>
              {services.map((service, idx) => (
                <Col xs={24} sm={12} lg={8} key={idx}>
                  <Card className="service-card" hoverable>
                    <div className="service-icon" style={{ color: service.color }}>
                      {service.icon}
                    </div>
                    <Title level={4} className="service-title">{service.title}</Title>
                    <Paragraph className="service-desc">{service.desc}</Paragraph>
                    <Link to="/services" className="service-link">
                      Learn More <ArrowRightOutlined />
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="features-section animate-on-scroll" id="features">
          <div className="container">
            <Title level={2} className="section-title">Why Choose Royal Accounts?</Title>
            <Row gutter={[32, 32]}>
              {features.map((feature, idx) => (
                <Col xs={24} sm={12} md={6} key={idx}>
                  <div className="feature-item">
                    <div className="feature-icon">{feature.icon}</div>
                    <Title level={4} className="feature-title">{feature.title}</Title>
                    <Text className="feature-desc">{feature.desc}</Text>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        {/* Testimonials */}
        <div className="testimonials-section animate-on-scroll" id="testimonials">
          <div className="container">
            <Title level={2} className="section-title">What Our Clients Say</Title>
            <Row gutter={[24, 24]}>
              {testimonials.map((test, idx) => (
                <Col xs={24} md={8} key={idx}>
                  <Card className="testimonial-card">
                    <div className="testimonial-rating">
                      {[...Array(test.rating)].map((_, i) => (
                        <StarFilled key={i} style={{ color: '#fbbf24', fontSize: 18 }} />
                      ))}
                    </div>
                    <Paragraph className="testimonial-text">"{test.text}"</Paragraph>
                    <div className="testimonial-author">
                      <Text strong>{test.name}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 14 }}>{test.company}</Text>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-section animate-on-scroll" id="contact">
          <div className="container-small">
            <div className="section-header">
              <Title level={2} className="section-title">Get Free Consultation</Title>
              <Paragraph className="section-subtitle">
                Fill out the form and our team will get back to you within 24 hours
              </Paragraph>
            </div>
            <Card className="contact-card">
              <Form form={form} layout="vertical" onFinish={onSubmit}>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                      <Input size="large" placeholder="Your name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                      <Input size="large" placeholder="your@email.com" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                  <Input size="large" placeholder="+91 1234567890" />
                </Form.Item>
                <Form.Item name="message" label="Message" rules={[{ required: true }]}>
                  <Input.TextArea rows={4} placeholder="Tell us about your requirements" />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block size="large" className="submit-btn">
                  Submit Inquiry
                </Button>
              </Form>
            </Card>
          </div>
        </div>

        {/* Contact Info */}
        <div className="contact-info-section">
          <div className="container">
            <Row gutter={[32, 32]}>
              <Col xs={24} md={8}>
                <Card className="info-card" hoverable>
                  <PhoneOutlined className="info-icon" />
                  <Title level={4}>Call Us</Title>
                  <Text>+91 1234567890</Text>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card className="info-card" hoverable>
                  <MailOutlined className="info-icon" />
                  <Title level={4}>Email Us</Title>
                  <Text>info@royalaccounts.com</Text>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card className="info-card" hoverable>
                  <EnvironmentOutlined className="info-icon" />
                  <Title level={4}>Visit Us</Title>
                  <Text>123 Business Street, City, State</Text>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Home;
