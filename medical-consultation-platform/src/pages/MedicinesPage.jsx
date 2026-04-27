import { useState } from 'react';
import {
  Pill,
  Search,
  Filter,
  ChevronDown,
  Plus,
  Eye,
  ShoppingCart,
  Star,
  Package,
  AlertTriangle,
  X,
  Info,
  CheckCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from '@/components/ui/Modal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Avatar } from '@/components/ui/Avatar';
import { medicines } from '@/data/mockData';
import { cn, formatCurrency } from '@/utils';

const categories = [
  { value: '', label: '全部类别' },
  { value: '抗生素', label: '抗生素' },
  { value: '解热镇痛药', label: '解热镇痛药' },
  { value: '中成药', label: '中成药' },
  { value: '消化系统用药', label: '消化系统用药' },
  { value: '心血管系统用药', label: '心血管系统用药' },
];

export const MedicinesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isPrescriptionOnly, setIsPrescriptionOnly] = useState(false);
  const [cart, setCart] = useState([]);

  const filteredMedicines = medicines.filter((medicine) => {
    let matches = true;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      matches = matches && (
        medicine.name.toLowerCase().includes(query) ||
        medicine.genericName.toLowerCase().includes(query) ||
        medicine.category.toLowerCase().includes(query) ||
        medicine.manufacturer.toLowerCase().includes(query) ||
        medicine.indications.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategory) {
      matches = matches && medicine.category === selectedCategory;
    }
    
    if (isPrescriptionOnly) {
      matches = matches && medicine.isPrescription;
    }
    
    return matches;
  });

  const handleViewMedicine = (medicine) => {
    setSelectedMedicine(medicine);
    setIsDetailModalOpen(true);
  };

  const handleAddToCart = (medicine) => {
    const existingItem = cart.find(item => item.id === medicine.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === medicine.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">药品信息</h1>
          <p className="text-text-secondary mt-1">药品查询和用药指导服务</p>
        </div>
        <Button variant="primary" asChild>
          <a href="#">
            <ShoppingCart className="w-4 h-4 mr-2" /> 我的药箱
            {totalCartItems > 0 && (
              <Badge variant="danger" size="sm" className="ml-2">{totalCartItems}</Badge>
            )}
          </a>
        </Button>
      </div>

      {totalCartItems > 0 && (
        <Card className="bg-success/5 border-success/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-success" />
                <div>
                  <p className="font-medium text-text">
                    购物车中有 {totalCartItems} 件商品
                  </p>
                  <p className="text-sm text-text-secondary">
                    总计：<span className="font-semibold text-success">{formatCurrency(totalCartPrice)}</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  查看详情
                </Button>
                <Button variant="primary" size="sm">
                  去结算
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <Input
                placeholder="搜索药品名称、通用名、类别、生产厂家、适应症..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="w-full lg:w-64">
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                placeholder="选择药品类别"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="prescription-only"
                checked={isPrescriptionOnly}
                onChange={(e) => setIsPrescriptionOnly(e.target.checked)}
                className="w-4 h-4 text-primary rounded border-border focus:ring-primary"
              />
              <label htmlFor="prescription-only" className="text-sm text-text">
                仅显示处方药
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMedicines.map((medicine) => (
          <Card key={medicine.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex gap-4 mb-4">
                  <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="w-24 h-24 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200&h=200';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-text truncate">{medicine.name}</h3>
                      {medicine.isPrescription && (
                        <Badge variant="danger" size="sm">Rx</Badge>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary mb-1">{medicine.genericName}</p>
                    <Badge variant="primary" size="sm">{medicine.category}</Badge>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Package className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-secondary">规格：</span>
                    <span className="text-text">{medicine.specification}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Info className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-secondary">生产厂家：</span>
                    <span className="text-text">{medicine.manufacturer}</span>
                  </div>
                  <div className="flex items-start gap-1 text-sm">
                    <AlertTriangle className="w-4 h-4 text-text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary flex-shrink-0">适应症：</span>
                    <span className="text-text line-clamp-2">{medicine.indications}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border-light">
                  <div>
                    <span className="text-2xl font-bold text-primary">{formatCurrency(medicine.price)}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleViewMedicine(medicine)}
                    >
                      <Eye className="w-4 h-4 mr-1" /> 详情
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAddToCart(medicine)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" /> 加入
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMedicines.length === 0 && (
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <Pill className="w-12 h-12 text-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text mb-2">未找到符合条件的药品</h3>
            <p className="text-text-secondary">请尝试调整搜索条件或筛选条件</p>
          </CardContent>
        </Card>
      )}

      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        size="lg"
      >
        {selectedMedicine && (
          <>
            <ModalHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ModalTitle>{selectedMedicine.name}</ModalTitle>
                    {selectedMedicine.isPrescription && (
                      <Badge variant="danger">处方药</Badge>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary">{selectedMedicine.genericName}</p>
                </div>
                <Badge variant="primary">{selectedMedicine.category}</Badge>
              </div>
            </ModalHeader>
            <ModalContent className="space-y-6">
              <div className="flex gap-6">
                <img
                  src={selectedMedicine.image}
                  alt={selectedMedicine.name}
                  className="w-32 h-32 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200&h=200';
                  }}
                />
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-secondary">规格</p>
                      <p className="font-medium text-text">{selectedMedicine.specification}</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">生产厂家</p>
                      <p className="font-medium text-text">{selectedMedicine.manufacturer}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-text-secondary">价格</p>
                      <p className="text-2xl font-bold text-primary">{formatCurrency(selectedMedicine.price)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="primary" onClick={() => handleAddToCart(selectedMedicine)}>
                      <ShoppingCart className="w-4 h-4 mr-2" /> 加入药箱
                    </Button>
                    <Button variant="secondary">
                      咨询药师
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-background rounded-lg">
                  <h4 className="font-medium text-text mb-2 flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    适应症
                  </h4>
                  <p className="text-text-secondary">{selectedMedicine.indications}</p>
                </div>

                <div className="p-4 bg-background rounded-lg">
                  <h4 className="font-medium text-text mb-2 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    用法用量
                  </h4>
                  <p className="text-text-secondary">
                    <span className="font-medium text-text">用法：</span>{selectedMedicine.usage}
                  </p>
                  <p className="text-text-secondary mt-1">
                    <span className="font-medium text-text">用量：</span>{selectedMedicine.dosage}
                  </p>
                </div>

                <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
                  <h4 className="font-medium text-warning mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    禁忌症
                  </h4>
                  <p className="text-text-secondary">{selectedMedicine.contraindications}</p>
                </div>

                <div className="p-4 bg-background rounded-lg">
                  <h4 className="font-medium text-text mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-accent" />
                    不良反应
                  </h4>
                  <p className="text-text-secondary">{selectedMedicine.adverseReactions}</p>
                </div>

                <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <h4 className="font-medium text-accent mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    注意事项
                  </h4>
                  <p className="text-text-secondary">{selectedMedicine.precautions}</p>
                </div>
              </div>
            </ModalContent>
            <ModalFooter className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setIsDetailModalOpen(false)}>
                关闭
              </Button>
              <Button variant="primary" onClick={() => {
                handleAddToCart(selectedMedicine);
                setIsDetailModalOpen(false);
              }}>
                <ShoppingCart className="w-4 h-4 mr-2" /> 加入药箱
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </div>
  );
};
