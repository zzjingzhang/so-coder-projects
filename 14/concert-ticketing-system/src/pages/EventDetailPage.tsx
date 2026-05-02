import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Badge } from 'primereact/badge'
import { TabView, TabPanel } from 'primereact/tabview'
import { mockEvents, PriceRange } from '../data/mockData'

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [event, setEvent] = useState<typeof mockEvents[0] | null>(null)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const foundEvent = mockEvents.find(e => e.id === id)
    if (foundEvent) {
      setEvent(foundEvent)
    }
  }, [id])

  // 格式化日期
  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    const weekDay = weekDays[date.getDay()]
    return `${year}年${month}月${day}日 ${weekDay}`
  }

  // 格式化价格
  const formatPrice = (price: number): string => {
    return `¥${price.toLocaleString('zh-CN')}`
  }

  // 计算总票价区间
  const getPriceRange = (priceRanges: PriceRange[]): string => {
    if (priceRanges.length === 0) return ''
    const minPrice = Math.min(...priceRanges.map(p => p.price))
    const maxPrice = Math.max(...priceRanges.map(p => p.price))
    if (minPrice === maxPrice) {
      return formatPrice(minPrice)
    }
    return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <i className="pi pi-exclamation-circle text-5xl text-text-muted mb-4"></i>
          <h2 className="text-xl font-semibold text-text-primary mb-2">演出不存在</h2>
          <p className="text-text-secondary mb-4">您访问的演出页面不存在</p>
          <Button 
            label="返回首页" 
            severity="primary"
            icon="pi pi-home"
            onClick={() => navigate('/')}
          ></Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-text-primary to-gray-800 text-white">
        <div className="absolute inset-0 opacity-30">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Badge 
                value="热卖中" 
                severity="danger" 
                className="mb-4"
              />
              <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                {event.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-6">
                {event.artist}
              </p>
              
              <div className="flex flex-wrap gap-6 text-lg">
                <div className="flex items-center">
                  <i className="pi pi-calendar text-2xl mr-3 text-primary"></i>
                  <div>
                    <p className="text-sm text-white/70">日期</p>
                    <p className="font-medium">{formatDate(new Date(event.date))}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <i className="pi pi-clock text-2xl mr-3 text-primary"></i>
                  <div>
                    <p className="text-sm text-white/70">时间</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <i className="pi pi-map-marker text-2xl mr-3 text-primary"></i>
                  <div>
                    <p className="text-sm text-white/70">场馆</p>
                    <p className="font-medium">{event.venue}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <Card className="bg-surface/95 backdrop-blur-sm border-0 shadow-xl">
                <div className="text-center">
                  <p className="text-text-muted text-sm mb-1">票价区间</p>
                  <p className="text-3xl font-bold text-primary mb-4">
                    {getPriceRange(event.priceRanges)}
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Badge 
                      value={`剩余 ${event.availableSeats} 张`} 
                      severity="success" 
                    />
                  </div>

                  <div className="space-y-3">
                    <Button 
                      label="立即选座购票" 
                      severity="primary"
                      size="large"
                      icon="pi pi-ticket"
                      className="w-full"
                      onClick={() => navigate(`/booking/${event.id}`)}
                    ></Button>
                    
                    <Button 
                      label="添加到收藏" 
                      className="p-button-outlined w-full"
                      severity="secondary"
                      icon="pi pi-heart"
                    ></Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0">
              <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
                <TabPanel header="演出介绍">
                  <div className="animate-fade-in">
                    <h3 className="text-xl font-semibold text-text-primary mb-4">
                      关于这场演出
                    </h3>
                    <p className="text-text-secondary mb-6 leading-relaxed">
                      {event.description}
                    </p>
                    
                    <h3 className="text-xl font-semibold text-text-primary mb-4">
                      艺术家介绍
                    </h3>
                    <p className="text-text-secondary mb-6 leading-relaxed">
                      {event.artist} 是华语乐坛最具影响力的歌手之一，拥有众多经典作品和庞大的粉丝群体。
                      他们的音乐风格多样，从抒情慢歌到动感快歌，都能完美驾驭。这场演唱会将带来他们
                      出道以来的经典曲目，以及最新专辑中的热门歌曲，为观众呈现一场视听盛宴。
                    </p>

                    <h3 className="text-xl font-semibold text-text-primary mb-4">
                      温馨提示
                    </h3>
                    <ul className="space-y-2 text-text-secondary">
                      <li className="flex items-start">
                        <i className="pi pi-info-circle text-primary mr-2 mt-1"></i>
                        <span>请提前30分钟到达场馆，配合安检工作。</span>
                      </li>
                      <li className="flex items-start">
                        <i className="pi pi-info-circle text-primary mr-2 mt-1"></i>
                        <span>禁止携带专业相机、录像机、自拍杆等设备入场。</span>
                      </li>
                      <li className="flex items-start">
                        <i className="pi pi-info-circle text-primary mr-2 mt-1"></i>
                        <span>场馆内禁止吸烟，禁止携带食品和饮料。</span>
                      </li>
                      <li className="flex items-start">
                        <i className="pi pi-info-circle text-primary mr-2 mt-1"></i>
                        <span>一人一票，儿童需持票入场。</span>
                      </li>
                    </ul>
                  </div>
                </TabPanel>
                
                <TabPanel header="票价详情">
                  <div className="animate-fade-in">
                    <h3 className="text-xl font-semibold text-text-primary mb-4">
                      票价区域说明
                    </h3>
                    <div className="space-y-4">
                      {event.priceRanges.map((priceRange, index) => (
                        <div 
                          key={priceRange.id}
                          className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:shadow-md transition-shadow animate-fade-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="flex items-center">
                            <div 
                              className="w-4 h-4 rounded-full mr-4" 
                              style={{ backgroundColor: priceRange.color }}
                            ></div>
                            <div>
                              <h4 className="font-semibold text-text-primary">
                                {priceRange.name}
                              </h4>
                              <p className="text-sm text-text-muted">
                                剩余 {priceRange.available} / {priceRange.count} 张
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-primary">
                              {formatPrice(priceRange.price)}
                            </p>
                            <p className="text-xs text-text-muted">/ 每张</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabPanel>
                
                <TabPanel header="场馆信息">
                  <div className="animate-fade-in">
                    <h3 className="text-xl font-semibold text-text-primary mb-4">
                      {event.venue}
                    </h3>
                    <p className="text-text-secondary mb-6">
                      <i className="pi pi-map-marker mr-2"></i>
                      {event.address}
                    </p>
                    
                    <div className="bg-background rounded-lg p-6 mb-6">
                      <h4 className="font-semibold text-text-primary mb-3">交通指南</h4>
                      <ul className="space-y-3 text-text-secondary">
                        <li className="flex items-start">
                          <i className="pi pi-bus text-primary mr-2 mt-1"></i>
                          <div>
                            <p className="font-medium">公交车</p>
                            <p className="text-sm">可乘坐 110、120、403 路公交车至工人体育场站下车</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <i className="pi pi-compass text-primary mr-2 mt-1"></i>
                          <div>
                            <p className="font-medium">地铁</p>
                            <p className="text-sm">地铁 2 号线/6 号线 朝阳门站 出 B 口，步行约 10 分钟</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <i className="pi pi-car text-primary mr-2 mt-1"></i>
                          <div>
                            <p className="font-medium">自驾</p>
                            <p className="text-sm">场馆周边有停车场，但建议提前到达，停车位有限</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-background rounded-lg p-6">
                      <h4 className="font-semibold text-text-primary mb-3">周边设施</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <i className="pi pi-utensils text-2xl text-primary mb-2"></i>
                          <p className="text-sm text-text-secondary">餐厅</p>
                        </div>
                        <div className="text-center">
                          <i className="pi pi-shopping-bag text-2xl text-primary mb-2"></i>
                          <p className="text-sm text-text-secondary">商场</p>
                        </div>
                        <div className="text-center">
                          <i className="pi pi-building text-2xl text-primary mb-2"></i>
                          <p className="text-sm text-text-secondary">酒店</p>
                        </div>
                        <div className="text-center">
                          <i className="pi pi-car text-2xl text-primary mb-2"></i>
                          <p className="text-sm text-text-secondary">停车场</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </TabView>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="shadow-lg border-0 sticky top-24">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  快速购票
                </h3>
                
                <div className="space-y-4">
                  {event.priceRanges.map((priceRange) => (
                    <div 
                      key={priceRange.id}
                      className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: priceRange.color }}
                          ></div>
                          <span className="font-medium text-text-primary">
                            {priceRange.name}
                          </span>
                        </div>
                        <span className="font-bold text-primary">
                          {formatPrice(priceRange.price)}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted">
                        剩余 {priceRange.available} 张
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Button 
                    label="选择座位" 
                    severity="primary"
                    icon="pi pi-map-marker"
                    className="w-full"
                    onClick={() => navigate(`/booking/${event.id}`)}
                  ></Button>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-text-muted">
                    <i className="pi pi-shield mr-1"></i>
                    安全支付保障
                  </p>
                </div>
              </Card>

              <Card className="shadow-lg border-0 mt-6">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  相关演出
                </h3>
                
                <div className="space-y-4">
                  {mockEvents.filter(e => e.id !== event.id).slice(0, 2).map((relatedEvent) => (
                    <div 
                      key={relatedEvent.id}
                      className="flex gap-3 p-3 hover:bg-background rounded-lg cursor-pointer transition-colors"
                      onClick={() => navigate(`/event/${relatedEvent.id}`)}
                    >
                      <img 
                        src={relatedEvent.image} 
                        alt={relatedEvent.title} 
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-grow min-w-0">
                        <h4 className="font-medium text-text-primary text-sm line-clamp-2">
                          {relatedEvent.title}
                        </h4>
                        <p className="text-xs text-text-muted mt-1">
                          {relatedEvent.artist}
                        </p>
                        <p className="text-xs text-text-muted mt-1">
                          {formatDate(new Date(relatedEvent.date))}
                        </p>
                        <p className="text-sm font-bold text-primary mt-1">
                          {formatPrice(relatedEvent.priceRanges[0].price)} 起
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventDetailPage
