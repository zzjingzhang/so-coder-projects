import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Badge } from 'primereact/badge'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Divider } from 'primereact/divider'
import { mockEvents, Seat, TicketOption, PriceRange } from '../data/mockData'

// 座位图组件
interface SeatMapProps {
  seats: Seat[]
  priceRanges: PriceRange[]
  selectedSeats: Seat[]
  onSeatClick: (seat: Seat) => void
}

const SeatMap: React.FC<SeatMapProps> = ({ seats, priceRanges, selectedSeats, onSeatClick }) => {
  // 按行分组座位
  const seatsByRow = useMemo(() => {
    const grouped: Record<string, Seat[]> = {}
    seats.forEach(seat => {
      if (!grouped[seat.row]) {
        grouped[seat.row] = []
      }
      grouped[seat.row].push(seat)
    })
    // 按座位号排序
    Object.keys(grouped).forEach(row => {
      grouped[row].sort((a, b) => a.number - b.number)
    })
    return grouped
  }, [seats])

  // 获取座位颜色
  const getSeatColor = (seat: Seat): string => {
    const priceRange = priceRanges.find(p => p.id === seat.priceRangeId)
    return priceRange?.color || '#94a3b8'
  }

  // 检查座位是否被选中
  const isSeatSelected = (seat: Seat): boolean => {
    return selectedSeats.some(s => s.id === seat.id)
  }

  // 获取座位状态样式
  const getSeatStatusClass = (seat: Seat): string => {
    if (seat.status === 'sold') {
      return 'cursor-not-allowed opacity-40'
    }
    if (isSeatSelected(seat)) {
      return 'cursor-pointer animate-seat-select ring-2 ring-white'
    }
    return 'cursor-pointer hover:scale-110 transition-transform'
  }

  // 获取行数数组
  const rows = Object.keys(seatsByRow).sort()

  return (
    <div className="relative">
      {/* 舞台 */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-primary via-primary-dark to-primary rounded-t-full h-16 flex items-center justify-center shadow-lg">
          <span className="text-white font-semibold text-lg">
            <i className="pi pi-music mr-2"></i>
            舞台
          </span>
        </div>
      </div>

      {/* 座位图 */}
      <div className="overflow-x-auto">
        <div className="flex flex-col items-center min-w-max">
          {rows.map((row, rowIndex) => (
            <div 
              key={row} 
              className="flex items-center mb-2 animate-fade-in"
              style={{ animationDelay: `${rowIndex * 0.05}s` }}
            >
              {/* 行号左侧 */}
              <div className="w-8 text-center text-text-muted font-medium text-sm">
                {row}
              </div>

              {/* 座位 */}
              <div className="flex gap-1 mx-2">
                {seatsByRow[row].map((seat, seatIndex) => (
                  <div
                    key={seat.id}
                    className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-medium text-white shadow-sm ${getSeatStatusClass(seat)}`}
                    style={{ 
                      backgroundColor: isSeatSelected(seat) ? '#10b981' : (seat.status === 'sold' ? '#cbd5e1' : getSeatColor(seat)),
                      animationDelay: `${seatIndex * 0.01}s`
                    }}
                    onClick={() => seat.status !== 'sold' && onSeatClick(seat)}
                    title={`${seat.row}排 ${seat.number}座 - ${seat.status === 'sold' ? '已售出' : isSeatSelected(seat) ? '已选择' : '可选择'}`}
                  >
                    {seat.status === 'sold' ? (
                      <i className="pi pi-times text-xs"></i>
                    ) : isSeatSelected(seat) ? (
                      <i className="pi pi-check text-xs"></i>
                    ) : (
                      seat.number
                    )}
                  </div>
                ))}
              </div>

              {/* 行号右侧 */}
              <div className="w-8 text-center text-text-muted font-medium text-sm">
                {row}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 图例 */}
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-md bg-secondary mr-2 shadow-sm"></div>
          <span className="text-sm text-text-secondary">已选择</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-md bg-primary mr-2 shadow-sm"></div>
          <span className="text-sm text-text-secondary">可选择</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-md bg-gray-300 mr-2 shadow-sm"></div>
          <span className="text-sm text-text-secondary">已售出</span>
        </div>
      </div>
    </div>
  )
}

// 票务选项组件
interface TicketOptionsProps {
  ticketOptions: TicketOption[]
  priceRanges: PriceRange[]
  selectedOption: TicketOption | null
  onOptionSelect: (option: TicketOption) => void
}

const TicketOptions: React.FC<TicketOptionsProps> = ({ 
  ticketOptions, 
  priceRanges, 
  selectedOption, 
  onOptionSelect 
}) => {
  // 按价格区间分组票务选项
  const optionsByPriceRange = useMemo(() => {
    const grouped: Record<string, TicketOption[]> = {}
    ticketOptions.forEach(option => {
      if (!grouped[option.priceRangeId]) {
        grouped[option.priceRangeId] = []
      }
      grouped[option.priceRangeId].push(option)
    })
    return grouped
  }, [ticketOptions])

  // 获取价格区间信息
  const getPriceRangeInfo = (priceRangeId: string): PriceRange | undefined => {
    return priceRanges.find(p => p.id === priceRangeId)
  }

  // 格式化价格
  const formatPrice = (price: number): string => {
    return `¥${price.toLocaleString('zh-CN')}`
  }

  // 检查是否选中
  const isSelected = (option: TicketOption): boolean => {
    return selectedOption?.id === option.id
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-text-primary mb-4">
        选择票务类型
      </h3>

      <Accordion multiple activeIndex={[0]}>
        {Object.entries(optionsByPriceRange).map(([priceRangeId, options], index) => {
          const priceRange = getPriceRangeInfo(priceRangeId)
          if (!priceRange) return null

          return (
            <AccordionTab 
              key={priceRangeId}
              header={
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-3" 
                      style={{ backgroundColor: priceRange.color }}
                    ></div>
                    <span className="font-medium text-text-primary">
                      {priceRange.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-text-muted">
                      {options.length} 种选项
                    </span>
                  </div>
                </div>
              }
              className="animate-fade-in"
            >
              <div className="space-y-3">
                {options.map((option, optionIndex) => (
                  <div
                    key={option.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      isSelected(option)
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border hover:border-primary/50 hover:bg-background'
                    }`}
                    style={{ animationDelay: `${optionIndex * 0.1}s` }}
                    onClick={() => onOptionSelect(option)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-text-primary flex items-center">
                          {option.name}
                          {isSelected(option) && (
                            <Badge 
                              value="已选择" 
                              severity="success" 
                              className="ml-2"
                            />
                          )}
                        </h4>
                        <p className="text-sm text-text-muted mt-1">
                          {option.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {formatPrice(option.price)}
                        </p>
                        <p className="text-xs text-text-muted">/ 每张</p>
                      </div>
                    </div>

                    {/* 权益列表 */}
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-sm font-medium text-text-primary mb-2">
                        包含权益：
                      </p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {option.features.map((feature, featureIndex) => (
                          <li 
                            key={featureIndex} 
                            className="flex items-center text-sm text-text-secondary"
                          >
                            <i className="pi pi-check-circle text-secondary mr-2"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 选择按钮 */}
                    <div className="mt-4 flex justify-end">
                      <Button
                        label={isSelected(option) ? '已选择' : '选择此票型'}
                        icon={isSelected(option) ? 'pi pi-check' : 'pi pi-plus'}
                        severity={isSelected(option) ? 'secondary' : 'primary'}
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation()
                          onOptionSelect(option)
                        }}
                      ></Button>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionTab>
          )
        })}
      </Accordion>
    </div>
  )
}

// 预订摘要组件
interface BookingSummaryProps {
  event: typeof mockEvents[0]
  selectedSeats: Seat[]
  selectedOption: TicketOption | null
  onContinue: () => void
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ 
  event, 
  selectedSeats, 
  selectedOption,
  onContinue 
}) => {
  // 格式化价格
  const formatPrice = (price: number): string => {
    return `¥${price.toLocaleString('zh-CN')}`
  }

  // 计算总价
  const calculateTotal = (): number => {
    if (!selectedOption || selectedSeats.length === 0) return 0
    return selectedOption.price * selectedSeats.length
  }

  // 检查是否可以继续
  const canContinue = (): boolean => {
    return selectedSeats.length > 0 && selectedOption !== null
  }

  return (
    <Card className="shadow-lg border-0 sticky top-24">
      <h3 className="text-xl font-semibold text-text-primary mb-4">
        订单摘要
      </h3>

      {/* 演出信息 */}
      <div className="mb-4">
        <h4 className="font-medium text-text-primary mb-2">{event.title}</h4>
        <p className="text-sm text-text-secondary">
          <i className="pi pi-user mr-1"></i>
          {event.artist}
        </p>
        <p className="text-sm text-text-secondary">
          <i className="pi pi-map-marker mr-1"></i>
          {event.venue}
        </p>
        <p className="text-sm text-text-secondary">
          <i className="pi pi-calendar mr-1"></i>
          {new Date(event.date).toLocaleDateString('zh-CN')} {event.time}
        </p>
      </div>

      <Divider />

      {/* 已选座位 */}
      <div className="mb-4">
        <h4 className="font-medium text-text-primary mb-2 flex items-center justify-between">
          <span>已选座位</span>
          <Badge 
            value={`${selectedSeats.length} 张`} 
            severity={selectedSeats.length > 0 ? 'primary' : 'secondary'}
          />
        </h4>
        
        {selectedSeats.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map(seat => (
              <Badge 
                key={seat.id}
                value={`${seat.row}排${seat.number}座`}
                severity="info"
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-muted">请在座位图中选择座位</p>
        )}
      </div>

      <Divider />

      {/* 已选票型 */}
      <div className="mb-4">
        <h4 className="font-medium text-text-primary mb-2">已选票型</h4>
        {selectedOption ? (
          <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
            <p className="font-medium text-text-primary">{selectedOption.name}</p>
            <p className="text-sm text-text-primary mt-1">
              {formatPrice(selectedOption.price)} / 张
            </p>
          </div>
        ) : (
          <p className="text-sm text-text-muted">请选择票务类型</p>
        )}
      </div>

      <Divider />

      {/* 价格计算 */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-text-secondary">票价</span>
          <span className="text-text-primary">
            {selectedOption ? formatPrice(selectedOption.price) : '-'} × {selectedSeats.length}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-text-secondary">服务费</span>
          <span className="text-text-primary">免费</span>
        </div>
      </div>

      <Divider />

      {/* 总计 */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-text-primary">总计</span>
          <span className="text-2xl font-bold text-primary">
            {formatPrice(calculateTotal())}
          </span>
        </div>
      </div>

      {/* 确认按钮 */}
      <Button
        label="确认订单"
        icon="pi pi-check"
        severity="primary"
        size="large"
        className="w-full"
        disabled={!canContinue()}
        onClick={onContinue}
      ></Button>

      {/* 提示信息 */}
      <div className="mt-4 text-center">
        <p className="text-xs text-text-muted">
          <i className="pi pi-lock mr-1"></i>
          您的支付信息将被安全加密
        </p>
      </div>
    </Card>
  )
}

// 主页面组件
const BookingPage = () => {
  const { eventId } = useParams<{ eventId: string }>()
  const navigate = useNavigate()
  const [event, setEvent] = useState<typeof mockEvents[0] | null>(null)
  const [seats, setSeats] = useState<Seat[]>([])
  const [ticketOptions, setTicketOptions] = useState<TicketOption[]>([])
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
  const [selectedOption, setSelectedOption] = useState<TicketOption | null>(null)

  // 动态导入数据
  useEffect(() => {
    const foundEvent = mockEvents.find(e => e.id === eventId)
    if (foundEvent) {
      setEvent(foundEvent)
      
      // 动态导入座位数据
      import('../data/mockData').then(({ generateSeats, getTicketOptions }) => {
        const generatedSeats = generateSeats(eventId || '1')
        setSeats(generatedSeats)
        
        const options = getTicketOptions(eventId || '1')
        setTicketOptions(options)
        
        // 默认选择第一个票型
        if (options.length > 0) {
          setSelectedOption(options[0])
        }
      })
    }
  }, [eventId])

  // 处理座位点击
  const handleSeatClick = (seat: Seat) => {
    const isCurrentlySelected = selectedSeats.some(s => s.id === seat.id)
    
    if (isCurrentlySelected) {
      // 取消选择
      setSelectedSeats(prev => prev.filter(s => s.id !== seat.id))
    } else {
      // 添加选择
      setSelectedSeats(prev => [...prev, seat])
    }
  }

  // 处理票务选项选择
  const handleOptionSelect = (option: TicketOption) => {
    setSelectedOption(option)
  }

  // 处理继续按钮
  const handleContinue = () => {
    // 这里可以跳转到支付页面或显示确认弹窗
    alert(`订单确认成功！\n\n演出：${event?.title}\n座位：${selectedSeats.map(s => `${s.row}排${s.number}座`).join('、')}\n票型：${selectedOption?.name}\n总价：¥${(selectedOption?.price || 0) * selectedSeats.length}`)
  }

  // 格式化日期
  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    const weekDay = weekDays[date.getDay()]
    return `${year}年${month}月${day}日 ${weekDay}`
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
      {/* 页面头部 */}
      <section className="bg-surface border-b border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 面包屑 */}
          <div className="flex items-center text-sm text-text-secondary mb-4">
            <button 
              className="hover:text-primary transition-colors flex items-center"
              onClick={() => navigate(`/event/${eventId}`)}
            >
              <i className="pi pi-arrow-left mr-2"></i>
              返回演出详情
            </button>
            <span className="mx-3">/</span>
            <span className="text-text-primary font-medium">选择座位与票型</span>
          </div>

          {/* 演出信息 */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
                {event.title}
              </h1>
              <p className="text-text-secondary">
                <i className="pi pi-calendar mr-1"></i>
                {formatDate(new Date(event.date))} {event.time} · 
                <i className="pi pi-map-marker ml-4 mr-1"></i>
                {event.venue}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Badge 
                value={`剩余 ${event.availableSeats} 张`} 
                severity="success" 
                className="text-base py-1"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 主要内容区域 */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* 左侧：座位图和票务选项 */}
            <div className="lg:col-span-2 space-y-8">
              {/* 座位图 */}
              <Card className="shadow-lg border-0">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-text-primary">
                    选择座位
                  </h3>
                  <Badge 
                    value={`已选 ${selectedSeats.length} 个座位`} 
                    severity={selectedSeats.length > 0 ? 'primary' : 'secondary'}
                  />
                </div>

                {seats.length > 0 ? (
                  <SeatMap
                    seats={seats}
                    priceRanges={event.priceRanges}
                    selectedSeats={selectedSeats}
                    onSeatClick={handleSeatClick}
                  />
                ) : (
                  <div className="text-center py-12">
                    <i className="pi pi-spinner pi-spin text-4xl text-text-muted mb-4"></i>
                    <p className="text-text-secondary">加载座位图中...</p>
                  </div>
                )}

                {/* 清空选择按钮 */}
                {selectedSeats.length > 0 && (
                  <div className="mt-6 flex justify-end">
                    <Button
                      label="清空选择"
                      icon="pi pi-trash"
                      severity="secondary"
                      size="small"
                      className="p-button-outlined"
                      onClick={() => setSelectedSeats([])}
                    ></Button>
                  </div>
                )}
              </Card>

              {/* 票务选项（可折叠） */}
              <Card className="shadow-lg border-0">
                {ticketOptions.length > 0 ? (
                  <TicketOptions
                    ticketOptions={ticketOptions}
                    priceRanges={event.priceRanges}
                    selectedOption={selectedOption}
                    onOptionSelect={handleOptionSelect}
                  />
                ) : (
                  <div className="text-center py-12">
                    <i className="pi pi-spinner pi-spin text-4xl text-text-muted mb-4"></i>
                    <p className="text-text-secondary">加载票务选项中...</p>
                  </div>
                )}
              </Card>
            </div>

            {/* 右侧：订单摘要 */}
            <div className="lg:col-span-1">
              <BookingSummary
                event={event}
                selectedSeats={selectedSeats}
                selectedOption={selectedOption}
                onContinue={handleContinue}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BookingPage
