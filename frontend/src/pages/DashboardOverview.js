import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Progress, Table, Tag, Typography } from 'antd';
import { UserOutlined, TeamOutlined, CheckCircleOutlined, ClockCircleOutlined, RiseOutlined } from '@ant-design/icons';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const { Text } = Typography;

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalLeads: 0,
    completedTasks: 0,
    pendingTasks: 0,
    todayAttendance: 0
  });

  useEffect(() => {
    // Simulate fetching data
    setStats({
      totalClients: 245,
      totalLeads: 48,
      completedTasks: 156,
      pendingTasks: 32,
      todayAttendance: 12
    });
  }, []);

  const taskCompletionRate = ((stats.completedTasks / (stats.completedTasks + stats.pendingTasks)) * 100).toFixed(1);

  // Line Chart Data - Monthly Performance
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Clients Added',
        data: [30, 45, 38, 52, 48, 62],
        borderColor: '#1e40af',
        backgroundColor: 'rgba(30, 64, 175, 0.1)',
        tension: 0.4
      },
      {
        label: 'Tasks Completed',
        data: [25, 35, 42, 48, 55, 60],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      }
    ]
  };

  // Pie Chart Data - Task Status
  const pieChartData = {
    labels: ['Completed', 'In Progress', 'Pending', 'Overdue'],
    datasets: [{
      data: [156, 18, 14, 8],
      backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444']
    }]
  };

  // Bar Chart Data - Service Distribution
  const barChartData = {
    labels: ['GST Filing', 'Tax Planning', 'Audit', 'Payroll', 'Advisory'],
    datasets: [{
      label: 'Active Clients',
      data: [85, 62, 45, 38, 55],
      backgroundColor: '#1e40af'
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  // Recent Activities
  const recentActivities = [
    { key: 1, client: 'ABC Corp', action: 'GST Filing Completed', status: 'completed', time: '2 hours ago' },
    { key: 2, client: 'XYZ Ltd', action: 'Tax Planning Started', status: 'progress', time: '4 hours ago' },
    { key: 3, client: 'Tech Solutions', action: 'Audit Pending', status: 'pending', time: '1 day ago' },
    { key: 4, client: 'Retail Ventures', action: 'Payroll Processed', status: 'completed', time: '2 days ago' }
  ];

  const columns = [
    { title: 'Client', dataIndex: 'client', key: 'client' },
    { title: 'Action', dataIndex: 'action', key: 'action' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = { completed: 'green', progress: 'blue', pending: 'orange' };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      }
    },
    { title: 'Time', dataIndex: 'time', key: 'time' }
  ];

  return (
    <div>
      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Clients"
              value={stats.totalClients}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1e40af' }}
              suffix={<RiseOutlined style={{ fontSize: 14, color: '#10b981' }} />}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>+12% from last month</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Leads"
              value={stats.totalLeads}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#f59e0b' }}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>8 new this week</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Completed Tasks"
              value={stats.completedTasks}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#10b981' }}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>{taskCompletionRate}% completion rate</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending Tasks"
              value={stats.pendingTasks}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#ef4444' }}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>Requires attention</Text>
          </Card>
        </Col>
      </Row>

      {/* Progress Indicators */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card title="Task Completion Progress">
            <div style={{ marginBottom: 16 }}>
              <Text>Overall Progress</Text>
              <Progress percent={taskCompletionRate} status="active" strokeColor="#10b981" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Text>GST Filings</Text>
              <Progress percent={85} strokeColor="#3b82f6" />
            </div>
            <div>
              <Text>Tax Planning</Text>
              <Progress percent={72} strokeColor="#f59e0b" />
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Today's Attendance">
            <Statistic
              title="Staff Present"
              value={stats.todayAttendance}
              suffix="/ 15"
              valueStyle={{ color: '#10b981', fontSize: 32 }}
            />
            <Progress percent={(stats.todayAttendance / 15) * 100} showInfo={false} strokeColor="#10b981" style={{ marginTop: 16 }} />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="Monthly Performance Trend">
            <div style={{ height: 300 }}>
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Task Status Distribution">
            <div style={{ height: 300 }}>
              <Pie data={pieChartData} options={chartOptions} />
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24}>
          <Card title="Service Distribution">
            <div style={{ height: 300 }}>
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Activities */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24}>
          <Card title="Recent Activities">
            <Table
              dataSource={recentActivities}
              columns={columns}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardOverview;
