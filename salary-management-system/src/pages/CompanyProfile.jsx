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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">公司资料管理</h1>
          <p className="text-gray-500 mt-1">管理和维护公司的基本信息</p>
        </div>
        {!editing ? (
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleEdit}
            className="bg-blue-600 hover:bg-blue-700"
          >
            编辑资料
          </Button>
        ) : (
          <Space>
            <Button onClick={handleCancel}>取消</Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
              loading={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              保存修改
            </Button>
          </Space>
        )}
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="员工总数"
              value={companyData.employeeCount}
              prefix={<TeamOutlined className="text-blue-500" />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="部门数量"
              value={companyData.departmentCount}
              prefix={<HomeOutlined className="text-green-500" />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="成立时间"
              value={companyData.establishmentDate}
              prefix={<CalendarOutlined className="text-purple-500" />}
              valueStyle={{ color: '#722ed1', fontSize: '16px' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title={
          <div className="flex items-center">
            <BankOutlined className="mr-2 text-blue-600" />
            基本信息
          </div>
        }
        className="shadow-sm"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={companyData}
          disabled={!editing}
        >
          <Row gutter={[16, 16]}>
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

      <Divider />

      <Card
        title={
          <div className="flex items-center">
            <EnvironmentOutlined className="mr-2 text-blue-600" />
            联系方式
          </div>
        }
        className="shadow-sm"
      >
        <Form form={form} layout="vertical" initialValues={companyData} disabled={!editing}>
          <Row gutter={[16, 16]}>
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

      <Divider />

      <Card
        title={
          <div className="flex items-center">
            <BankOutlined className="mr-2 text-blue-600" />
            银行信息
          </div>
        }
        className="shadow-sm"
      >
        <Form form={form} layout="vertical" initialValues={companyData} disabled={!editing}>
          <Row gutter={[16, 16]}>
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
          <div className="flex items-center">
            <UploadOutlined className="mr-2 text-blue-600" />
            公司Logo
          </div>
        }
        className="shadow-sm"
      >
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <BankOutlined className="text-5xl text-gray-400" />
          </div>
          <div>
            <p className="text-gray-600 mb-4">支持 JPG、PNG 格式，建议尺寸 200x200 像素，文件大小不超过 2MB</p>
            {editing && (
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />} className="bg-blue-600 hover:bg-blue-700 text-white">
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
