import React, { useState, useEffect } from 'react';
import { Table, Button, Space, message } from 'antd';
import { ClockCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import { attendance } from '../services/api';

const Attendance = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await attendance.getAll();
      setData(response.data);
      const today = response.data.find(a => a.date === new Date().toISOString().split('T')[0]);
      setCheckedIn(today && !today.check_out);
    } catch (error) {
      message.error('Failed to fetch attendance');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleCheckIn = async () => {
    try {
      await attendance.checkIn();
      message.success('Checked in successfully');
      fetchAttendance();
    } catch (error) {
      message.error(error.response?.data?.error || 'Check-in failed');
    }
  };

  const handleCheckOut = async () => {
    try {
      await attendance.checkOut();
      message.success('Checked out successfully');
      fetchAttendance();
    } catch (error) {
      message.error(error.response?.data?.error || 'Check-out failed');
    }
  };

  const handleExport = async () => {
    try {
      const response = await attendance.exportReport();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'attendance_report.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      message.error('Export failed');
    }
  };

  const columns = [
    { title: 'User', dataIndex: 'user_name', key: 'user_name' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Check In', dataIndex: 'check_in', key: 'check_in', render: (val) => new Date(val).toLocaleTimeString() },
    { title: 'Check Out', dataIndex: 'check_out', key: 'check_out', render: (val) => val ? new Date(val).toLocaleTimeString() : '-' },
    { title: 'Hours', dataIndex: 'hours_worked', key: 'hours_worked', render: (val) => val || '-' },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        {!checkedIn ? (
          <Button type="primary" icon={<ClockCircleOutlined />} onClick={handleCheckIn}>
            Check In
          </Button>
        ) : (
          <Button type="primary" danger icon={<ClockCircleOutlined />} onClick={handleCheckOut}>
            Check Out
          </Button>
        )}
        <Button icon={<DownloadOutlined />} onClick={handleExport}>Export Report</Button>
      </Space>

      <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />
    </div>
  );
};

export default Attendance;
