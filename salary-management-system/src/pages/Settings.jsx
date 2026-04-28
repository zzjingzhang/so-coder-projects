import { Card, Form, Input, Button, Switch, Select, Upload, message, Space, Avatar, Row, Col } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  BellOutlined,
  UploadOutlined,
  SaveOutlined,
  SecurityScanOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

const { Option } = Select;

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 30,
  });

  const handleProfileSave = async (values) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      message.success('个人资料更新成功！');
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSave = async (values) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      message.success('密码修改成功！');
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationChange = (key, checked) => {
    setNotifications(prev => ({
      ...prev,
      [key]: checked,
    }));
    message.success('通知设置已更新');
  };

  const handleSecurityChange = (key, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: value,
    }));
    message.success('安全设置已更新');
  };

  const uploadProps = {
    name: 'avatar',
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('只能上传图片文件！');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('图片大小不能超过 2MB！');
      }
      return isImage && isLt2M;
    },
    onChange: (info) => {
      if (info.file.status === 'done') {
        message.success('头像上传成功！');
      } else if (info.file.status === 'error') {
        message.error('头像上传失败！');
      }
    },
  };

  return (
    <div 
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      <div style={{ marginBottom: '8px' }}>
        <h1 
          style={{ 
            fontSize: '24px',
            fontWeight: 700,
            color: '#1f2937',
            margin: 0,
          }}
        >
          系统设置
        </h1>
        <p 
          style={{ 
            color: '#6b7280',
            marginTop: '4px',
            marginBottom: 0,
            fontSize: '14px',
          }}
        >
          管理账户、通知和安全设置
        </p>
      </div>

      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <UserOutlined style={{ marginRight: '8px', color: '#2563eb' }} />
            个人资料
          </div>
        }
        bordered={false}
        style={{ 
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          borderRadius: '8px',
        }}
      >
        <div 
          style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar 
              size={120} 
              icon={<UserOutlined />} 
              style={{ 
                backgroundColor: '#3b82f6',
                marginBottom: '16px',
              }}
            />
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>更换头像</Button>
            </Upload>
            <p 
              style={{ 
                fontSize: '14px',
                color: '#6b7280',
                marginTop: '8px',
                marginBottom: 0,
              }}
            >
              支持 JPG、PNG 格式，不超过 2MB
            </p>
          </div>

          <div style={{ flex: 1, width: '100%' }}>
            <Form
              layout="vertical"
              initialValues={{
                name: '管理员',
                email: 'admin@example.com',
                phone: '13800138000',
                department: '技术部',
                position: '系统管理员',
              }}
              onFinish={handleProfileSave}
            >
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="name"
                    label="姓名"
                    rules={[{ required: true, message: '请输入姓名' }]}
                  >
                    <Input placeholder="请输入姓名" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[
                      { required: true, message: '请输入邮箱' },
                      { type: 'email', message: '请输入有效的邮箱地址' },
                    ]}
                  >
                    <Input placeholder="请输入邮箱" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="phone"
                    label="手机号"
                    rules={[{ required: true, message: '请输入手机号' }]}
                  >
                    <Input placeholder="请输入手机号" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="department"
                    label="部门"
                  >
                    <Select placeholder="请选择部门">
                      <Option value="技术部">技术部</Option>
                      <Option value="市场部">市场部</Option>
                      <Option value="人事部">人事部</Option>
                      <Option value="财务部">财务部</Option>
                      <Option value="运营部">运营部</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={24}>
                  <Form.Item
                    name="position"
                    label="职位"
                  >
                    <Input placeholder="请输入职位" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<SaveOutlined />}
                  style={{ 
                    backgroundColor: '#2563eb',
                    borderColor: '#2563eb',
                  }}
                >
                  保存修改
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Card>

      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LockOutlined style={{ marginRight: '8px', color: '#2563eb' }} />
            密码修改
          </div>
        }
        bordered={false}
        style={{ 
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          borderRadius: '8px',
        }}
      >
        <Form
          layout="vertical"
          onFinish={handlePasswordSave}
          style={{ maxWidth: '448px' }}
        >
          <Form.Item
            name="oldPassword"
            label="当前密码"
            rules={[{ required: true, message: '请输入当前密码' }]}
          >
            <Input.Password placeholder="请输入当前密码" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 8, message: '密码长度不能少于8位' },
            ]}
          >
            <Input.Password placeholder="请输入新密码" />
            <p 
              style={{ 
                fontSize: '14px',
                color: '#6b7280',
                marginTop: '4px',
                marginBottom: 0,
              }}
            >
              密码长度至少8位，建议包含大小写字母、数字和特殊字符
            </p>
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="确认新密码"
            rules={[
              { required: true, message: '请确认新密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="请再次输入新密码" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<SaveOutlined />}
              style={{ 
                backgroundColor: '#2563eb',
                borderColor: '#2563eb',
              }}
            >
              修改密码
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BellOutlined style={{ marginRight: '8px', color: '#2563eb' }} />
            通知设置
          </div>
        }
        bordered={false}
        style={{ 
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          borderRadius: '8px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '12px',
              paddingBottom: '12px',
              borderBottom: '1px solid #f3f4f6',
            }}
          >
            <div>
              <div style={{ fontWeight: 500, color: '#1f2937' }}>邮件通知</div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '2px' }}>接收重要信息的邮件提醒</div>
            </div>
            <Switch
              checked={notifications.email}
              onChange={(checked) => handleNotificationChange('email', checked)}
            />
          </div>

          <div 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '12px',
              paddingBottom: '12px',
              borderBottom: '1px solid #f3f4f6',
            }}
          >
            <div>
              <div style={{ fontWeight: 500, color: '#1f2937' }}>推送通知</div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '2px' }}>接收系统推送的实时通知</div>
            </div>
            <Switch
              checked={notifications.push}
              onChange={(checked) => handleNotificationChange('push', checked)}
            />
          </div>

          <div 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '12px',
              paddingBottom: '12px',
            }}
          >
            <div>
              <div style={{ fontWeight: 500, color: '#1f2937' }}>短信通知</div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '2px' }}>接收关键事件的短信提醒</div>
            </div>
            <Switch
              checked={notifications.sms}
              onChange={(checked) => handleNotificationChange('sms', checked)}
            />
          </div>
        </div>
      </Card>

      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SecurityScanOutlined style={{ marginRight: '8px', color: '#2563eb' }} />
            安全设置
          </div>
        }
        bordered={false}
        style={{ 
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          borderRadius: '8px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '12px',
              paddingBottom: '12px',
              borderBottom: '1px solid #f3f4f6',
            }}
          >
            <div>
              <div style={{ fontWeight: 500, color: '#1f2937' }}>双因素认证</div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '2px' }}>启用后登录需要额外的验证步骤</div>
            </div>
            <Switch
              checked={securitySettings.twoFactorAuth}
              onChange={(checked) => handleSecurityChange('twoFactorAuth', checked)}
            />
          </div>

          <div 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '12px',
              paddingBottom: '12px',
              borderBottom: '1px solid #f3f4f6',
            }}
          >
            <div>
              <div style={{ fontWeight: 500, color: '#1f2937' }}>登录提醒</div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '2px' }}>新设备登录时发送提醒</div>
            </div>
            <Switch
              checked={securitySettings.loginAlerts}
              onChange={(checked) => handleSecurityChange('loginAlerts', checked)}
            />
          </div>

          <div 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '12px',
              paddingBottom: '12px',
            }}
          >
            <div>
              <div style={{ fontWeight: 500, color: '#1f2937' }}>会话超时</div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '2px' }}>无操作后自动登出的时间</div>
            </div>
            <Select
              value={securitySettings.sessionTimeout}
              onChange={(value) => handleSecurityChange('sessionTimeout', value)}
              style={{ width: 120 }}
            >
              <Option value={15}>15 分钟</Option>
              <Option value={30}>30 分钟</Option>
              <Option value={60}>1 小时</Option>
              <Option value={120}>2 小时</Option>
              <Option value={0}>永不</Option>
            </Select>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
