import { useState } from 'react';
import {
  AlertTriangle,
  Phone,
  MapPin,
  Star,
  Clock,
  Search,
  Filter,
  ChevronDown,
  Plus,
  X,
  Check,
  Activity,
  Heart,
  User,
  Calendar,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from '@/components/ui/Modal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Avatar } from '@/components/ui/Avatar';
import { hospitals, emergencyContacts, healthRecords } from '@/data/mockData';
import { cn, formatDate, calculateAge } from '@/utils';

const patientInfo = healthRecords[0];
const patientAge = patientInfo ? calculateAge(patientInfo.basicInfo.birthDate) : 0;

export const EmergencyPage = () => {
  const [activeTab, setActiveTab] = useState('hospitals');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isHospitalModalOpen, setIsHospitalModalOpen] = useState(false);
  const [isEmergencyCallActive, setIsEmergencyCallActive] = useState(false);
  const [showEmergencyConfirm, setShowEmergencyConfirm] = useState(false);

  const filteredHospitals = hospitals.filter((hospital) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      hospital.name.toLowerCase().includes(query) ||
      hospital.address.toLowerCase().includes(query) ||
      hospital.departments.some(dept => dept.toLowerCase().includes(query))
    );
  });

  const handleViewHospital = (hospital) => {
    setSelectedHospital(hospital);
    setIsHospitalModalOpen(true);
  };

  const handleEmergencyCall = () => {
    setShowEmergencyConfirm(true);
  };

  const confirmEmergencyCall = () => {
    setShowEmergencyConfirm(false);
    setIsEmergencyCallActive(true);
  };

  const handleCallContact = (contact) => {
    console.log('拨打电话:', contact.phone);
    alert(`正在拨打 ${contact.name} 的电话: ${contact.phone}`);
  };

  const handleNavigateToHospital = (hospital) => {
    console.log('导航到医院:', hospital.name);
    alert(`正在导航到 ${hospital.name}`);
  };

  const sortedHospitals = [...filteredHospitals].sort((a, b) => a.distance - b.distance);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">紧急求助</h1>
          <p className="text-text-secondary mt-1">紧急医疗求助和就近医院推荐</p>
        </div>
        <Button
          variant="danger"
          size="lg"
          className="animate-pulse"
          onClick={handleEmergencyCall}
        >
          <Phone className="w-5 h-5 mr-2" /> 紧急呼叫
        </Button>
      </div>

      <Card className="bg-danger/5 border-danger/20">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-danger/10 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-8 h-8 text-danger" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text mb-2">紧急情况？</h3>
                <p className="text-text-secondary mb-1">
                  如果您遇到紧急医疗情况，请立即拨打 <span className="font-semibold text-danger">120</span> 急救电话。
                </p>
                <p className="text-sm text-text-secondary">
                  本页面提供的信息仅供参考，不能替代专业医疗服务。
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="danger"
                onClick={() => {
                  console.log('拨打120');
                  alert('正在拨打 120 急救电话...');
                }}
              >
                <Phone className="w-4 h-4 mr-2" /> 拨打 120
              </Button>
              <Button
                variant="secondary"
                onClick={() => setActiveTab('contacts')}
              >
                <User className="w-4 h-4 mr-2" /> 紧急联系人
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-lg font-semibold">个人健康信息（供紧急情况使用）</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-background rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-primary" />
                <span className="text-sm text-text-secondary">基本信息</span>
              </div>
              <p className="font-medium text-text">{patientInfo?.patientName}</p>
              <p className="text-sm text-text-secondary">
                {patientInfo?.basicInfo.gender} · {patientAge}岁
              </p>
              <p className="text-sm text-text-secondary">
                血型：{patientInfo?.basicInfo.bloodType} {patientInfo?.basicInfo.bloodTypeRh}
              </p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-danger" />
                <span className="text-sm text-text-secondary">过敏史</span>
              </div>
              {patientInfo?.allergies.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {patientInfo.allergies.map((allergy, index) => (
                    <Badge key={index} variant="danger" size="sm">{allergy}</Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-secondary">无</p>
              )}
            </div>
            <div className="p-4 bg-background rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-warning" />
                <span className="text-sm text-text-secondary">慢性病史</span>
              </div>
              {patientInfo?.chronicDiseases.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {patientInfo.chronicDiseases.map((disease, index) => (
                    <Badge key={index} variant="warning" size="sm">{disease}</Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-secondary">无</p>
              )}
            </div>
            <div className="p-4 bg-background rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-primary" />
                <span className="text-sm text-text-secondary">紧急联系人</span>
              </div>
              {emergencyContacts.filter(c => c.type === 'family').slice(0, 1).map((contact) => (
                <div key={contact.id}>
                  <p className="font-medium text-text">{contact.name}</p>
                  <p className="text-sm text-text-secondary">{contact.description}</p>
                  <Button
                    variant="primary"
                    size="sm"
                    className="mt-2"
                    onClick={() => handleCallContact(contact)}
                  >
                    <Phone className="w-3 h-3 mr-1" /> 拨打
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="hospitals">附近医院</TabsTrigger>
          <TabsTrigger value="contacts">紧急联系人</TabsTrigger>
        </TabsList>

        <TabsContent value="hospitals" className="mt-6 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <Input
                    placeholder="搜索医院名称、地址、科室..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="w-full lg:w-48">
                  <Select placeholder="排序方式" defaultValue="distance">
                    <option value="distance">距离最近</option>
                    <option value="rating">评分最高</option>
                    <option value="level">等级优先</option>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedHospitals.map((hospital) => (
              <Card
                key={hospital.id}
                className="overflow-hidden card-hover"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400&h=300';
                      }}
                    />
                    {hospital.hasEmergency && (
                      <Badge
                        variant="danger"
                        className="absolute top-3 right-3"
                      >
                        <Activity className="w-3 h-3 mr-1" /> 有急诊
                      </Badge>
                    )}
                    {hospital.has24Hour && (
                      <Badge
                        variant="primary"
                        className="absolute top-3 left-3"
                      >
                        <Clock className="w-3 h-3 mr-1" /> 24小时
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-text">{hospital.name}</h3>
                      <Badge variant="primary" size="sm">{hospital.level}</Badge>
                    </div>
                    <p className="text-sm text-text-secondary mb-1">{hospital.type}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="w-4 h-4 text-text-secondary" />
                        <span className="text-text-secondary line-clamp-1">{hospital.address}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-4 h-4 text-text-secondary" />
                        <span className="text-text-secondary">{hospital.phone}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-accent fill-accent" />
                          <span className="text-text font-medium">{hospital.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-text-secondary" />
                          <span className="text-text-secondary">{hospital.distance}km</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {hospital.departments.slice(0, 4).map((dept, index) => (
                        <Badge key={index} variant="secondary" size="sm">{dept}</Badge>
                      ))}
                      {hospital.departments.length > 4 && (
                        <Badge variant="secondary" size="sm">
                          +{hospital.departments.length - 4}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleNavigateToHospital(hospital)}
                      >
                        <MapPin className="w-4 h-4 mr-1" /> 导航
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleViewHospital(hospital)}
                      >
                        <Activity className="w-4 h-4 mr-1" /> 详情
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedHospitals.length === 0 && (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <MapPin className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text mb-2">未找到符合条件的医院</h3>
                <p className="text-text-secondary">请尝试调整搜索条件</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="contacts" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyContacts.map((contact) => (
              <Card key={contact.id} className="card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center',
                        contact.type === 'emergency' && 'bg-danger/10',
                        contact.type === 'family' && 'bg-primary/10',
                        contact.type === 'personal' && 'bg-secondary/10'
                      )}>
                        <Phone className={cn(
                          'w-6 h-6',
                          contact.type === 'emergency' && 'text-danger',
                          contact.type === 'family' && 'text-primary',
                          contact.type === 'personal' && 'text-secondary'
                        )} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text">{contact.name}</h3>
                        <p className="text-sm text-text-secondary">{contact.description}</p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        contact.type === 'emergency' ? 'danger' :
                        contact.type === 'family' ? 'primary' : 'secondary'
                      }
                      size="sm"
                    >
                      {contact.type === 'emergency' ? '紧急' :
                       contact.type === 'family' ? '家人' : '个人'}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Phone className="w-4 h-4 text-text-secondary" />
                    <span className="text-lg font-semibold text-text">{contact.phone}</span>
                  </div>

                  <Button
                    variant={contact.type === 'emergency' ? 'danger' : 'primary'}
                    className="w-full"
                    onClick={() => handleCallContact(contact)}
                  >
                    <Phone className="w-4 h-4 mr-2" /> 拨打电话
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Card className="border-dashed">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mb-4">
                    <Plus className="w-6 h-6 text-text-secondary" />
                  </div>
                  <h3 className="font-medium text-text mb-1">添加紧急联系人</h3>
                  <p className="text-sm text-text-secondary mb-4">添加家人或朋友作为紧急联系人</p>
                  <Button variant="secondary">
                    <Plus className="w-4 h-4 mr-2" /> 添加联系人
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Modal
        isOpen={showEmergencyConfirm}
        onClose={() => setShowEmergencyConfirm(false)}
        size="md"
      >
        <ModalHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-danger/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-danger" />
            </div>
            <div>
              <ModalTitle>确认紧急呼叫</ModalTitle>
              <p className="text-sm text-text-secondary">即将拨打 120 急救电话</p>
            </div>
          </div>
        </ModalHeader>
        <ModalContent>
          <div className="space-y-4">
            <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
              <p className="text-text font-medium mb-2">
                请确认您确实遇到了紧急医疗情况：
              </p>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• 严重胸痛或呼吸困难</li>
                <li>• 严重出血或受伤</li>
                <li>• 意识丧失或突然晕倒</li>
                <li>• 严重过敏反应</li>
                <li>• 中风或癫痫发作</li>
              </ul>
            </div>
            <p className="text-sm text-text-secondary">
              如果您不确定是否需要紧急医疗服务，请先咨询医生或拨打当地医疗咨询电话。
            </p>
          </div>
        </ModalContent>
        <ModalFooter className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setShowEmergencyConfirm(false)}>
            取消
          </Button>
          <Button variant="danger" onClick={confirmEmergencyCall}>
            <Phone className="w-4 h-4 mr-2" /> 确认拨打 120
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={isEmergencyCallActive}
        onClose={() => setIsEmergencyCallActive(false)}
        size="md"
      >
        <ModalContent className="text-center py-8">
          <div className="w-20 h-20 bg-danger/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Phone className="w-10 h-10 text-danger" />
          </div>
          <h3 className="text-xl font-semibold text-text mb-2">正在拨打 120...</h3>
          <p className="text-text-secondary mb-4">请保持冷静，等待急救人员接听</p>
          <div className="space-y-2 text-sm text-text-secondary">
            <p>• 请告知您的详细位置</p>
            <p>• 请描述患者的症状</p>
            <p>• 请保持电话畅通</p>
          </div>
          <Button
            variant="secondary"
            className="mt-6"
            onClick={() => setIsEmergencyCallActive(false)}
          >
            结束呼叫
          </Button>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isHospitalModalOpen}
        onClose={() => setIsHospitalModalOpen(false)}
        size="lg"
      >
        {selectedHospital && (
          <>
            <ModalHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ModalTitle>{selectedHospital.name}</ModalTitle>
                    <Badge variant="primary">{selectedHospital.level}</Badge>
                  </div>
                  <p className="text-sm text-text-secondary">{selectedHospital.type}</p>
                </div>
                <div className="flex gap-2">
                  {selectedHospital.hasEmergency && (
                    <Badge variant="danger">
                      <Activity className="w-3 h-3 mr-1" /> 有急诊
                    </Badge>
                  )}
                  {selectedHospital.has24Hour && (
                    <Badge variant="primary">
                      <Clock className="w-3 h-3 mr-1" /> 24小时
                    </Badge>
                  )}
                </div>
              </div>
            </ModalHeader>
            <ModalContent className="space-y-6">
              <img
                src={selectedHospital.image}
                alt={selectedHospital.name}
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800&h=400';
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-background rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-medium text-text">地址</span>
                  </div>
                  <p className="text-text-secondary">{selectedHospital.address}</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="font-medium text-text">联系电话</span>
                  </div>
                  <p className="text-text-secondary">{selectedHospital.phone}</p>
                  {selectedHospital.emergencyPhone && (
                    <p className="text-danger font-medium mt-1">
                      急诊电话：{selectedHospital.emergencyPhone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-background rounded-lg text-center">
                  <Star className="w-6 h-6 text-accent fill-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold text-text">{selectedHospital.rating}</p>
                  <p className="text-sm text-text-secondary">评分</p>
                </div>
                <div className="p-4 bg-background rounded-lg text-center">
                  <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-text">{selectedHospital.distance}km</p>
                  <p className="text-sm text-text-secondary">距离</p>
                </div>
                <div className="p-4 bg-background rounded-lg text-center">
                  <Activity className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-text">{selectedHospital.departments.length}</p>
                  <p className="text-sm text-text-secondary">科室数量</p>
                </div>
              </div>

              <div className="p-4 bg-background rounded-lg">
                <h4 className="font-medium text-text mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  开设科室
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedHospital.departments.map((dept, index) => (
                    <Badge key={index} variant="secondary" size="sm">{dept}</Badge>
                  ))}
                </div>
              </div>
            </ModalContent>
            <ModalFooter className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setIsHospitalModalOpen(false)}>
                关闭
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  handleCallContact({ name: selectedHospital.name, phone: selectedHospital.phone });
                }}
              >
                <Phone className="w-4 h-4 mr-2" /> 拨打电话
              </Button>
              <Button
                variant="primary"
                onClick={() => handleNavigateToHospital(selectedHospital)}
              >
                <MapPin className="w-4 h-4 mr-2" /> 导航前往
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </div>
  );
};
