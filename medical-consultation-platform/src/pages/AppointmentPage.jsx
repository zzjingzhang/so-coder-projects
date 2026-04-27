import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  Star,
  MapPin,
  ChevronDown,
  X,
  Check,
  User,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from '@/components/ui/Modal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Avatar } from '@/components/ui/Avatar';
import { doctors, departments, appointments } from '@/data/mockData';
import { cn, formatDate, formatCurrency, getStatusBadgeColor, getStatusText } from '@/utils';

const timeSlots = {
  morning: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30'],
  afternoon: ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'],
};

export const AppointmentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedDoctorId, setSelectedDoctorId] = useState(searchParams.get('doctor') || '');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [activeTab, setActiveTab] = useState('doctors');
  const [patientName, setPatientName] = useState('张三');
  const [patientPhone, setPatientPhone] = useState('138****8888');
  const [symptoms, setSymptoms] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    let result = [...doctors];
    
    if (selectedDepartment) {
      result = result.filter(d => d.department === selectedDepartment);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        d => d.name.toLowerCase().includes(query) ||
             d.specialization.toLowerCase().includes(query) ||
             d.departmentName.toLowerCase().includes(query)
      );
    }
    
    if (selectedDoctorId) {
      const doctor = doctors.find(d => d.id === selectedDoctorId);
      if (doctor) {
        result = [doctor];
      }
    }
    
    setFilteredDoctors(result);
  }, [selectedDepartment, searchQuery, selectedDoctorId]);

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    setSelectedDate(formatDate(today));
  }, []);

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('请选择日期和时间');
      return;
    }
    setBookingSuccess(true);
    setTimeout(() => {
      setIsBookingModalOpen(false);
      setBookingSuccess(false);
      setActiveTab('appointments');
    }, 2000);
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: formatDate(date),
        label: date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', weekday: 'short' }),
      });
    }
    return dates;
  };

  const dates = generateDates();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">医生预约</h1>
          <p className="text-text-secondary mt-1">按科室和医生预约挂号服务</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="doctors">预约医生</TabsTrigger>
          <TabsTrigger value="appointments">我的预约</TabsTrigger>
        </TabsList>

        <TabsContent value="doctors" className="mt-6 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <Input
                    placeholder="搜索医生姓名、科室、专长..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="w-full lg:w-64">
                  <Select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    placeholder="选择科室"
                  >
                    <option value="">全部科室</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar src={doctor.avatar} alt={doctor.name} size="xl" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-text">{doctor.name}</h3>
                          {doctor.isOnline && (
                            <Badge variant="success" size="sm">在线</Badge>
                          )}
                        </div>
                        <p className="text-text-secondary mb-1">{doctor.title}</p>
                        <p className="text-sm text-text-secondary">{doctor.departmentName}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="text-text font-medium">{doctor.rating}</span>
                        <span className="text-text-secondary">· 接诊 {doctor.consultationCount.toLocaleString()} 次</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="w-4 h-4 text-text-secondary" />
                        <span className="text-text-secondary">从业 {doctor.experience} 年</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="w-4 h-4 text-text-secondary" />
                        <span className="text-text-secondary">{doctor.specialization}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-primary">
                        {formatCurrency(doctor.consultationFee)}
                        <span className="text-sm font-normal text-text-secondary">/挂号费</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => navigate(`/consultation?doctor=${doctor.id}`)}
                        >
                          问诊
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleBookAppointment(doctor)}
                        >
                          预约
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <Search className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text mb-2">未找到符合条件的医生</h3>
                <p className="text-text-secondary">请尝试调整搜索条件或筛选条件</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="appointments" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>我的预约记录</CardTitle>
            </CardHeader>
            <CardContent>
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-background rounded-lg border border-border-light gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-text">{appointment.doctorName}</h4>
                            <Badge variant="secondary" className={getStatusBadgeColor(appointment.status)}>
                              {getStatusText(appointment.status)}
                            </Badge>
                          </div>
                          <p className="text-sm text-text-secondary mb-1">
                            {appointment.department} · {appointment.type}
                          </p>
                          <p className="text-sm text-text-secondary">
                            {appointment.date} {appointment.time}
                          </p>
                          {appointment.symptoms && (
                            <p className="text-sm text-text-secondary mt-1">
                              症状：{appointment.symptoms}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {appointment.status === 'pending' && (
                          <>
                            <Button variant="primary" size="sm">查看详情</Button>
                            <Button variant="danger" size="sm">取消预约</Button>
                          </>
                        )}
                        {appointment.status === 'confirmed' && (
                          <>
                            <Button variant="primary" size="sm">查看详情</Button>
                            <Button variant="secondary" size="sm">修改时间</Button>
                          </>
                        )}
                        {appointment.status === 'completed' && (
                          <Button variant="secondary" size="sm">查看病历</Button>
                        )}
                        {appointment.status === 'cancelled' && (
                          <Button variant="primary" size="sm">重新预约</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-text mb-2">暂无预约记录</h3>
                  <p className="text-text-secondary mb-4">您还没有任何预约记录</p>
                  <Button variant="primary" onClick={() => setActiveTab('doctors')}>
                    立即预约
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        size="lg"
      >
        {bookingSuccess ? (
          <ModalContent className="text-center py-8">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-xl font-semibold text-text mb-2">预约成功！</h3>
            <p className="text-text-secondary">
              您已成功预约 {selectedDoctor?.name} 医生，预约时间：{selectedDate} {selectedTime}
            </p>
          </ModalContent>
        ) : (
          <>
            <ModalHeader>
              <ModalTitle>预约挂号</ModalTitle>
            </ModalHeader>
            <ModalContent className="space-y-6">
              {selectedDoctor && (
                <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border-light">
                  <Avatar src={selectedDoctor.avatar} alt={selectedDoctor.name} size="lg" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-text">{selectedDoctor.name}</h4>
                      <Badge variant="primary" size="sm">{selectedDoctor.title}</Badge>
                    </div>
                    <p className="text-sm text-text-secondary">{selectedDoctor.departmentName} · {selectedDoctor.specialization}</p>
                    <p className="text-lg font-semibold text-primary mt-1">
                      {formatCurrency(selectedDoctor.consultationFee)}
                      <span className="text-sm font-normal text-text-secondary">/挂号费</span>
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">选择日期</label>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {dates.map((date) => (
                      <button
                        key={date.value}
                        onClick={() => setSelectedDate(date.value)}
                        className={cn(
                          'flex-shrink-0 px-4 py-2 rounded-lg border transition-all',
                          selectedDate === date.value
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        <div className="text-sm font-medium">{date.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">选择时间</label>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-text-secondary mb-2 flex items-center gap-1">
                        <Clock className="w-4 h-4" /> 上午
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {timeSlots.morning.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={cn(
                              'px-4 py-2 rounded-lg border text-sm transition-all',
                              selectedTime === time
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-border hover:border-primary/50'
                            )}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary mb-2 flex items-center gap-1">
                        <Clock className="w-4 h-4" /> 下午
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {timeSlots.afternoon.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={cn(
                              'px-4 py-2 rounded-lg border text-sm transition-all',
                              selectedTime === time
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-border hover:border-primary/50'
                            )}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">患者姓名</label>
                    <Input
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="请输入患者姓名"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">联系电话</label>
                    <Input
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="请输入联系电话"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">症状描述</label>
                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="请简要描述您的症状，以便医生提前了解病情..."
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>
              </div>
            </ModalContent>
            <ModalFooter className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setIsBookingModalOpen(false)}>
                取消
              </Button>
              <Button variant="primary" onClick={handleConfirmBooking}>
                确认预约
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </div>
  );
};
