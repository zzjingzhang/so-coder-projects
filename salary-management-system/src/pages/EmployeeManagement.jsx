import { Card, Table, Button, Modal, Form, Input, Select, DatePicker, InputNumber, message, Space, Popconfirm, Tag, Avatar } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

const { Option } = Select;

const EmployeeManagement = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [employees, setEmployees] = useState([
    { id: 1, name: '张三', email: 'zhangsan@example.com', phone: '13800138001', department: '技术部', position: '高级工程师', salary: 25000, hireDate: '2020-03-15', status: 'active', avatar: '张' },
    { id: 2, name: '李四', email: 'lisi@example.com', phone: '13800138002', department: '技术部', position: '技术部经理', salary: 35000, hireDate: '2018-06-20', status: 'active', avatar: '李' },
    { id: 3, name: '王五', email: 'wangwu@example.com', phone: '13800138003', department: '市场部', position: '市场部经理', salary: 30000, hireDate: '2019-02-10', status: 'active', avatar: '王' },
    { id: 4, name: '赵六', email: 'zhaoliu@example.com', phone: '13800138004', department: '人事部', position: '人事经理', salary: 28000, hireDate: '2017-11-05', status: 'active', avatar: '赵' },
    { id: 5, name: '钱七', email: 'qianqi@example.com', phone: '13800138005', department: '财务部', position: '财务经理', salary: 32000, hireDate: '2016-08-18', status: 'active', avatar: '钱' },
    { id: 6, name: '孙八', email: 'sunba@example.com', phone: '13800138006', department: '运营部', position: '运营经理', salary: 29000, hireDate: '2021-01-22', status: 'active', avatar: '孙' },
    { id: 7, name: '周九', email: 'zhoujiu@example.com', phone: '13800138007', department: '设计部', position: 'UI设计师', salary: 22000, hireDate: '2022-04-12', status: 'inactive', avatar: '周' },
    { id: 8, name: '吴十', email: 'wushi@example.com', phone: '13800138008', department: '技术部', position: '前端工程师', salary: 20000, hireDate: '2023-06-01', status: 'active', avatar: '吴' },
  ]);

  const departments = ['技术部', '市场部', '人事部', '财务部', '运营部', '设计部'];
  const positions = ['经理', '高级工程师', '工程师', '设计师', '专员', '助理'];

  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue({
      ...record,
      hireDate: record.hireDate ? record.hireDate : null,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    message.success('员工删除成功！');
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      await new Promise(resolve => setTimeout(resolve, 800));

      if (editingRecord) {
        setEmployees(employees.map(emp =>
          emp.id === editingRecord.id ? { ...emp, ...values } : emp
        ));
        message.success('员工信息更新成功！');
      } else {
        const newEmployee = {
          id: Date.now(),
          status: 'active',
          avatar: values.name?.charAt(0) || '员',
          ...values,
        };
        setEmployees([...employees, newEmployee]);
        message.success('员工添加成功！');
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.includes(searchText) ||
    emp.email.includes(searchText) ||
    emp.department.includes(searchText) ||
    emp.position.includes(searchText)
  );

  const columns = [
    {
      title: '员工',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center">
          <Avatar size={40} className="bg-blue-500 mr-3">
            {record.avatar}
          </Avatar>
          <div>
            <div className="font-medium text-gray-800">{text}</div>
            <div className="text-sm text-gray-500">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      render: (text) => (
        <Tag color="blue">{text}</Tag>
      ),
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: '薪资',
      dataIndex: 'salary',
      key: 'salary',
      render: (salary) => (
        <span className="font-semibold text-green-600">¥{salary?.toLocaleString()}</span>
      ),
    },
    {
      title: '入职日期',
      dataIndex: 'hireDate',
      key: 'hireDate',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
          {status === 'active' ? '在职' : '已离职'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这位员工吗？"
            description="删除后将无法恢复，请谨慎操作。"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">员工管理</h1>
          <p className="text-gray-500 mt-1">管理公司员工信息，包括添加、编辑、删除员工</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700"
        >
          新增员工
        </Button>
      </div>

      <Card className="shadow-sm">
        <div className="mb-4">
          <Input
            placeholder="搜索员工姓名、邮箱、部门或职位..."
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-md"
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredEmployees}
          rowKey="id"
          pagination={{
            showTotal: (total) => `共 ${total} 位员工`,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>

      <Modal
        title={editingRecord ? '编辑员工' : '新增员工'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={loading}
        okText={editingRecord ? '保存修改' : '确认添加'}
        cancelText="取消"
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label="员工姓名"
              rules={[{ required: true, message: '请输入员工姓名' }]}
            >
              <Input placeholder="请输入员工姓名" />
            </Form.Item>

            <Form.Item
              name="email"
              label="电子邮箱"
              rules={[
                { required: true, message: '请输入电子邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' },
              ]}
            >
              <Input placeholder="请输入电子邮箱" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="联系电话"
              rules={[{ required: true, message: '请输入联系电话' }]}
            >
              <Input placeholder="请输入联系电话" />
            </Form.Item>

            <Form.Item
              name="department"
              label="所属部门"
              rules={[{ required: true, message: '请选择所属部门' }]}
            >
              <Select placeholder="请选择所属部门">
                {departments.map(dept => (
                  <Option key={dept} value={dept}>{dept}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="position"
              label="职位"
              rules={[{ required: true, message: '请输入职位' }]}
            >
              <Select placeholder="请选择或输入职位" allowClear>
                {positions.map(pos => (
                  <Option key={pos} value={pos}>{pos}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="salary"
              label="薪资"
              rules={[{ required: true, message: '请输入薪资' }]}
            >
              <InputNumber
                placeholder="请输入薪资"
                className="w-full"
                min={0}
                formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/¥\s?|(,*)/g, '')}
              />
            </Form.Item>

            <Form.Item
              name="hireDate"
              label="入职日期"
              rules={[{ required: true, message: '请选择入职日期' }]}
              className="md:col-span-2"
            >
              <DatePicker
                placeholder="请选择入职日期"
                className="w-full"
                format="YYYY-MM-DD"
              />
            </Form.Item>

            <Form.Item
              name="status"
              label="状态"
              rules={[{ required: true, message: '请选择状态' }]}
              initialValue="active"
              className="md:col-span-2"
            >
              <Select placeholder="请选择状态">
                <Option value="active">在职</Option>
                <Option value="inactive">已离职</Option>
              </Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeeManagement;
