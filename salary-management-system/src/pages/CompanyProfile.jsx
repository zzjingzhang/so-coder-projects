import { Card, Form, Input, Button, Upload, message, Row, Col, Space, Divider, Statistic } from 'antd';
import {
  UploadOutlined,
  SaveOutlined,
  EditOutlined,
  HomeOutlined,
  TeamOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

const CompanyProfile = () => {
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [companyData, setCompanyData] = useState({
    companyName: '科技创新有限公司',
    companyType: '有限责任公司',
    industry: '互联网/科技',
    registrationNumber: '91310101MA1G2H3D4E',
    taxNumber: '91310101MA1G2H3D4E',
    legalPerson: '张三',
    registeredCapital: '5000万人民币',
    establishmentDate: '2018-06-15',
    businessScope: '技术开发、技术咨询、技术服务、技术转让；计算机系统服务；软件开发；数据处理服务。',
    address: '上海市浦东新区张江高科技园区博云路2号',
    phone: '021-55551234',
    email: 'contact@techinnovation.com',
    website: 'www.techinnovation.com',
    bankName: '中国工商银行上海分行',
    bankAccount: '6222021202012345678',
    employeeCount: 256,
    departmentCount: 8,
  });

  const handleEdit = () => {
    form.setFieldsValue(companyData);
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCompanyData(values);
      setEditing(false);
      message.success('公司资料更新成功！');
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const uploadProps = {
    name: 'logo',
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('只能上传图片文件！');
      }
      return isImage;
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
      <div 
        style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}
      >
        <div>
          <h1 
            style={{ 
              fontSize: '24px',
              fontWeight: 700,
              color: '#1f2937',
              margin: 0,
            }}
          >
            公司资料管理
          </h1>
          <p 
            style={{ 
              color: '#6b7280',
              marginTop: '4px',
              marginBottom: 0,
              fontSize: '14px',
            }}
          >
            管理和维护公司的基本信息
          </p>
        </div>
        {!editing ? (
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleEdit}
            style={{ 
              backgroundColor: '#2563eb',
              borderColor: '#2563eb',
            }}
          >
            编辑资料
          </Button>
        ) : (
          <Space size="middle">
            <Button onClick={handleCancel}>取消</Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
              loading={loading}
              style={{ 
                backgroundColor: '#2563eb',
                borderColor: '#2563eb',
              }}
            >
              保存修改
            </Button>
          </Space>
        )}
      </div>

      <Row gutter={[24, 24]} style={{ marginBottom: '8px' }}>
        <Col xs={24} sm={12} md={8}>
          <Card 
            bordered={false}
            style={{ 
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              borderRadius: '8px',
            }}
          >
            <Statistic
              title="员工总数"
              value={companyData.employeeCount}
              prefix={<TeamOutlined style={{ color: '#3b82f6' }} />}
              style={{ textAlign: 'center' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card 
            bordered={false}
            style={{ 
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              borderRadius: '8px',
            }}
          >
            <Statistic
              title="部门数量"
              value={companyData.departmentCount}
              prefix={<HomeOutlined style={{ color: '#22c55e' }} />}
              style={{ textAlign: 'center' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card 
            bordered={false}
            style={{ 
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              borderRadius: '8px',
            }}
          >
            <Statistic
              title="成立时间"
              value={companyData.establishmentDate}
              prefix={<CalendarOutlined style={{ color: '#8b5cf6' }} />}
              style={{ textAlign: 'center' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BankOutlined style={{ marginRight: '8px', color: '#2563eb' }} />
            基本信息
          </div>
        }
        bordered={false}
        style={{ 
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          borderRadius: '8px',
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={companyData}
          disabled={!editing}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="companyName"
                label="公司名称"
                rules={[{ required: true, message: '请输入公司名称' }]}
              >
                <Input placeholder="请输入公司名称" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="companyType"
                label="公司类型"
                rules={[{ required: true, message: '请输入公司类型' }]}
              >
                <Input placeholder="请输入公司类型" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="industry"
                label="所属行业"
                rules={[{ required: true, message: '请输入所属行业' }]}
              >
                <Input placeholder="请输入所属行业" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="registrationNumber"
                label="注册号"
                rules={[{ required: true, message: '请输入注册号' }]}
              >
                <Input placeholder="请输入注册号" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="taxNumber"
                label="纳税人识别号"
                rules={[{ required: true, message: '请输入纳税人识别号' }]}
              >
                <Input placeholder="请输入纳税人识别号" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="legalPerson"
                label="法人"
                rules={[{ required: true, message: '请输入法人姓名' }]}
              >
                <Input placeholder="请输入法人姓名" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="registeredCapital"
                label="注册资本"
                rules={[{ required: true, message: '请输入注册资本' }]}
              >
                <Input placeholder="请输入注册资本" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="establishmentDate"
                label="成立日期"
                rules={[{ required: true, message: '请输入成立日期' }]}
              >
                <Input placeholder="请输入成立日期" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name="businessScope"
                label="经营范围"
                rules={[{ required: true, message: '请输入经营范围' }]}
              >
                <Input.TextArea
                  rows={3}
                  placeholder="请输入经营范围"
                  showCount
                  maxLength={500}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <EnvironmentOutlined style={{ marginRight: '8px', color: '#2563eb' }} />
            联系方式
          </div>
        }
        bordered={false}
        style={{ 
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          borderRadius: '8px',
        }}
      >
        <Form form={form} layout="vertical" initialValues={companyData} disabled={!editing}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="address"
                label="公司地址"
                rules={[{ required: true, message: '请输入公司地址' }]}
              >
                <Input placeholder="请输入公司地址" prefix={<EnvironmentOutlined />} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="phone"
                label="联系电话"
                rules={[{ required: true, message: '请输入联系电话' }]}
              >
                <Input placeholder="请输入联系电话" prefix={<PhoneOutlined />} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="email"
                label="电子邮箱"
                rules={[
                  { required: true, message: '请输入电子邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' },
                ]}
              >
                <Input placeholder="请输入电子邮箱" prefix={<MailOutlined />} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="website"
                label="公司网站"
              >
                <Input placeholder="请输入公司网站" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BankOutlined style={{ marginRight: '8px', color: '#2563eb' }} />
            银行信息
          </div>
        }
        bordered={false}
        style={{ 
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          borderRadius: '8px',
        }}
      >
        <Form form={form} layout="vertical" initialValues={companyData} disabled={!editing}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="bankName"
                label="开户银行"
                rules={[{ required: true, message: '请输入开户银行' }]}
              >
                <Input placeholder="请输入开户银行" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="bankAccount"
                label="银行账号"
                rules={[{ required: true, message: '请输入银行账号' }]}
              >
                <Input placeholder="请输入银行账号" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <UploadOutlined style={{ marginRight: '8px', color: '#2563eb' }} />
            公司Logo
          </div>
        }
        bordered={false}
        style={{ 
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          borderRadius: '8px',
        }}
      >
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
        }}>
          <div style={{ 
            width: '128px',
            height: '128px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #d1d5db',
          }}>
            <BankOutlined style={{ fontSize: '48px', color: '#9ca3af' }} />
          </div>
          <div>
            <p style={{ 
              color: '#4b5563',
              marginBottom: '16px',
              marginTop: '0',
            }}>
              支持 JPG、PNG 格式，建议尺寸 200x200 像素，文件大小不超过 2MB
            </p>
            {editing && (
              <Upload {...uploadProps}>
                <Button 
                  icon={<UploadOutlined />} 
                  style={{ 
                    backgroundColor: '#2563eb',
                    borderColor: '#2563eb',
                    color: 'white',
                  }}
                >
                  上传Logo
                </Button>
              </Upload>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CompanyProfile;
