import React, { useState, useEffect } from 'react';
import { Table, Select, message } from 'antd';
import { leads } from '../services/api';

const Leads = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await leads.getAll();
      setData(response.data);
    } catch (error) {
      message.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await leads.update(id, { status });
      message.success('Status updated');
      fetchLeads();
    } catch (error) {
      message.error('Update failed');
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Message', dataIndex: 'message', key: 'message' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Select
          value={status}
          onChange={(val) => handleStatusChange(record.id, val)}
          style={{ width: 120 }}
        >
          <Select.Option value="new">New</Select.Option>
          <Select.Option value="contacted">Contacted</Select.Option>
          <Select.Option value="converted">Converted</Select.Option>
        </Select>
      ),
    },
    { title: 'Created', dataIndex: 'created_at', key: 'created_at', render: (val) => new Date(val).toLocaleDateString() },
  ];

  return <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />;
};

export default Leads;
