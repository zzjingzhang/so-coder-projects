import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MessageCircle,
  FileText,
  Pill,
  User,
  AlertTriangle,
  ChevronRight,
  Star,
  Clock,
  MapPin,
  Phone,
  TrendingUp,
  Heart,
  Activity,
  Plus,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { doctors, departments, appointments, hospitals } from '@/data/mockData';
import { cn, formatDate, getStatusBadgeColor, getStatusText } from '@/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const healthTrendData = [
  { name: '周一', 血压: 140, 心率: 75 },
  { name: '周二', 血压: 138, 心率: 78 },
  { name: '周三', 血压: 142, 心率: 80 },
  { name: '周四', 血压: 135, 心率: 72 },
  { name: '周五', 血压: 139, 心率: 76 },
  { name: '周六', 血压: 136, 心率: 74 },
  { name: '周日', 血压: 140, 心率: 78 },
];

const quickActions = [
  { title: '医生预约', icon: Calendar, path: '/appointment', color: 'primary', description: '按科室和医生预约挂号' },
  { title: '在线问诊', icon: MessageCircle, path: '/consultation', color: 'secondary', description: '视频或文字在线咨询' },
  { title: '病历管理', icon: FileText, path: '/medical-records', color: 'accent', description: '电子病历和就诊记录' },
  { title: '药品信息', icon: Pill, path: '/medicines', color: 'primary', description: '药品查询和用药指导' },
  { title: '健康档案', icon: User, path: '/health-records', color: 'secondary', description: '个人健康数据和体检报告' },
  { title: '紧急求助', icon: AlertTriangle, path: '/emergency', color: 'danger', description: '紧急医疗求助和医院推荐' },
];

export const HomePage = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recommendedDoctors, setRecommendedDoctors] = useState([]);

  useEffect(() => {
    setUpcomingAppointments(appointments.filter(a => a.status === 'confirmed' || a.status === 'pending').slice(0, 3));
    setRecommendedDoctors(doctors.slice(0, 4));
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">欢迎回来，张三</h1>
            <p className="text-white/80 mb-4">
              今天是 {formatDate(new Date())}，祝您身体健康！
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" size="sm" to="/appointment">
                预约医生 <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-white text-white hover:bg-white/20" to="/consultation">
                在线问诊 <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <div className="text-3xl font-bold mb-1">4</div>
              <div className="text-sm text-white/80">总预约</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <div className="text-3xl font-bold mb-1">2</div>
              <div className="text-sm text-white/80">待就诊</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <div className="text-3xl font-bold mb-1">3</div>
              <div className="text-sm text-white/80">病历数</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              to={action.path}
              className="card-hover bg-white rounded-xl p-4 border border-border flex flex-col items-center text-center hover:shadow-md"
            >
              <div className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center mb-3',
                action.color === 'primary' && 'bg-primary/10',
                action.color === 'secondary' && 'bg-secondary/10',
                action.color === 'accent' && 'bg-accent/10',
                action.color === 'danger' && 'bg-danger/10',
              )}>
                <Icon className={cn(
                  'w-6 h-6',
                  action.color === 'primary' && 'text-primary',
                  action.color === 'secondary' && 'text-secondary',
                  action.color === 'accent' && 'text-accent',
                  action.color === 'danger' && 'text-danger',
                )} />
              </div>
              <h3 className="font-medium text-text mb-1">{action.title}</h3>
              <p className="text-xs text-text-secondary line-clamp-2">{action.description}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">待处理预约</CardTitle>
            <Button variant="ghost" size="sm" to="/appointment">
              查看全部 <ChevronRight className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-3 bg-background rounded-lg border border-border-light"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-text">{appointment.doctorName}</p>
                        <p className="text-sm text-text-secondary">
                          {appointment.department} · {appointment.date} {appointment.time}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className={getStatusBadgeColor(appointment.status)}>
                      {getStatusText(appointment.status)}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-text-secondary mx-auto mb-3" />
                <p className="text-text-secondary">暂无待处理预约</p>
                <Button variant="primary" size="sm" className="mt-3" to="/appointment">立即预约</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">健康趋势</CardTitle>
            <Button variant="ghost" size="sm" to="/health-records">
              查看详情 <ChevronRight className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Line type="monotone" dataKey="血压" stroke="#0ea5e9" strokeWidth={2} dot={{ fill: '#0ea5e9' }} />
                  <Line type="monotone" dataKey="心率" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm text-text-secondary">血压</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span className="text-sm text-text-secondary">心率</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">推荐医生</CardTitle>
          <Button variant="ghost" size="sm" to="/appointment">
            更多医生 <ChevronRight className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="card-hover bg-background rounded-xl p-4 border border-border-light"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Avatar src={doctor.avatar} alt={doctor.name} size="lg" />
                  <div>
                    <h4 className="font-medium text-text">{doctor.name}</h4>
                    <p className="text-sm text-text-secondary">{doctor.title}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="text-text">{doctor.rating}</span>
                    <span className="text-text-secondary">· 接诊 {doctor.consultationCount.toLocaleString()} 次</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-secondary">从业 {doctor.experience} 年</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-secondary">{doctor.departmentName}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" className="flex-1" to={`/appointment?doctor=${doctor.id}`}>预约</Button>
                  <Button variant="secondary" size="sm" to={`/consultation?doctor=${doctor.id}`}>问诊</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">附近医院</CardTitle>
            <Button variant="ghost" size="sm" to="/emergency">
              查看全部 <ChevronRight className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hospitals.slice(0, 3).map((hospital) => (
                <div
                  key={hospital.id}
                  className="flex items-center gap-4 p-3 bg-background rounded-lg border border-border-light"
                >
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-text truncate">{hospital.name}</h4>
                      <Badge variant="primary" size="sm">{hospital.level}</Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-text-secondary mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{hospital.address}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4 text-text-secondary" />
                        <span className="text-text-secondary">{hospital.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="w-4 h-4 text-text-secondary" />
                        <span className="text-text-secondary">{hospital.distance}km</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="text-text">{hospital.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">快捷健康数据</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">血压</p>
                    <p className="font-medium text-text">140/88 mmHg</p>
                  </div>
                </div>
                <Badge variant="warning" size="sm">偏高</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">心率</p>
                    <p className="font-medium text-text">78 次/分</p>
                  </div>
                </div>
                <Badge variant="success" size="sm">正常</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">血糖</p>
                    <p className="font-medium text-text">5.8 mmol/L</p>
                  </div>
                </div>
                <Badge variant="warning" size="sm">偏高</Badge>
              </div>

              <Button variant="primary" className="w-full" to="/health-records">
                <Plus className="w-4 h-4" /> 记录健康数据
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
