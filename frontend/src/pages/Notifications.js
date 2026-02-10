import React, { useState, useEffect } from 'react';
import { List, Card, message } from 'antd';
import { notifications } from '../services/api';

const Notifications = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await notifications.getAll();
        setData(response.data);
      } catch (error) {
        message.error('Failed to fetch notifications');
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <Card title="Notifications">
      <List
        loading={loading}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={`${item.notification_type.toUpperCase()} - ${item.client_name}`}
              description={item.message}
            />
            <div>{new Date(item.sent_at).toLocaleString()}</div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Notifications;
