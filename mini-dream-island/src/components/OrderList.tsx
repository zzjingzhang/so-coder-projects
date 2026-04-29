import type { Order } from '../types';

interface OrderListProps {
  orders: Order[];
  getResourceAmount: (resourceId: string) => number;
}

export const OrderList = ({ orders, getResourceAmount }: OrderListProps) => {
  const getProgress = (order: Order) => {
    if (order.completed) return 100;
    
    let totalRequired = 0;
    let totalCurrent = 0;
    
    order.requirements.forEach(req => {
      totalRequired += req.amount;
      totalCurrent += Math.min(getResourceAmount(req.resourceId), req.amount);
    });
    
    return totalRequired > 0 ? (totalCurrent / totalRequired) * 100 : 0;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-4">📋 任务订单</h3>
      
      <div className="space-y-3">
        {orders.map(order => {
          const progress = getProgress(order);
          
          return (
            <div
              key={order.id}
              className={`order-card ${order.completed ? 'completed' : ''}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-gray-800">
                  {order.completed ? '✅' : '📝'} {order.name}
                </h4>
                <span className={`text-sm font-semibold ${
                  order.completed ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {order.completed ? '已完成' : `${Math.floor(progress)}%`}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{order.description}</p>
              
              {!order.completed && (
                <div className="progress-bar mb-3">
                  <div 
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">需要:</p>
                  <div className="flex flex-wrap gap-2">
                    {order.requirements.map((req, index) => {
                      const current = getResourceAmount(req.resourceId);
                      const hasEnough = current >= req.amount;
                      return (
                        <span
                          key={index}
                          className={`text-xs px-2 py-1 rounded ${
                            hasEnough ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {req.resourceId === 'wood' && '🪵'}
                          {req.resourceId === 'stone' && '🪨'}
                          {req.resourceId === 'food' && '🍎'}
                          {req.resourceId === 'gold' && '💰'}
                          {Math.floor(current)}/{req.amount}
                        </span>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">奖励:</p>
                  <div className="flex flex-wrap gap-2">
                    {order.rewards.map((reward, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800"
                      >
                        {reward.resourceId === 'wood' && '🪵'}
                        {reward.resourceId === 'stone' && '🪨'}
                        {reward.resourceId === 'food' && '🍎'}
                        {reward.resourceId === 'gold' && '💰'}
                        +{reward.amount}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
