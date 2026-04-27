import { useState } from 'react';
import {
  User,
  Heart,
  Activity,
  TrendingUp,
  Calendar,
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  Download,
  Edit,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from '@/components/ui/Modal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Avatar } from '@/components/ui/Avatar';
import { healthRecords, healthData, medicalExaminations } from '@/data/mockData';
import { cn, formatDate, calculateAge } from '@/utils';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const healthDataTypes = [
  { value: 'bloodPressure', label: '血压' },
  { value: 'bloodSugar', label: '血糖' },
  { value: 'heartRate', label: '心率' },
  { value: 'weight', label: '体重' },
];

export const HealthRecordsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDataType, setSelectedDataType] = useState('bloodPressure');
  const [selectedExamination, setSelectedExamination] = useState(null);
  const [isExaminationModalOpen, setIsExaminationModalOpen] = useState(false);
  const [isAddDataModalOpen, setIsAddDataModalOpen] = useState(false);
  const [newData, setNewData] = useState({
    type: 'bloodPressure',
    systolic: '',
    diastolic: '',
    fasting: '',
    postprandial: '',
    heartRate: '',
    weight: '',
    date: formatDate(new Date()),
    time: '',
    note: '',
  });

  const patientInfo = healthRecords[0];
  const patientAge = patientInfo ? calculateAge(patientInfo.basicInfo.birthDate) : 0;

  const getFilteredHealthData = (type) => {
    return healthData
      .filter(d => d.type === type)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-7);
  };

  const bloodPressureData = getFilteredHealthData('bloodPressure').map(d => ({
    date: d.date.slice(5),
    收缩压: d.value.systolic,
    舒张压: d.value.diastolic,
  }));

  const bloodSugarData = getFilteredHealthData('bloodSugar').map(d => ({
    date: d.date.slice(5),
    空腹血糖: d.value.fasting,
    餐后血糖: d.value.postprandial,
  }));

  const heartRateData = getFilteredHealthData('heartRate').map(d => ({
    date: d.date.slice(5),
    心率: d.value,
  }));

  const weightData = getFilteredHealthData('weight').map(d => ({
    date: d.date.slice(5),
    体重: d.value,
  }));

  const getLatestHealthValue = (type) => {
    const data = healthData
      .filter(d => d.type === type)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    return data[0];
  };

  const latestBloodPressure = getLatestHealthValue('bloodPressure');
  const latestBloodSugar = getLatestHealthValue('bloodSugar');
  const latestHeartRate = getLatestHealthValue('heartRate');
  const latestWeight = getLatestHealthValue('weight');

  const getBloodPressureStatus = (systolic, diastolic) => {
    if (systolic >= 140 || diastolic >= 90) return { status: '偏高', color: 'warning' };
    if (systolic >= 120 || diastolic >= 80) return { status: '正常高值', color: 'accent' };
    if (systolic < 90 || diastolic < 60) return { status: '偏低', color: 'warning' };
    return { status: '正常', color: 'success' };
  };

  const getBloodSugarStatus = (fasting) => {
    if (fasting >= 7.0) return { status: '偏高', color: 'warning' };
    if (fasting >= 6.1) return { status: '偏高', color: 'warning' };
    return { status: '正常', color: 'success' };
  };

  const handleViewExamination = (exam) => {
    setSelectedExamination(exam);
    setIsExaminationModalOpen(true);
  };

  const handleAddHealthData = () => {
    setIsAddDataModalOpen(true);
  };

  const handleSaveHealthData = () => {
    console.log('保存健康数据:', newData);
    setIsAddDataModalOpen(false);
    setNewData({
      type: 'bloodPressure',
      systolic: '',
      diastolic: '',
      fasting: '',
      postprandial: '',
      heartRate: '',
      weight: '',
      date: formatDate(new Date()),
      time: '',
      note: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">健康档案</h1>
          <p className="text-text-secondary mt-1">个人健康数据和体检报告</p>
        </div>
        <Button variant="primary" onClick={handleAddHealthData}>
          <Plus className="w-4 h-4 mr-2" /> 记录健康数据
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
                alt={patientInfo?.patientName}
                size="xl"
              />
              <div>
                <h2 className="text-xl font-semibold text-text">{patientInfo?.patientName}</h2>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <span className="text-sm text-text-secondary">
                    {patientInfo?.basicInfo.gender} · {patientAge}岁
                  </span>
                  <span className="text-sm text-text-secondary">
                    血型：{patientInfo?.basicInfo.bloodType} {patientInfo?.basicInfo.bloodTypeRh}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1" />
            <div className="flex flex-wrap gap-3">
              {patientInfo?.allergies.length > 0 && (
                <Badge variant="danger" className="flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  过敏史：{patientInfo.allergies.join('、')}
                </Badge>
              )}
              {patientInfo?.chronicDiseases.length > 0 && (
                <Badge variant="warning" className="flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  慢性病：{patientInfo.chronicDiseases.join('、')}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">健康概览</TabsTrigger>
          <TabsTrigger value="trends">健康趋势</TabsTrigger>
          <TabsTrigger value="examinations">体检报告</TabsTrigger>
          <TabsTrigger value="details">详细档案</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {latestBloodPressure && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-primary" />
                      <span className="font-medium text-text">血压</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className={cn(
                        getBloodPressureStatus(latestBloodPressure.value.systolic, latestBloodPressure.value.diastolic).color === 'success' && 'bg-success/10 text-success',
                        getBloodPressureStatus(latestBloodPressure.value.systolic, latestBloodPressure.value.diastolic).color === 'warning' && 'bg-warning/10 text-warning',
                        getBloodPressureStatus(latestBloodPressure.value.systolic, latestBloodPressure.value.diastolic).color === 'danger' && 'bg-danger/10 text-danger'
                      )}
                    >
                      {getBloodPressureStatus(latestBloodPressure.value.systolic, latestBloodPressure.value.diastolic).status}
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-text mb-1">
                    {latestBloodPressure.value.systolic}/{latestBloodPressure.value.diastolic}
                    <span className="text-sm font-normal text-text-secondary ml-1">mmHg</span>
                  </div>
                  <p className="text-xs text-text-secondary">{latestBloodPressure.date} {latestBloodPressure.time || ''}</p>
                </CardContent>
              </Card>
            )}

            {latestBloodSugar && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-accent" />
                      <span className="font-medium text-text">空腹血糖</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className={cn(
                        getBloodSugarStatus(latestBloodSugar.value.fasting).color === 'success' && 'bg-success/10 text-success',
                        getBloodSugarStatus(latestBloodSugar.value.fasting).color === 'warning' && 'bg-warning/10 text-warning'
                      )}
                    >
                      {getBloodSugarStatus(latestBloodSugar.value.fasting).status}
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-text mb-1">
                    {latestBloodSugar.value.fasting}
                    <span className="text-sm font-normal text-text-secondary ml-1">mmol/L</span>
                  </div>
                  <p className="text-xs text-text-secondary">{latestBloodSugar.date}</p>
                </CardContent>
              </Card>
            )}

            {latestHeartRate && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-secondary" />
                      <span className="font-medium text-text">心率</span>
                    </div>
                    <Badge variant="success" className="bg-success/10 text-success">正常</Badge>
                  </div>
                  <div className="text-3xl font-bold text-text mb-1">
                    {latestHeartRate.value}
                    <span className="text-sm font-normal text-text-secondary ml-1">次/分</span>
                  </div>
                  <p className="text-xs text-text-secondary">{latestHeartRate.date}</p>
                </CardContent>
              </Card>
            )}

            {latestWeight && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      <span className="font-medium text-text">体重</span>
                    </div>
                    <Badge variant="accent" className="bg-accent/10 text-accent">BMI: 25.5</Badge>
                  </div>
                  <div className="text-3xl font-bold text-text mb-1">
                    {latestWeight.value}
                    <span className="text-sm font-normal text-text-secondary ml-1">kg</span>
                  </div>
                  <p className="text-xs text-text-secondary">{latestWeight.date}</p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg font-semibold">最近7天血压趋势</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={bloodPressureData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} />
                      <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="收缩压" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} />
                      <Line type="monotone" dataKey="舒张压" stroke="#0ea5e9" strokeWidth={2} dot={{ fill: '#0ea5e9' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg font-semibold">最近7天血糖趋势</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={bloodSugarData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} />
                      <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="空腹血糖" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} />
                      <Line type="monotone" dataKey="餐后血糖" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-0">
              <CardTitle className="text-lg font-semibold">最近体检报告</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setActiveTab('examinations')}>
                查看全部 <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {medicalExaminations.slice(0, 3).map((exam) => (
                  <div
                    key={exam.id}
                    className="card-hover p-4 bg-background rounded-lg border border-border-light cursor-pointer"
                    onClick={() => handleViewExamination(exam)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="font-medium text-text">{exam.type}</span>
                      </div>
                      <Badge variant="primary" size="sm">{exam.level}</Badge>
                    </div>
                    <p className="text-sm text-text-secondary mb-1">{exam.hospital}</p>
                    <p className="text-sm text-text-secondary">{formatDate(exam.date)}</p>
                    {exam.overallResult && (
                      <p className="text-sm text-text mt-2 pt-2 border-t border-border-light line-clamp-2">
                        {exam.overallResult}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="mt-6 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-64">
                  <Select
                    value={selectedDataType}
                    onChange={(e) => setSelectedDataType(e.target.value)}
                  >
                    {healthDataTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg font-semibold">
                  {healthDataTypes.find(t => t.value === selectedDataType)?.label}趋势图表
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    {selectedDataType === 'bloodPressure' && (
                      <LineChart data={bloodPressureData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="收缩压" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} />
                        <Line type="monotone" dataKey="舒张压" stroke="#0ea5e9" strokeWidth={2} dot={{ fill: '#0ea5e9' }} />
                      </LineChart>
                    )}
                    {selectedDataType === 'bloodSugar' && (
                      <LineChart data={bloodSugarData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="空腹血糖" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} />
                        <Line type="monotone" dataKey="餐后血糖" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
                      </LineChart>
                    )}
                    {selectedDataType === 'heartRate' && (
                      <AreaChart data={heartRateData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                          }}
                        />
                        <Area type="monotone" dataKey="心率" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
                      </AreaChart>
                    )}
                    {selectedDataType === 'weight' && (
                      <BarChart data={weightData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                          }}
                        />
                        <Bar dataKey="体重" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="examinations" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {medicalExaminations.map((exam) => (
              <Card
                key={exam.id}
                className="card-hover cursor-pointer"
                onClick={() => handleViewExamination(exam)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-text">{exam.type}</h3>
                        <p className="text-sm text-text-secondary">{exam.hospital}</p>
                      </div>
                    </div>
                    <Badge variant="primary" size="sm">{exam.level}</Badge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-4 h-4 text-text-secondary" />
                      <span className="text-text-secondary">体检日期：</span>
                      <span className="text-text">{formatDate(exam.date)}</span>
                    </div>
                  </div>
                  {exam.overallResult && (
                    <div className="p-3 bg-background rounded-lg border border-border-light">
                      <p className="text-sm text-text line-clamp-3">{exam.overallResult}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details" className="mt-6 space-y-6">
          {patientInfo && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">基本信息</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-sm text-text-secondary mb-1">姓名</p>
                      <p className="font-medium text-text">{patientInfo.patientName}</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-sm text-text-secondary mb-1">性别</p>
                      <p className="font-medium text-text">{patientInfo.basicInfo.gender}</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-sm text-text-secondary mb-1">年龄</p>
                      <p className="font-medium text-text">{patientAge}岁</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-sm text-text-secondary mb-1">出生日期</p>
                      <p className="font-medium text-text">{formatDate(patientInfo.basicInfo.birthDate)}</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-sm text-text-secondary mb-1">血型</p>
                      <p className="font-medium text-text">{patientInfo.basicInfo.bloodType} {patientInfo.basicInfo.bloodTypeRh}</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-sm text-text-secondary mb-1">婚姻状况</p>
                      <p className="font-medium text-text">{patientInfo.basicInfo.maritalStatus}</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-sm text-text-secondary mb-1">职业</p>
                      <p className="font-medium text-text">{patientInfo.basicInfo.occupation}</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-sm text-text-secondary mb-1">身高</p>
                      <p className="font-medium text-text">{patientInfo.basicInfo.height}cm</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-sm text-text-secondary mb-1">体重</p>
                      <p className="font-medium text-text">{patientInfo.basicInfo.weight}kg</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">过敏史</CardTitle>
                </CardHeader>
                <CardContent>
                  {patientInfo.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {patientInfo.allergies.map((allergy, index) => (
                        <Badge key={index} variant="danger" className="flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-text-secondary">暂无过敏史记录</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">慢性病史</CardTitle>
                </CardHeader>
                <CardContent>
                  {patientInfo.chronicDiseases.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {patientInfo.chronicDiseases.map((disease, index) => (
                        <Badge key={index} variant="warning" className="flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {disease}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-text-secondary">暂无慢性病史记录</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">家族病史</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-sm text-text-secondary mb-2">父亲</p>
                      {patientInfo.familyHistory.father.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {patientInfo.familyHistory.father.map((disease, index) => (
                            <Badge key={index} variant="secondary" size="sm">{disease}</Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-text-secondary">无</p>
                      )}
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-sm text-text-secondary mb-2">母亲</p>
                      {patientInfo.familyHistory.mother.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {patientInfo.familyHistory.mother.map((disease, index) => (
                            <Badge key={index} variant="secondary" size="sm">{disease}</Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-text-secondary">无</p>
                      )}
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-sm text-text-secondary mb-2">兄弟姐妹</p>
                      {patientInfo.familyHistory.siblings.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {patientInfo.familyHistory.siblings.map((disease, index) => (
                            <Badge key={index} variant="secondary" size="sm">{disease}</Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-text-secondary">无</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">生活方式</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-sm text-text-secondary mb-1">吸烟</p>
                      <p className="font-medium text-text">{patientInfo.lifestyle.smoking ? '是' : '否'}</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-sm text-text-secondary mb-1">饮酒</p>
                      <p className="font-medium text-text">{patientInfo.lifestyle.drinking}</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-sm text-text-secondary mb-1">运动</p>
                      <p className="font-medium text-text">{patientInfo.lifestyle.exercise}</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-sm text-text-secondary mb-1">睡眠时长</p>
                      <p className="font-medium text-text">{patientInfo.lifestyle.sleepHours}小时/天</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-sm text-text-secondary mb-1">饮食习惯</p>
                      <p className="font-medium text-text">{patientInfo.lifestyle.diet}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>

      <Modal
        isOpen={isExaminationModalOpen}
        onClose={() => setIsExaminationModalOpen(false)}
        size="xl"
      >
        {selectedExamination && (
          <>
            <ModalHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ModalTitle>{selectedExamination.type}</ModalTitle>
                    <Badge variant="primary">{selectedExamination.level}</Badge>
                  </div>
                  <p className="text-sm text-text-secondary">
                    {selectedExamination.hospital} · {formatDate(selectedExamination.date)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">
                    <Download className="w-4 h-4 mr-1" /> 下载
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Printer className="w-4 h-4 mr-1" /> 打印
                  </Button>
                </div>
              </div>
            </ModalHeader>
            <ModalContent className="space-y-6">
              {selectedExamination.overallResult && (
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    总体结论
                  </h4>
                  <p className="text-text">{selectedExamination.overallResult}</p>
                </div>
              )}

              {selectedExamination.doctorAdvice && (
                <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <h4 className="font-medium text-accent mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    医生建议
                  </h4>
                  <p className="text-text">{selectedExamination.doctorAdvice}</p>
                </div>
              )}

              <div className="space-y-4">
                {selectedExamination.categories.map((category, catIndex) => (
                  <div key={catIndex} className="p-4 bg-background rounded-lg border border-border-light">
                    <h4 className="font-medium text-text mb-4">{category.name}</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-surface">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-text-secondary uppercase">
                              检查项目
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-text-secondary uppercase">
                              检查结果
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-text-secondary uppercase">
                              参考范围
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-text-secondary uppercase">
                              状态
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border-light">
                          {category.items.map((item, itemIndex) => (
                            <tr key={itemIndex}>
                              <td className="px-4 py-3 text-sm text-text">{item.name}</td>
                              <td className="px-4 py-3 text-sm font-medium text-text">{item.value}</td>
                              <td className="px-4 py-3 text-sm text-text-secondary">{item.reference}</td>
                              <td className="px-4 py-3">
                                {item.status === 'normal' ? (
                                  <Badge variant="success" size="sm" className="bg-success/10 text-success">正常</Badge>
                                ) : (
                                  <Badge variant="warning" size="sm" className="bg-warning/10 text-warning">异常</Badge>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </ModalContent>
            <ModalFooter className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setIsExaminationModalOpen(false)}>
                关闭
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>

      <Modal
        isOpen={isAddDataModalOpen}
        onClose={() => setIsAddDataModalOpen(false)}
        size="md"
      >
        <ModalHeader>
          <ModalTitle>记录健康数据</ModalTitle>
        </ModalHeader>
        <ModalContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-2">数据类型</label>
            <Select
              value={newData.type}
              onChange={(e) => setNewData({ ...newData, type: e.target.value })}
            >
              {healthDataTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </Select>
          </div>

          {newData.type === 'bloodPressure' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">收缩压 (mmHg)</label>
                <Input
                  type="number"
                  value={newData.systolic}
                  onChange={(e) => setNewData({ ...newData, systolic: e.target.value })}
                  placeholder="如：120"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">舒张压 (mmHg)</label>
                <Input
                  type="number"
                  value={newData.diastolic}
                  onChange={(e) => setNewData({ ...newData, diastolic: e.target.value })}
                  placeholder="如：80"
                />
              </div>
            </div>
          )}

          {newData.type === 'bloodSugar' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">空腹血糖 (mmol/L)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={newData.fasting}
                  onChange={(e) => setNewData({ ...newData, fasting: e.target.value })}
                  placeholder="如：5.6"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">餐后血糖 (mmol/L)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={newData.postprandial}
                  onChange={(e) => setNewData({ ...newData, postprandial: e.target.value })}
                  placeholder="如：7.8"
                />
              </div>
            </div>
          )}

          {newData.type === 'heartRate' && (
            <div>
              <label className="block text-sm font-medium text-text mb-2">心率 (次/分)</label>
              <Input
                type="number"
                value={newData.heartRate}
                onChange={(e) => setNewData({ ...newData, heartRate: e.target.value })}
                placeholder="如：75"
              />
            </div>
          )}

          {newData.type === 'weight' && (
            <div>
              <label className="block text-sm font-medium text-text mb-2">体重 (kg)</label>
              <Input
                type="number"
                step="0.1"
                value={newData.weight}
                onChange={(e) => setNewData({ ...newData, weight: e.target.value })}
                placeholder="如：70.5"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">日期</label>
              <Input
                type="date"
                value={newData.date}
                onChange={(e) => setNewData({ ...newData, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2">时间</label>
              <Input
                type="time"
                value={newData.time}
                onChange={(e) => setNewData({ ...newData, time: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">备注</label>
            <textarea
              value={newData.note}
              onChange={(e) => setNewData({ ...newData, note: e.target.value })}
              placeholder="添加备注信息..."
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={3}
            />
          </div>
        </ModalContent>
        <ModalFooter className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setIsAddDataModalOpen(false)}>
            取消
          </Button>
          <Button variant="primary" onClick={handleSaveHealthData}>
            保存
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
