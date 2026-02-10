import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, message, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { tasks, users, clients } from '../services/api';
import { useAuth } from '../services/AuthContext';
import dayjs from 'dayjs';

const Tasks = () => {
  const [data, setData] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { user } = useAuth();
  const [form] = Form.useForm();

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await tasks.getAll();
      setData(response.data);
    } catch (error) {
      message.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await users.getStaff();
      setStaffList(response.data);
    } catch (error) {
      console.error('Failed to fetch staff');
    }
  };

  const fetchClients = async () => {
    try {
      const response = await clients.getAll();
      setClientList(response.data);
    } catch (error) {
      console.error('Failed to fetch clients');
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchStaff();
    fetchClients();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        due_date: values.due_date?.format('YYYY-MM-DD'),
      };
      
      if (editingId) {
        await tasks.update(editingId, payload);
        message.success('Task updated');
      } else {
        await tasks.create(payload);
        message.success('Task created');
      }
      
      setModalVisible(false);
      form.resetFields();
      setEditingId(null);
      fetchTasks();
    } catch (error) {
      message.error('Operation failed');
    }
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    form.setFieldsValue({
      ...record,
      due_date: record.due_date ? dayjs(record.due_date) : null,
    });
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await tasks.delete(id);
      message.success('Task deleted');
      fetchTasks();
    } catch (error) {
      message.error('Delete failed');
    }
  };

  const handleStartTask = async (id) => {
    try {
      await tasks.startTask(id);
      message.success('Task started');
      fetchTasks();
    } catch (error) {
      message.error('Failed to start task');
    }
  };

  const handleCompleteTask = async (id) => {
    Modal.confirm({
      title: 'Complete Task',
      content: (
        <Form id="completeForm">
          <Form.Item name="actual_hours" label="Actual Hours">
            <Input type="number" placeholder="Enter actual hours" />
          </Form.Item>
        </Form>
      ),
      onOk: async () => {
        const formData = document.getElementById('completeForm');
        const actualHours = formData?.querySelector('input')?.value;
        try {
          await tasks.completeTask(id, { actual_hours: actualHours });
          message.success('Task completed');
          fetchTasks();
        } catch (error) {
          message.error('Failed to complete task');
        }
      },
    });
  };

  const statusColors = {
    pending: 'default',
    in_progress: 'processing',
    completed: 'success',
    cancelled: 'error',
  };

  const priorityColors = {
    low: 'green',
    medium: 'orange',
    high: 'red',
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Assigned To', dataIndex: 'assigned_to_name', key: 'assigned_to_name' },
    { title: 'Client', dataIndex: 'client_name', key: 'client_name' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={statusColors[status]}>{status.replace('_', ' ').toUpperCase()}</Tag>,
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => <Tag color={priorityColors[priority]}>{priority.toUpperCase()}</Tag>,
    },
    { title: 'Est. Hours', dataIndex: 'estimated_hours', key: 'estimated_hours' },
    { title: 'Actual Hours', dataIndex: 'actual_hours', key: 'actual_hours' },
    { title: 'Due Date', dataIndex: 'due_date', key: 'due_date' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {user?.is_staff && (
            <>
              <Button size="small" onClick={() => handleEdit(record)}>Edit</Button>
              <Button size="small" danger onClick={() => handleDelete(record.id)}>Delete</Button>
            </>
          )}
          {record.status === 'pending' && (
            <Button size="small" type="primary" onClick={() => handleStartTask(record.id)}>Start</Button>
          )}
          {record.status === 'in_progress' && (
            <Button size="small" type="primary" onClick={() => handleCompleteTask(record.id)}>Complete</Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      {user?.is_staff && (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
          style={{ marginBottom: 16 }}
        >
          Create Task
        </Button>
      )}

      <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />

      <Modal
        title={editingId ? 'Edit Task' : 'Create Task'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingId(null);
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="client" label="Client">
            <Select placeholder="Select client" allowClear>
              {clientList.map(c => <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="assigned_to" label="Assign To" rules={[{ required: true }]}>
            <Select placeholder="Select staff">
              {staffList.map(s => <Select.Option key={s.id} value={s.id}>{s.username}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="low">Low</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="high">High</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="estimated_hours" label="Estimated Hours">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="due_date" label="Due Date">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Tasks;
