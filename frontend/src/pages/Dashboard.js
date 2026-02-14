import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { DashboardOutlined, UserOutlined, TeamOutlined, ClockCircleOutlined, BellOutlined, LogoutOutlined, CheckSquareOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useAuth } from '../services/AuthContext';

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isAdmin = user?.is_superuser;
  const isHR = user?.role === 'hr';

  const menuItems = [
    { key: 'overview', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: 'clients', icon: <TeamOutlined />, label: 'Clients' },
    { key: 'tasks', icon: <CheckSquareOutlined />, label: 'Tasks' },
    { key: 'attendance', icon: <ClockCircleOutlined />, label: 'Attendance' },
    { key: 'notifications', icon: <BellOutlined />, label: 'Notifications' },
  ];

  if (isAdmin) {
    menuItems.splice(1, 0, { key: 'leads', icon: <UserOutlined />, label: 'Leads' });
    menuItems.push({ key: 'users', icon: <UsergroupAddOutlined />, label: 'User Management' });
  } else if (isHR) {
    menuItems.push({ key: 'users', icon: <UsergroupAddOutlined />, label: 'Staff Management' });
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const selectedKey = location.pathname.split('/').pop() || 'overview';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ color: 'white', padding: 16, fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
          Royal Accounts
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
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
        <Header style={{ background: '#fff', padding: '0 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>Welcome, {user?.username}</h2>
            <div style={{ color: '#6b7280' }}>
              {isAdmin ? 'Admin' : isHR ? 'HR' : 'Staff'}
            </div>
          </div>
        </Header>
        <Content style={{ margin: 24, background: '#f5f5f5', padding: 24, borderRadius: 8 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
