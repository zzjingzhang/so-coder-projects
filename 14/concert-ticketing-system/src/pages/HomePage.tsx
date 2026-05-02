import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Badge } from 'primereact/badge'
import { Calendar } from 'primereact/calendar'
import { mockEvents, ConcertEvent } from '../data/mockData'

const HomePage = () => {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // 获取指定日期的活动
  const getEventsForDate = (date: Date): ConcertEvent[] => {
    return mockEvents.filter(event => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      )
    })
  }

  // 获取指定月份有活动的日期
  const getEventsForMonth = (month: number, year: number): Date[] => {
    const eventDates: Date[] = []
    mockEvents.forEach(event => {
      const eventDate = new Date(event.date)
      if (eventDate.getMonth() === month && eventDate.getFullYear() === year) {
        eventDates.push(eventDate)
      }
    })
    return eventDates
  }

  // 格式化日期
  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // 格式化价格
  const formatPrice = (price: number): string => {
    return `¥${price.toLocaleString('zh-CN')}`
  }

  // 自定义日历模板 - 显示有活动的日期
  const dateTemplate = (date: any) => {
    // 确保 date 是有效的 Date 对象
    if (!(date instanceof Date)) {
      return null
    }

    const month = currentMonth.getMonth()
    const year = currentMonth.getFullYear()
    
    if (date.getMonth() !== month || date.getFullYear() !== year) {
      return null
    }

    const hasEvent = getEventsForMonth(month, year).some(eventDate => {
      return eventDate.getDate() === date.getDate()
    })

    if (hasEvent) {
      return (
        <div className="relative flex flex-col items-center justify-center h-full p-1 cursor-pointer hover:bg-primary/10 rounded-md transition-colors">
          <span>{date.getDate()}</span>
          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1"></span>
        </div>
      )
    }

    return <span>{date.getDate()}</span>
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <Badge value="热门推荐" severity="warning" className="mb-4" />
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                发现精彩演唱会
              </h1>
              <p className="text-lg md:text-xl mb-6 text-white/90">
                探索全城最热门的音乐会，在线选座，轻松购票，享受每一场精彩演出。
              </p>
              <div className="flex flex-wrap gap-3">
                <Button 
                  label="浏览演出" 
                  severity="secondary"
                  size="large"
                  icon="pi pi-search"
                  onClick={() => navigate('/')}
                ></Button>
                <Button 
                  label="热门推荐" 
                  className="p-button-outlined"
                  severity="secondary"
                  size="large"
                  icon="pi pi-fire"
                  onClick={() => navigate('/event/1')}
                ></Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=concert%20stage%20with%20dramatic%20lighting%20live%20music%20performance%20crowd%20enjoying&image_size=landscape_16_9" 
                alt="Concert" 
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Event Calendar Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              动态活动日历
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              选择日期查看当天的演出活动，点击有活动标记的日期了解详情。
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg border-0">
                <h3 className="text-xl font-semibold text-text-primary mb-4">选择日期</h3>
                <Calendar
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.value as Date)
                    if (e.value) {
                      setCurrentMonth(e.value as Date)
                    }
                  }}
                  onMonthChange={(e) => setCurrentMonth(e.date as Date)}
                  inline
                  className="w-full"
                />
              </Card>
            </div>

            {/* Events for Selected Date */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0 h-full">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  {selectedDate 
                    ? `${formatDate(selectedDate)} 的演出` 
                    : '请选择日期查看演出'}
                </h3>
                
                {selectedDate ? (
                  <>
                    {getEventsForDate(selectedDate).length > 0 ? (
                      <div className="space-y-4">
                        {getEventsForDate(selectedDate).map((event, index) => (
                          <div 
                            key={event.id}
                            className="flex flex-col md:flex-row gap-4 p-4 bg-surface rounded-lg border border-border hover:shadow-md transition-shadow animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <div className="md:w-48 flex-shrink-0">
                              <img 
                                src={event.image} 
                                alt={event.title} 
                                className="w-full h-32 md:h-full object-cover rounded-lg"
                              />
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="text-lg font-semibold text-text-primary">
                                  {event.title}
                                </h4>
                                <Badge 
                                  value={`${event.availableSeats} 张`} 
                                  severity="success" 
                                />
                              </div>
                              <p className="text-text-secondary mb-2">
                                <i className="pi pi-user mr-2"></i>
                                {event.artist}
                              </p>
                              <p className="text-text-secondary mb-2">
                                <i className="pi pi-map-marker mr-2"></i>
                                {event.venue}
                              </p>
                              <p className="text-text-secondary mb-4">
                                <i className="pi pi-clock mr-2"></i>
                                {event.time}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xl font-bold text-primary">
                                  {formatPrice(event.priceRanges[0].price)} 起
                                </span>
                                <Button 
                                  label="立即购票" 
                                  severity="primary"
                                  size="small"
                                  icon="pi pi-ticket"
                                  onClick={() => navigate(`/event/${event.id}`)}
                                ></Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <i className="pi pi-calendar-times text-5xl text-text-muted mb-4"></i>
                        <p className="text-text-secondary">
                          该日期暂无演出安排，请选择其他日期。
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <i className="pi pi-calendar text-5xl text-text-muted mb-4"></i>
                    <p className="text-text-secondary">
                      请在左侧日历中选择日期查看当天的演出活动。
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              即将上演
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              查看近期热门演出，提前规划您的音乐之旅。
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockEvents.map((event, index) => (
              <div 
                key={event.id}
                className="bg-surface rounded-xl shadow-md border border-border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-5">
                  <div className="relative mb-4">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Badge 
                      value="热卖" 
                      severity="danger" 
                      className="absolute top-2 right-2"
                    />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-text-primary mb-3 line-clamp-2 min-h-[3.5rem]">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-text-secondary text-sm flex items-center">
                      <i className="pi pi-user mr-2 text-primary"></i>
                      {event.artist}
                    </p>
                    
                    <p className="text-text-secondary text-sm flex items-center">
                      <i className="pi pi-map-marker mr-2 text-primary"></i>
                      {event.venue}
                    </p>
                    
                    <p className="text-text-secondary text-sm flex items-center">
                      <i className="pi pi-calendar mr-2 text-primary"></i>
                      {formatDate(new Date(event.date))} {event.time}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-xl font-bold text-primary">
                        {formatPrice(event.priceRanges[0].price)}
                      </span>
                      <span className="text-sm text-text-muted font-normal ml-1"> 起</span>
                    </div>
                    <button 
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200"
                      onClick={() => navigate(`/event/${event.id}`)}
                      title="查看详情"
                    >
                      <i className="pi pi-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              为什么选择我们
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              我们提供最优质的票务服务，让您的每一次观演体验都完美无缺。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-surface rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="pi pi-check-circle text-3xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                正品保障
              </h3>
              <p className="text-text-secondary">
                所有票品均为官方授权，100% 正品保障，让您放心购票。
              </p>
            </div>

            <div className="text-center p-6 bg-surface rounded-lg shadow-md">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="pi pi-map-marker text-3xl text-secondary"></i>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                在线选座
              </h3>
              <p className="text-text-secondary">
                动态座位图，实时查看座位状态，自由选择心仪座位。
              </p>
            </div>

            <div className="text-center p-6 bg-surface rounded-lg shadow-md">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="pi pi-shield text-3xl text-accent"></i>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                安全支付
              </h3>
              <p className="text-text-secondary">
                多种支付方式，银行级加密保护，交易安全有保障。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
