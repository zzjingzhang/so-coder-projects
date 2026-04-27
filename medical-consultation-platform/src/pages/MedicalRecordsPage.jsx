import { useState } from 'react';
import {
  FileText,
  Calendar,
  User,
  Search,
  Filter,
  ChevronDown,
  Plus,
  Eye,
  Download,
  Printer,
  X,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from '@/components/ui/Modal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Avatar } from '@/components/ui/Avatar';
import { medicalRecords, doctors, departments } from '@/data/mockData';
import { cn, formatDate } from '@/utils';

export const MedicalRecordsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredRecords = medicalRecords.filter((record) => {
    let matches = true;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      matches = matches && (
        record.doctorName.toLowerCase().includes(query) ||
        record.department.toLowerCase().includes(query) ||
        record.chiefComplaint.toLowerCase().includes(query) ||
        record.diagnosis.toLowerCase().includes(query)
      );
    }
    
    if (selectedDepartment) {
      matches = matches && record.department === selectedDepartment;
    }
    
    return matches;
  });

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">病历管理</h1>
          <p className="text-text-secondary mt-1">电子病历和就诊记录管理</p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" /> 新增病历
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <Input
                placeholder="搜索医生、科室、症状、诊断..."
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
                  <option key={dept.id} value={dept.name}>{dept.name}</option>
                ))}
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text">{medicalRecords.length}</p>
                <p className="text-sm text-text-secondary">总病历数</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text">
                  {medicalRecords.filter(r => {
                    const recordDate = new Date(r.visitDate);
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                    return recordDate >= thirtyDaysAgo;
                  }).length}
                </p>
                <p className="text-sm text-text-secondary">近30天就诊</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text">
                  {new Set(medicalRecords.map(r => r.department)).size}
                </p>
                <p className="text-sm text-text-secondary">涉及科室</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text">
                  {medicalRecords.filter(r => r.medications && r.medications.length > 0).length}
                </p>
                <p className="text-sm text-text-secondary">有处方记录</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    就诊日期
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    医生
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    科室
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    主诉
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    诊断
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    就诊类型
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border-light">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-background transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-text">{formatDate(record.visitDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm text-text">{record.doctorName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="primary" size="sm">{record.department}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-text max-w-xs truncate">{record.chiefComplaint}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-text max-w-xs truncate">{record.diagnosis}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="secondary" size="sm">{record.visitType}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewRecord(record)}
                          className="text-primary"
                        >
                          <Eye className="w-4 h-4 mr-1" /> 查看
                        </Button>
                        <Button variant="ghost" size="sm" className="text-text-secondary">
                          <Download className="w-4 h-4 mr-1" /> 下载
                        </Button>
                        <Button variant="ghost" size="sm" className="text-text-secondary">
                          <Printer className="w-4 h-4 mr-1" /> 打印
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRecords.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text mb-2">未找到病历记录</h3>
              <p className="text-text-secondary">请尝试调整搜索条件或筛选条件</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        size="xl"
      >
        {selectedRecord && (
          <>
            <ModalHeader>
              <div className="flex items-center justify-between">
                <ModalTitle>病历详情</ModalTitle>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-background rounded-lg">
                  <p className="text-sm text-text-secondary mb-1">就诊日期</p>
                  <p className="font-medium text-text">{formatDate(selectedRecord.visitDate)}</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <p className="text-sm text-text-secondary mb-1">就诊类型</p>
                  <p className="font-medium text-text">{selectedRecord.visitType}</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <p className="text-sm text-text-secondary mb-1">科室</p>
                  <p className="font-medium text-text">{selectedRecord.department}</p>
                </div>
              </div>

              <div className="p-4 bg-background rounded-lg">
                <h4 className="font-medium text-text mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  医生信息
                </h4>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-text">{selectedRecord.doctorName}</p>
                    <p className="text-sm text-text-secondary">{selectedRecord.department}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-background rounded-lg">
                  <h4 className="font-medium text-text mb-2">主诉</h4>
                  <p className="text-text-secondary">{selectedRecord.chiefComplaint}</p>
                </div>

                <div className="p-4 bg-background rounded-lg">
                  <h4 className="font-medium text-text mb-2">现病史</h4>
                  <p className="text-text-secondary">{selectedRecord.presentIllness}</p>
                </div>

                <div className="p-4 bg-background rounded-lg">
                  <h4 className="font-medium text-text mb-2">既往史</h4>
                  <p className="text-text-secondary">{selectedRecord.pastHistory}</p>
                </div>

                <div className="p-4 bg-background rounded-lg">
                  <h4 className="font-medium text-text mb-2">体格检查</h4>
                  <p className="text-text-secondary">{selectedRecord.physicalExamination}</p>
                </div>

                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-medium text-primary mb-2">诊断</h4>
                  <p className="text-text font-medium">{selectedRecord.diagnosis}</p>
                </div>

                <div className="p-4 bg-background rounded-lg">
                  <h4 className="font-medium text-text mb-2">治疗方案</h4>
                  <p className="text-text-secondary">{selectedRecord.treatmentPlan}</p>
                </div>

                {selectedRecord.medications && selectedRecord.medications.length > 0 && (
                  <div className="p-4 bg-background rounded-lg">
                    <h4 className="font-medium text-text mb-3">开具药品</h4>
                    <div className="space-y-2">
                      {selectedRecord.medications.map((med, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-border-light">
                          <div>
                            <p className="font-medium text-text">{med.name}</p>
                            <p className="text-sm text-text-secondary">{med.dosage}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <h4 className="font-medium text-accent mb-2">随访要求</h4>
                  <p className="text-text">{selectedRecord.followUp}</p>
                </div>
              </div>
            </ModalContent>
            <ModalFooter className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setIsDetailModalOpen(false)}>
                关闭
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </div>
  );
};
