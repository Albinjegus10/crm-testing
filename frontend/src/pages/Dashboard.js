import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserOutlined, TeamOutlined, ClockCircleOutlined, BellOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../services/AuthContext';

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { key: 'clients', icon: <TeamOutlined />, label: 'Clients' },
    { key: 'tasks', icon: <UserOutlined />, label: 'Tasks' },
    { key: 'attendance', icon: <ClockCircleOutlined />, label: 'Attendance' },
    { key: 'notifications', icon: <BellOutlined />, label: 'Notifications' },
  ];

  if (user?.is_staff) {
    menuItems.unshift({ key: 'leads', icon: <UserOutlined />, label: 'Leads' });
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div style={{ color: 'white', padding: 16, fontSize: 18, fontWeight: 'bold' }}>
          Royal Accounts
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          onClick={({ key }) => navigate(`/dashboard/${key}`)}
        />
        <Menu
          theme="dark"
          mode="inline"
          style={{ position: 'absolute', bottom: 0, width: '100%' }}
          items={[{ key: 'logout', icon: <LogoutOutlined />, label: 'Logout' }]}
          onClick={handleLogout}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px' }}>
          Welcome, {user?.username}
        </Header>
        <Content style={{ margin: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
