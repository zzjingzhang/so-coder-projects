import { Card, Table, Button, Modal, Form, Input, Select, DatePicker, InputNumber, message, Space, Tag, Row, Col, Statistic, DatePicker as AntDatePicker } from 'antd';
import {
  PlusOutlined,
  BankOutlined,
  UserOutlined,
  CalendarOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

const { Option } = Select;
const { RangePicker } = AntDatePicker;

const SalaryManagement = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(null);

  const [salaryRecords, setSalaryRecords] = useState([
    { id: 1, employeeName: '张三', employeeId: 1, department: '技术部', baseSalary: 25000, bonus: 5000, allowance: 2000, deduction: 1000, netSalary: 31000, month: '2026-04', status: 'paid' },
    { id: 2, employeeName: '李四', employeeId: 2, department: '技术部', baseSalary: 35000, bonus: 8000, allowance: 3000, deduction: 2000, netSalary: 44000, month: '2026-04', status: 'paid' },
    { id: 3, employeeName: '王五', employeeId: 3, department: '市场部', baseSalary: 30000, bonus: 6000, allowance: 2500, deduction: 1500, netSalary: 37000, month: '2026-04', status: 'paid' },
    { id: 4, employeeName: '赵六', employeeId: 4, department: '人事部', baseSalary: 28000, bonus: 4000, allowance: 2000, deduction: 1200, netSalary: 32800, month: '2026-04', status: 'unpaid' },
    { id: 5, employeeName: '钱七', employeeId: 5, department: '财务部', baseSalary: 32000, bonus: 7000, allowance: 2800, deduction: 1800, netSalary: 40000, month: '2026-04', status: 'unpaid' },
    { id: 6, employeeName: '孙八', employeeId: 6, department: '运营部', baseSalary: 29000, bonus: 5500, allowance: 2200, deduction: 1300, netSalary: 35400, month: '2026-04', status: 'paid' },
    { id: 7, employeeName: '吴十', employeeId: 8, department: '技术部', baseSalary: 20000, bonus: 3000, allowance: 1500, deduction: 800, netSalary: 23700, month: '2026-04', status: 'paid' },
  ]);

  const departments = ['技术部', '市场部', '人事部', '财务部', '运营部', '设计部'];

  const totalSalary = salaryRecords.reduce((sum, record) => sum + record.netSalary, 0);
  const paidCount = salaryRecords.filter(r => r.status === 'paid').length;
  const unpaidCount = salaryRecords.filter(r => r.status === 'unpaid').length;

  const filteredRecords = salaryRecords.filter(record =>
    record.employeeName.includes(searchText) ||
    record.department.includes(searchText)
  );

  const columns = [
    {
      title: '员工',
      dataIndex: 'employeeName',
      key: 'employeeName',
      render: (text) => (
        <div className="flex items-center">
          <UserOutlined className="text-blue-500 mr-2" />
          <span className="font-medium">{text}</span>
        </div>
      ),
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
      title: '基本工资',
      dataIndex: 'baseSalary',
      key: 'baseSalary',
      render: (salary) => (
        <span className="text-gray-700">¥{salary?.toLocaleString()}</span>
      ),
    },
    {
      title: '奖金',
      dataIndex: 'bonus',
      key: 'bonus',
      render: (bonus) => (
        <span className="text-green-600">+¥{bonus?.toLocaleString()}</span>
      ),
    },
    {
      title: '津贴',
      dataIndex: 'allowance',
      key: 'allowance',
      render: (allowance) => (
        <span className="text-blue-600">+¥{allowance?.toLocaleString()}</span>
      ),
    },
    {
      title: '扣款',
      dataIndex: 'deduction',
      key: 'deduction',
      render: (deduction) => (
        <span className="text-red-600">-¥{deduction?.toLocaleString()}</span>
      ),
    },
    {
      title: '实发工资',
      dataIndex: 'netSalary',
      key: 'netSalary',
      render: (salary) => (
        <span className="font-bold text-green-700 text-lg">¥{salary?.toLocaleString()}</span>
      ),
    },
    {
      title: '月份',
      dataIndex: 'month',
      key: 'month',
      render: (month) => (
        <div className="flex items-center">
          <CalendarOutlined className="text-gray-500 mr-2" />
          <span>{month}</span>
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'paid' ? 'success' : 'warning'}>
          {status === 'paid' ? '已发放' : '待发放'}
        </Tag>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">薪资管理</h1>
          <p className="text-gray-500 mt-1">管理员工薪资信息，包括薪资计算、发放记录等</p>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="本月总薪资"
              value={totalSalary}
              precision={0}
              prefix="¥"
              valueStyle={{ color: '#52c41a', fontWeight: 'bold' }}
              prefix={<BankOutlined className="text-green-500 mr-2" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="已发放人数"
              value={paidCount}
              suffix="人"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="待发放人数"
              value={unpaidCount}
              suffix="人"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <Input
              placeholder="搜索员工姓名或部门..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="max-w-xs"
            />
            <DatePicker
              placeholder="选择月份"
              picker="month"
              onChange={(_, dateString) => setSelectedMonth(dateString)}
              className="max-w-xs"
            />
          </div>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="bg-blue-600 hover:bg-blue-700"
            >
              生成薪资单
            </Button>
            <Button
              type="default"
              icon={<CalendarOutlined />}
            >
              导出报表
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredRecords}
          rowKey="id"
          pagination={{
            showTotal: (total) => `共 ${total} 条薪资记录`,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      <Card title="薪资统计" className="shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.slice(0, 5).map(dept => {
            const deptRecords = salaryRecords.filter(r => r.department === dept);
            const deptTotal = deptRecords.reduce((sum, r) => sum + r.netSalary, 0);
            const deptCount = deptRecords.length;

            if (deptCount === 0) return null;

            return (
              <div
                key={dept}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800">{dept}</span>
                  <Tag color="blue">{deptCount} 人</Tag>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  ¥{deptTotal.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  人均: ¥{Math.round(deptTotal / deptCount).toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default SalaryManagement;
