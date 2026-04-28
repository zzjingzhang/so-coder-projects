import { Card, Table, Button, Modal, Form, Input, Select, message, Space, Popconfirm, Tag } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

const { Option } = Select;

const DepartmentManagement = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(false);

  const [departments, setDepartments] = useState([
    { id: 1, name: '技术部', manager: '李四', employeeCount: 45, status: 'active', description: '负责公司产品研发和技术支持' },
    { id: 2, name: '市场部', manager: '王五', employeeCount: 23, status: 'active', description: '负责公司市场推广和品牌建设' },
    { id: 3, name: '人事部', manager: '赵六', employeeCount: 12, status: 'active', description: '负责公司人力资源管理' },
    { id: 4, name: '财务部', manager: '钱七', employeeCount: 8, status: 'active', description: '负责公司财务管理和会计核算' },
    { id: 5, name: '运营部', manager: '孙八', employeeCount: 31, status: 'active', description: '负责公司产品运营和客户服务' },
    { id: 6, name: '设计部', manager: '周九', employeeCount: 18, status: 'inactive', description: '负责公司产品设计和视觉体验' },
  ]);

  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setDepartments(departments.filter(dep => dep.id !== id));
    message.success('部门删除成功！');
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      await new Promise(resolve => setTimeout(resolve, 800));

      if (editingRecord) {
        setDepartments(departments.map(dep =>
          dep.id === editingRecord.id ? { ...dep, ...values } : dep
        ));
        message.success('部门信息更新成功！');
      } else {
        const newDepartment = {
          id: Date.now(),
          employeeCount: 0,
          ...values,
        };
        setDepartments([...departments, newDepartment]);
        message.success('部门添加成功！');
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: '部门名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <div className="flex items-center">
          <TeamOutlined className="text-blue-500 mr-2" />
          <span className="font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: '部门经理',
      dataIndex: 'manager',
      key: 'manager',
      render: (text) => (
        <div className="flex items-center">
          <UserOutlined className="text-green-500 mr-2" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: '员工人数',
      dataIndex: 'employeeCount',
      key: 'employeeCount',
      render: (count) => (
        <Tag color={count > 20 ? 'blue' : count > 10 ? 'green' : 'orange'}>
          {count} 人
        </Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
          {status === 'active' ? '正常运营' : '已停用'}
        </Tag>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
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
            title="确定要删除这个部门吗？"
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
          <h1 className="text-2xl font-bold text-gray-800">部门管理</h1>
          <p className="text-gray-500 mt-1">管理公司各部门信息，包括添加、编辑、删除部门</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700"
        >
          新增部门
        </Button>
      </div>

      <Card className="shadow-sm">
        <Table
          columns={columns}
          dataSource={departments}
          rowKey="id"
          pagination={{
            showTotal: (total) => `共 ${total} 个部门`,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>

      <Modal
        title={editingRecord ? '编辑部门' : '新增部门'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={loading}
        okText={editingRecord ? '保存修改' : '确认添加'}
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
        >
          <Form.Item
            name="name"
            label="部门名称"
            rules={[{ required: true, message: '请输入部门名称' }]}
          >
            <Input placeholder="请输入部门名称" />
          </Form.Item>

          <Form.Item
            name="manager"
            label="部门经理"
            rules={[{ required: true, message: '请输入部门经理姓名' }]}
          >
            <Input placeholder="请输入部门经理姓名" />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
            initialValue="active"
          >
            <Select placeholder="请选择状态">
              <Option value="active">正常运营</Option>
              <Option value="inactive">已停用</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="部门描述"
          >
            <Input.TextArea
              rows={3}
              placeholder="请输入部门描述"
              showCount
              maxLength={200}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DepartmentManagement;
