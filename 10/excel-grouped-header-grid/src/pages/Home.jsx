import React from 'react'
import GridControl from '../components/GridControl'
import { exportToExcel } from '../utils/exportExcel'

const Home = () => {
  const columns = [
    {
      title: '序号',
      key: 'id',
      width: 80
    },
    {
      title: '个人信息',
      children: [
        { title: '姓名', key: 'name', width: 100 },
        { title: '年龄', key: 'age', width: 80 },
        {
          title: '联系方式',
          children: [
            { title: '电话', key: 'phone', width: 140 },
            { title: '邮箱', key: 'email', width: 200 }
          ]
        }
      ]
    },
    {
      title: '工作信息',
      children: [
        { title: '部门', key: 'department', width: 120 },
        { title: '职位', key: 'position', width: 120 },
        {
          title: '薪资',
          children: [
            { title: '基本工资', key: 'baseSalary', width: 100 },
            { title: '奖金', key: 'bonus', width: 100 }
          ]
        }
      ]
    }
  ]

  const data = [
    {
      id: 1,
      name: '张三',
      age: 28,
      phone: '13800138001',
      email: 'zhangsan@example.com',
      department: '技术部',
      position: '高级工程师',
      baseSalary: 15000,
      bonus: 3000
    },
    {
      id: 2,
      name: '李四',
      age: 32,
      phone: '13800138002',
      email: 'lisi@example.com',
      department: '市场部',
      position: '市场经理',
      baseSalary: 18000,
      bonus: 5000
    },
    {
      id: 3,
      name: '王五',
      age: 25,
      phone: '13800138003',
      email: 'wangwu@example.com',
      department: '人事部',
      position: '人事专员',
      baseSalary: 10000,
      bonus: 2000
    },
    {
      id: 4,
      name: '赵六',
      age: 35,
      phone: '13800138004',
      email: 'zhaoliu@example.com',
      department: '财务部',
      position: '财务总监',
      baseSalary: 25000,
      bonus: 8000
    },
    {
      id: 5,
      name: '钱七',
      age: 29,
      phone: '13800138005',
      email: 'qianqi@example.com',
      department: '技术部',
      position: '前端工程师',
      baseSalary: 16000,
      bonus: 4000
    }
  ]

  const handleExport = () => {
    exportToExcel(columns, data, '员工信息表.xlsx')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Excel分组列头演示
          </h1>
          <p className="text-gray-600">
            利用GridControl实现类似Excel的分组列头功能，支持多级嵌套列头和Excel导出
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleExport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            导出Excel
          </button>
          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-md text-sm font-medium">
            导出后保持分组列头结构
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            列头结构说明
          </h2>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <p>• <strong>一级分组列头：</strong>个人信息、工作信息</p>
            <p>• <strong>二级分组列头：</strong>联系方式（包含电话、邮箱）、薪资（包含基本工资、奖金）</p>
            <p>• <strong>普通列头：</strong>序号、姓名、年龄、电话、邮箱、部门、职位、基本工资、奖金</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-100 px-6 py-3 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              员工信息表
            </h2>
          </div>
          <div className="p-6">
            <GridControl columns={columns} data={data} />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <strong>提示：</strong>点击"导出Excel"按钮，下载的Excel文件将保留表格中的分组列头结构，
            使用Excel的合并单元格功能实现与网页中相同的展示效果。
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
