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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <UserOutlined style={{ color: '#3b82f6', marginRight: '8px' }} />
          <span style={{ fontWeight: 500 }}>{text}</span>
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
        <span style={{ color: '#374151' }}>¥{salary?.toLocaleString()}</span>
      ),
    },
    {
      title: '奖金',
      dataIndex: 'bonus',
      key: 'bonus',
      render: (bonus) => (
        <span style={{ color: '#16a34a' }}>+¥{bonus?.toLocaleString()}</span>
      ),
    },
    {
      title: '津贴',
      dataIndex: 'allowance',
      key: 'allowance',
      render: (allowance) => (
        <span style={{ color: '#2563eb' }}>+¥{allowance?.toLocaleString()}</span>
      ),
    },
    {
      title: '扣款',
      dataIndex: 'deduction',
      key: 'deduction',
      render: (deduction) => (
        <span style={{ color: '#dc2626' }}>-¥{deduction?.toLocaleString()}</span>
      ),
    },
    {
      title: '实发工资',
      dataIndex: 'netSalary',
      key: 'netSalary',
      render: (salary) => (
        <span style={{ fontWeight: 700, color: '#15803d', fontSize: '18px' }}>¥{salary?.toLocaleString()}</span>
      ),
    },
    {
      title: '月份',
      dataIndex: 'month',
      key: 'month',
      render: (month) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CalendarOutlined style={{ color: '#6b7280', marginRight: '8px' }} />
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
            薪资管理
          </h1>
          <p 
            style={{ 
              color: '#6b7280',
              marginTop: '4px',
              marginBottom: 0,
              fontSize: '14px',
            }}
          >
            管理员工薪资信息，包括薪资计算、发放记录等
          </p>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8}>
          <Card
            bordered={false}
            style={{ 
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              borderRadius: '8px',
            }}
          >
            <Statistic
              title="本月总薪资"
              value={totalSalary}
              precision={0}
              prefix="¥"
              style={{ textAlign: 'center' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            bordered={false}
            style={{ 
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              borderRadius: '8px',
            }}
          >
            <Statistic
              title="已发放人数"
              value={paidCount}
              suffix="人"
              style={{ textAlign: 'center' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            bordered={false}
            style={{ 
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              borderRadius: '8px',
            }}
          >
            <Statistic
              title="待发放人数"
              value={unpaidCount}
              suffix="人"
              style={{ textAlign: 'center' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
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
            gap: '16px',
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <Input
              placeholder="搜索员工姓名或部门..."
              prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ maxWidth: '320px' }}
            />
            <DatePicker
              placeholder="选择月份"
              picker="month"
              onChange={(_, dateString) => setSelectedMonth(dateString)}
              style={{ maxWidth: '320px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ 
                backgroundColor: '#2563eb',
                borderColor: '#2563eb',
              }}
            >
              生成薪资单
            </Button>
            <Button
              type="default"
              icon={<CalendarOutlined />}
            >
              导出报表
            </Button>
          </div>
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

      <Card
        title="薪资统计"
        bordered={false}
        style={{ 
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          borderRadius: '8px',
        }}
      >
        <Row gutter={[24, 24]}>
          {departments.slice(0, 5).map(dept => {
            const deptRecords = salaryRecords.filter(r => r.department === dept);
            const deptTotal = deptRecords.reduce((sum, r) => sum + r.netSalary, 0);
            const deptCount = deptRecords.length;

            if (deptCount === 0) return null;

            return (
              <Col key={dept} xs={24} sm={12} md={8}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #eff6ff 0%, #eef2ff 100%)',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #dbeafe',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600, color: '#1f2937' }}>{dept}</span>
                    <Tag color="blue">{deptCount} 人</Tag>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#16a34a' }}>
                    ¥{deptTotal.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                    人均: ¥{Math.round(deptTotal / deptCount).toLocaleString()}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Card>
    </div>
  );
};

export default SalaryManagement;
