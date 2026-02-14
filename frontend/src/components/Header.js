import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer, Dropdown } from 'antd';
import { MenuOutlined, HomeOutlined, AppstoreOutlined, InfoCircleOutlined, PhoneOutlined, DownOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const { Header: AntHeader } = Layout;

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesMenu = {
    items: [
      { key: '1', label: <Link to="/services">GST Filing & Compliance</Link> },
      { key: '2', label: <Link to="/services">Tax Planning & Advisory</Link> },
      { key: '3', label: <Link to="/services">Business Advisory</Link> },
      { key: '4', label: <Link to="/services">Startup Services</Link> },
      { key: '5', label: <Link to="/services">Audit & Assurance</Link> },
      { key: '6', label: <Link to="/services">Payroll Management</Link> }
    ]
  };

  const menuItems = [
    { key: '/', label: <Link to="/">Home</Link> },
    { 
      key: '/services', 
      label: (
        <Dropdown menu={servicesMenu} trigger={['hover']}>
          <span>Services <DownOutlined style={{ fontSize: 10 }} /></span>
        </Dropdown>
      )
    },
    { key: '/about', label: <Link to="/about">About Us</Link> },
    { key: '/contact', label: <Link to="/contact">Contact</Link> }
  ];

  return (
    <AntHeader className={`custom-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-icon">💼</span>
          <span className="logo-text">Royal Accounts</span>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <Menu 
            mode="horizontal" 
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ border: 'none', background: 'transparent', flex: 1 }}
          />
          <Link to="/login">
            <Button type="primary" className="login-btn">
              Staff Login
            </Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <Button 
          icon={<MenuOutlined />} 
          onClick={() => setVisible(true)}
          className="mobile-menu-btn"
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          onClick={() => setVisible(false)}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.SubMenu key="services" icon={<AppstoreOutlined />} title="Services">
            <Menu.Item key="/services/gst"><Link to="/services">GST Filing</Link></Menu.Item>
            <Menu.Item key="/services/tax"><Link to="/services">Tax Planning</Link></Menu.Item>
            <Menu.Item key="/services/advisory"><Link to="/services">Business Advisory</Link></Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="/about" icon={<InfoCircleOutlined />}>
            <Link to="/about">About Us</Link>
          </Menu.Item>
          <Menu.Item key="/contact" icon={<PhoneOutlined />}>
            <Link to="/contact">Contact</Link>
          </Menu.Item>
        </Menu>
        <Link to="/login">
          <Button type="primary" block style={{ marginTop: 16 }} onClick={() => setVisible(false)}>
            Staff Login
          </Button>
        </Link>
      </Drawer>
    </AntHeader>
  );
};

export default Header;
