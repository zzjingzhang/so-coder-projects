import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  MessageCircle,
  Video,
  Phone,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Clock,
  Star,
  MapPin,
  User,
  ChevronDown,
  Check,
  CheckCheck,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Avatar } from '@/components/ui/Avatar';
import { doctors, consultations } from '@/data/mockData';
import { cn, formatTime, formatDate } from '@/utils';

export const ConsultationPage = () => {
  const [searchParams] = useSearchParams();
  const [selectedDoctorId, setSelectedDoctorId] = useState(searchParams.get('doctor') || '');
  const [activeTab, setActiveTab] = useState('active');
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [consultationType, setConsultationType] = useState('text');
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedConsultation) {
      setMessages(selectedConsultation.messages);
    }
  }, [selectedConsultation]);

  useEffect(() => {
    if (selectedDoctorId && !selectedConsultation) {
      const doctor = doctors.find(d => d.id === selectedDoctorId);
      if (doctor) {
        setSelectedConsultation({
          id: 'new-consult',
          doctorId: doctor.id,
          doctorName: doctor.name,
          doctorAvatar: doctor.avatar,
          patientId: 'patient-1',
          patientName: '张三',
          type: 'text',
          status: 'active',
          startTime: formatDate(new Date()),
          symptoms: '',
          messages: [
            {
              id: 'msg-welcome',
              sender: 'system',
              content: '您好，我是助手小医，请问有什么可以帮您的？',
              timestamp: formatDate(new Date()) + 'T' + formatTime(new Date()),
            },
          ],
        });
        setMessages([
          {
            id: 'msg-welcome',
            sender: 'system',
            content: '您好，我是助手小医，请问有什么可以帮您的？',
            timestamp: formatDate(new Date()) + 'T' + formatTime(new Date()),
          },
        ]);
      }
    }
  }, [selectedDoctorId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: 'patient',
      content: messageInput,
      timestamp: formatDate(new Date()) + 'T' + formatTime(new Date()),
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');

    setTimeout(() => {
      const doctorReply = {
        id: `msg-${Date.now() + 1}`,
        sender: 'doctor',
        content: '收到您的消息了，请稍等，我正在为您分析病情...',
        timestamp: formatDate(new Date()) + 'T' + formatTime(new Date()),
      };
      setMessages(prev => [...prev, doctorReply]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const activeConsultations = consultations.filter(c => c.status === 'active');
  const inactiveConsultations = consultations.filter(c => c.status === 'inactive');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">在线问诊</h1>
          <p className="text-text-secondary mt-1">视频或文字在线咨询功能</p>
        </div>
      </div>

      {isVideoCallActive ? (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gray-900 min-h-[500px] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">视频通话中...</p>
                  <p className="text-gray-500 text-sm mt-2">模拟视频通话界面</p>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <Avatar
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
                    alt="用户"
                    size="md"
                  />
                  <p className="text-gray-400 text-xs mt-2">您</p>
                </div>
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <Button variant="secondary" size="lg" className="rounded-full w-14 h-14 p-0">
                  <Video className="w-6 h-6" />
                </Button>
                <Button variant="secondary" size="lg" className="rounded-full w-14 h-14 p-0">
                  <Phone className="w-6 h-6" />
                </Button>
                <Button
                  variant="danger"
                  size="lg"
                  className="rounded-full w-14 h-14 p-0"
                  onClick={() => setIsVideoCallActive(false)}
                >
                  <Phone className="w-6 h-6 rotate-135" />
                </Button>
              </div>

              <div className="absolute top-4 left-4">
                <div className="flex items-center gap-2 bg-black/50 backdrop-blur rounded-lg px-3 py-2">
                  <Avatar
                    src={selectedConsultation?.doctorAvatar}
                    alt={selectedConsultation?.doctorName}
                    size="sm"
                  />
                  <div>
                    <p className="text-white text-sm font-medium">{selectedConsultation?.doctorName}</p>
                    <p className="text-gray-400 text-xs">正在通话中</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">问诊列表</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="active" className="flex-1">
                    进行中 ({activeConsultations.length})
                  </TabsTrigger>
                  <TabsTrigger value="inactive" className="flex-1">
                    已结束 ({inactiveConsultations.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="mt-0">
                  <div className="divide-y divide-border">
                    {activeConsultations.map((consultation) => (
                      <div
                        key={consultation.id}
                        onClick={() => {
                          setSelectedConsultation(consultation);
                          setConsultationType(consultation.type);
                        }}
                        className={cn(
                          'p-4 cursor-pointer transition-colors hover:bg-background',
                          selectedConsultation?.id === consultation.id && 'bg-primary/5'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar
                              src={consultation.doctorAvatar}
                              alt={consultation.doctorName}
                              size="lg"
                            />
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-text truncate">{consultation.doctorName}</h4>
                              <span className="text-xs text-text-secondary">
                                {formatTime(consultation.startTime)}
                              </span>
                            </div>
                            <p className="text-sm text-text-secondary truncate mb-1">
                              {consultation.type === 'video' ? '视频问诊' : '图文问诊'}
                            </p>
                            {consultation.messages.length > 0 && (
                              <p className="text-sm text-text-secondary truncate">
                                {consultation.messages[consultation.messages.length - 1].content}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {activeConsultations.length === 0 && (
                      <div className="text-center py-8">
                        <MessageCircle className="w-12 h-12 text-text-secondary mx-auto mb-3" />
                        <p className="text-text-secondary">暂无进行中的问诊</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="inactive" className="mt-0">
                  <div className="divide-y divide-border">
                    {inactiveConsultations.map((consultation) => (
                      <div
                        key={consultation.id}
                        onClick={() => setSelectedConsultation(consultation)}
                        className={cn(
                          'p-4 cursor-pointer transition-colors hover:bg-background',
                          selectedConsultation?.id === consultation.id && 'bg-primary/5'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={consultation.doctorAvatar}
                            alt={consultation.doctorName}
                            size="lg"
                            className="opacity-60"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-text truncate">{consultation.doctorName}</h4>
                              <span className="text-xs text-text-secondary">
                                {formatDate(consultation.startTime)}
                              </span>
                            </div>
                            <p className="text-sm text-text-secondary truncate">
                              {consultation.type === 'video' ? '视频问诊' : '图文问诊'} · 已结束
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {inactiveConsultations.length === 0 && (
                      <div className="text-center py-8">
                        <MessageCircle className="w-12 h-12 text-text-secondary mx-auto mb-3" />
                        <p className="text-text-secondary">暂无历史问诊记录</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 flex flex-col overflow-hidden">
            {selectedConsultation ? (
              <>
                <CardHeader className="border-b border-border py-4 px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar
                          src={selectedConsultation.doctorAvatar}
                          alt={selectedConsultation.doctorName}
                          size="lg"
                        />
                        {selectedConsultation.status === 'active' && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-text">{selectedConsultation.doctorName}</h4>
                          <Badge variant="primary" size="sm">
                            {selectedConsultation.type === 'video' ? '视频问诊' : '图文问诊'}
                          </Badge>
                        </div>
                        <p className="text-sm text-text-secondary">
                          {selectedConsultation.status === 'active' ? '在线' : '离线'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedConsultation.status === 'active' && (
                        <>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setIsVideoCallActive(true)}
                            className="rounded-full w-10 h-10 p-0"
                          >
                            <Video className="w-5 h-5" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="rounded-full w-10 h-10 p-0"
                          >
                            <Phone className="w-5 h-5" />
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full w-10 h-10 p-0"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-6" style={{ minHeight: '400px' }}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          'flex',
                          message.sender === 'patient' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        {message.sender !== 'patient' && (
                          <Avatar
                            src={selectedConsultation.doctorAvatar}
                            alt={selectedConsultation.doctorName}
                            size="sm"
                            className="mr-2 mt-1"
                          />
                        )}
                        <div
                          className={cn(
                            'max-w-[70%] rounded-2xl px-4 py-2',
                            message.sender === 'patient'
                              ? 'bg-primary text-white rounded-tr-sm'
                              : 'bg-background border border-border-light text-text rounded-tl-sm',
                            message.sender === 'system' && 'bg-accent/10 text-text border border-accent/20'
                          )}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-xs opacity-70">
                              {formatTime(message.timestamp)}
                            </span>
                            {message.sender === 'patient' && (
                              <CheckCheck className="w-3 h-3 opacity-70" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {selectedConsultation.prescription && (
                    <div className="mt-6 p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                      <h5 className="font-medium text-text mb-3 flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-secondary" />
                        医生处方
                      </h5>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-text mb-2">开具药品：</p>
                          <div className="space-y-2">
                            {selectedConsultation.prescription.medicines.map((med, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg">
                                <div>
                                  <p className="text-sm font-medium text-text">{med.name}</p>
                                  <p className="text-xs text-text-secondary">{med.dosage}</p>
                                </div>
                                <Badge variant="secondary" size="sm">{med.duration}</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                        {selectedConsultation.prescription.advice && (
                          <div>
                            <p className="text-sm font-medium text-text mb-1">医生建议：</p>
                            <p className="text-sm text-text-secondary">{selectedConsultation.prescription.advice}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>

                {selectedConsultation.status === 'active' && (
                  <div className="border-t border-border p-4">
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
                        <Paperclip className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
                        <Smile className="w-5 h-5" />
                      </Button>
                      <div className="flex-1">
                        <Input
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="输入消息..."
                          className="rounded-full"
                        />
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim()}
                        className="rounded-full w-10 h-10 p-0"
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-text mb-2">选择或开始新的问诊</h3>
                  <p className="text-text-secondary">
                    请从左侧选择一个问诊，或预约医生开始新的问诊
                  </p>
                  <Button variant="primary" className="mt-4" to="/appointment">预约医生</Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};
