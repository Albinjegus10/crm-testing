import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Upload, message, Space } from 'antd';
import { PlusOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { clients } from '../services/api';
import dayjs from 'dayjs';

const Clients = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [form] = Form.useForm();

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await clients.getAll({ search });
      setData(response.data);
    } catch (error) {
      message.error('Failed to fetch clients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [search, fetchClients]);

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        gst_due_date: values.gst_due_date?.format('YYYY-MM-DD'),
        reward_due_date: values.reward_due_date?.format('YYYY-MM-DD'),
      };
      
      if (editingId) {
        await clients.update(editingId, payload);
        message.success('Client updated');
      } else {
        await clients.create(payload);
        message.success('Client created');
      }
      
      setModalVisible(false);
      form.resetFields();
      setEditingId(null);
      fetchClients();
    } catch (error) {
      message.error('Operation failed');
    }
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    form.setFieldsValue({
      ...record,
      gst_due_date: record.gst_due_date ? dayjs(record.gst_due_date) : null,
      reward_due_date: record.reward_due_date ? dayjs(record.reward_due_date) : null,
    });
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await clients.delete(id);
      message.success('Client deleted');
      fetchClients();
    } catch (error) {
      message.error('Delete failed');
    }
  };

  const handleImport = async (file) => {
    try {
      await clients.importExcel(file);
      message.success('Import successful');
      fetchClients();
    } catch (error) {
      message.error('Import failed');
    }
    return false;
  };

  const handleExport = async () => {
    try {
      const response = await clients.exportExcel();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'clients.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      message.error('Export failed');
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'GST Number', dataIndex: 'gst_number', key: 'gst_number' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => handleEdit(record)}>Edit</Button>
          <Button size="small" danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Search clients"
          onSearch={setSearch}
          style={{ width: 300 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
          Add Client
        </Button>
        <Upload beforeUpload={handleImport} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Import Excel</Button>
        </Upload>
        <Button icon={<DownloadOutlined />} onClick={handleExport}>Export</Button>
      </Space>

      <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />

      <Modal
        title={editingId ? 'Edit Client' : 'Add Client'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingId(null);
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="gst_number" label="GST Number">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="gst_due_date" label="GST Due Date">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="reward_due_date" label="Reward Due Date">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Clients;
