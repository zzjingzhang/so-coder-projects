import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FlowChart, FlowNode } from '../models/flow-chart.model';

@Injectable({
  providedIn: 'root'
})
export class FlowChartDataService {

  private mockFlowCharts: FlowChart[] = [
    {
      id: 'fc-001',
      name: '订单处理流程',
      description: '处理用户订单的完整流程，包括下单、支付、发货、签收等环节',
      creator: '张三',
      createTime: '2026-04-15 10:30:00',
      nodes: [
        {
          id: 'n-001',
          name: '开始',
          nodeType: 'start',
          x: 100,
          y: 100,
          width: 80,
          height: 40,
          connectedTo: ['n-002'],
          detail: {
            codeClasses: [
              {
                className: 'OrderStartHandler',
                packageName: 'com.example.flow.order',
                description: '订单流程开始处理器，初始化订单上下文'
              }
            ],
            methods: [
              {
                methodName: 'initOrderContext',
                returnType: 'OrderContext',
                parameters: 'OrderRequest request',
                description: '初始化订单上下文对象'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-001',
                ruleName: '订单号生成规则',
                ruleContent: '订单号 = 时间戳(14位) + 随机数(6位)'
              }
            ],
            permissions: [
              {
                permissionCode: 'ORDER_CREATE',
                permissionName: '创建订单权限',
                description: '允许用户创建新订单'
              }
            ],
            tableModels: [
              {
                tableName: 't_order',
                tableComment: '订单主表',
                fields: [
                  { fieldName: 'order_id', fieldType: 'VARCHAR(32)', comment: '订单ID', isPrimaryKey: true },
                  { fieldName: 'order_no', fieldType: 'VARCHAR(20)', comment: '订单号', isPrimaryKey: false },
                  { fieldName: 'user_id', fieldType: 'VARCHAR(32)', comment: '用户ID', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'order.prefix',
                configValue: 'ORD',
                description: '订单号前缀'
              }
            ]
          }
        },
        {
          id: 'n-002',
          name: '订单创建',
          nodeType: 'process',
          x: 250,
          y: 100,
          width: 120,
          height: 50,
          connectedTo: ['n-003'],
          detail: {
            codeClasses: [
              {
                className: 'OrderCreateService',
                packageName: 'com.example.flow.order.service',
                description: '订单创建服务，处理订单入库逻辑'
              },
              {
                className: 'OrderValidator',
                packageName: 'com.example.flow.order.validator',
                description: '订单数据校验器'
              }
            ],
            methods: [
              {
                methodName: 'createOrder',
                returnType: 'String',
                parameters: 'OrderDTO orderDTO',
                description: '创建订单并返回订单ID'
              },
              {
                methodName: 'validateOrder',
                returnType: 'boolean',
                parameters: 'OrderDTO orderDTO',
                description: '校验订单数据是否合法'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-002',
                ruleName: '库存检查规则',
                ruleContent: '下单前必须检查商品库存是否充足'
              },
              {
                ruleId: 'RULE-003',
                ruleName: '价格计算规则',
                ruleContent: '订单总价 = 商品单价 × 数量 - 优惠金额'
              }
            ],
            permissions: [
              {
                permissionCode: 'ORDER_CREATE',
                permissionName: '创建订单权限',
                description: '允许用户创建新订单'
              },
              {
                permissionCode: 'STOCK_QUERY',
                permissionName: '库存查询权限',
                description: '允许查询商品库存信息'
              }
            ],
            tableModels: [
              {
                tableName: 't_order',
                tableComment: '订单主表',
                fields: [
                  { fieldName: 'order_id', fieldType: 'VARCHAR(32)', comment: '订单ID', isPrimaryKey: true },
                  { fieldName: 'order_no', fieldType: 'VARCHAR(20)', comment: '订单号', isPrimaryKey: false },
                  { fieldName: 'total_amount', fieldType: 'DECIMAL(10,2)', comment: '订单总金额', isPrimaryKey: false }
                ]
              },
              {
                tableName: 't_order_item',
                tableComment: '订单明细表',
                fields: [
                  { fieldName: 'item_id', fieldType: 'VARCHAR(32)', comment: '明细ID', isPrimaryKey: true },
                  { fieldName: 'order_id', fieldType: 'VARCHAR(32)', comment: '订单ID', isPrimaryKey: false },
                  { fieldName: 'product_id', fieldType: 'VARCHAR(32)', comment: '商品ID', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'order.max.items',
                configValue: '100',
                description: '单笔订单最大商品数量'
              },
              {
                configKey: 'order.expire.hours',
                configValue: '24',
                description: '订单未支付过期时间(小时)'
              }
            ]
          }
        },
        {
          id: 'n-003',
          name: '支付判断',
          nodeType: 'decision',
          x: 450,
          y: 100,
          width: 100,
          height: 60,
          connectedTo: ['n-004', 'n-005'],
          detail: {
            codeClasses: [
              {
                className: 'PaymentDecisionHandler',
                packageName: 'com.example.flow.payment',
                description: '支付状态判断处理器'
              }
            ],
            methods: [
              {
                methodName: 'checkPaymentStatus',
                returnType: 'PaymentStatus',
                parameters: 'String orderId',
                description: '检查订单支付状态'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-004',
                ruleName: '支付超时规则',
                ruleContent: '超过24小时未支付的订单自动取消'
              }
            ],
            permissions: [
              {
                permissionCode: 'PAYMENT_QUERY',
                permissionName: '支付查询权限',
                description: '允许查询支付状态'
              }
            ],
            tableModels: [
              {
                tableName: 't_payment',
                tableComment: '支付记录表',
                fields: [
                  { fieldName: 'payment_id', fieldType: 'VARCHAR(32)', comment: '支付ID', isPrimaryKey: true },
                  { fieldName: 'order_id', fieldType: 'VARCHAR(32)', comment: '订单ID', isPrimaryKey: false },
                  { fieldName: 'status', fieldType: 'VARCHAR(20)', comment: '支付状态', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'payment.timeout.minutes',
                configValue: '30',
                description: '支付等待超时时间(分钟)'
              }
            ]
          }
        },
        {
          id: 'n-004',
          name: '支付成功',
          nodeType: 'process',
          x: 650,
          y: 50,
          width: 120,
          height: 50,
          connectedTo: ['n-006'],
          detail: {
            codeClasses: [
              {
                className: 'PaymentSuccessHandler',
                packageName: 'com.example.flow.payment',
                description: '支付成功后的处理逻辑'
              }
            ],
            methods: [
              {
                methodName: 'updateOrderStatus',
                returnType: 'void',
                parameters: 'String orderId, OrderStatus status',
                description: '更新订单状态'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-005',
                ruleName: '积分奖励规则',
                ruleContent: '支付成功后，按订单金额的1%赠送积分'
              }
            ],
            permissions: [
              {
                permissionCode: 'ORDER_STATUS_UPDATE',
                permissionName: '订单状态更新权限',
                description: '允许更新订单状态'
              }
            ],
            tableModels: [
              {
                tableName: 't_order',
                tableComment: '订单主表',
                fields: [
                  { fieldName: 'order_id', fieldType: 'VARCHAR(32)', comment: '订单ID', isPrimaryKey: true },
                  { fieldName: 'status', fieldType: 'VARCHAR(20)', comment: '订单状态', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'points.ratio',
                configValue: '0.01',
                description: '积分奖励比例'
              }
            ]
          }
        },
        {
          id: 'n-005',
          name: '支付失败',
          nodeType: 'process',
          x: 650,
          y: 180,
          width: 120,
          height: 50,
          connectedTo: ['n-007'],
          detail: {
            codeClasses: [
              {
                className: 'PaymentFailHandler',
                packageName: 'com.example.flow.payment',
                description: '支付失败处理逻辑'
              }
            ],
            methods: [
              {
                methodName: 'rollbackStock',
                returnType: 'void',
                parameters: 'String orderId',
                description: '回滚库存'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-006',
                ruleName: '库存回滚规则',
                ruleContent: '支付失败时必须将已锁定的库存回滚'
              }
            ],
            permissions: [
              {
                permissionCode: 'STOCK_UPDATE',
                permissionName: '库存更新权限',
                description: '允许更新商品库存'
              }
            ],
            tableModels: [
              {
                tableName: 't_stock',
                tableComment: '库存表',
                fields: [
                  { fieldName: 'stock_id', fieldType: 'VARCHAR(32)', comment: '库存ID', isPrimaryKey: true },
                  { fieldName: 'product_id', fieldType: 'VARCHAR(32)', comment: '商品ID', isPrimaryKey: false },
                  { fieldName: 'quantity', fieldType: 'INT', comment: '可用库存', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'payment.retry.times',
                configValue: '3',
                description: '支付失败重试次数'
              }
            ]
          }
        },
        {
          id: 'n-006',
          name: '发货处理',
          nodeType: 'process',
          x: 850,
          y: 50,
          width: 120,
          height: 50,
          connectedTo: ['n-007'],
          detail: {
            codeClasses: [
              {
                className: 'ShippingService',
                packageName: 'com.example.flow.shipping',
                description: '发货处理服务'
              }
            ],
            methods: [
              {
                methodName: 'createShipping',
                returnType: 'String',
                parameters: 'String orderId, ShippingInfo info',
                description: '创建发货单并返回发货单ID'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-007',
                ruleName: '发货地址校验规则',
                ruleContent: '发货地址必须包含省、市、区、详细地址'
              }
            ],
            permissions: [
              {
                permissionCode: 'SHIPPING_CREATE',
                permissionName: '创建发货单权限',
                description: '允许创建发货单'
              }
            ],
            tableModels: [
              {
                tableName: 't_shipping',
                tableComment: '发货单表',
                fields: [
                  { fieldName: 'shipping_id', fieldType: 'VARCHAR(32)', comment: '发货单ID', isPrimaryKey: true },
                  { fieldName: 'order_id', fieldType: 'VARCHAR(32)', comment: '订单ID', isPrimaryKey: false },
                  { fieldName: 'express_no', fieldType: 'VARCHAR(50)', comment: '快递单号', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'shipping.default.express',
                configValue: 'SF',
                description: '默认快递公司'
              }
            ]
          }
        },
        {
          id: 'n-007',
          name: '结束',
          nodeType: 'end',
          x: 1000,
          y: 100,
          width: 80,
          height: 40,
          connectedTo: [],
          detail: {
            codeClasses: [
              {
                className: 'FlowEndHandler',
                packageName: 'com.example.flow.common',
                description: '流程结束处理器'
              }
            ],
            methods: [
              {
                methodName: 'completeFlow',
                returnType: 'void',
                parameters: 'String flowId, String status',
                description: '完成流程并记录状态'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-008',
                ruleName: '流程归档规则',
                ruleContent: '流程结束后30天自动归档'
              }
            ],
            permissions: [
              {
                permissionCode: 'FLOW_COMPLETE',
                permissionName: '完成流程权限',
                description: '允许标记流程完成'
              }
            ],
            tableModels: [
              {
                tableName: 't_flow_instance',
                tableComment: '流程实例表',
                fields: [
                  { fieldName: 'instance_id', fieldType: 'VARCHAR(32)', comment: '实例ID', isPrimaryKey: true },
                  { fieldName: 'flow_code', fieldType: 'VARCHAR(50)', comment: '流程编码', isPrimaryKey: false },
                  { fieldName: 'status', fieldType: 'VARCHAR(20)', comment: '流程状态', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'flow.archive.days',
                configValue: '30',
                description: '流程归档天数'
              }
            ]
          }
        }
      ]
    },
    {
      id: 'fc-002',
      name: '用户注册流程',
      description: '新用户注册账号的完整流程，包括信息填写、邮箱验证、激活等',
      creator: '李四',
      createTime: '2026-04-10 14:20:00',
      nodes: [
        {
          id: 'n-101',
          name: '开始',
          nodeType: 'start',
          x: 100,
          y: 150,
          width: 80,
          height: 40,
          connectedTo: ['n-102'],
          detail: {
            codeClasses: [
              {
                className: 'RegisterStartHandler',
                packageName: 'com.example.user.register',
                description: '注册流程开始处理器'
              }
            ],
            methods: [
              {
                methodName: 'initRegisterContext',
                returnType: 'RegisterContext',
                parameters: 'RegisterRequest request',
                description: '初始化注册上下文'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-101',
                ruleName: '用户名规则',
                ruleContent: '用户名长度4-20位，只能包含字母、数字、下划线'
              }
            ],
            permissions: [
              {
                permissionCode: 'USER_REGISTER',
                permissionName: '用户注册权限',
                description: '允许新用户注册'
              }
            ],
            tableModels: [
              {
                tableName: 't_user',
                tableComment: '用户表',
                fields: [
                  { fieldName: 'user_id', fieldType: 'VARCHAR(32)', comment: '用户ID', isPrimaryKey: true },
                  { fieldName: 'username', fieldType: 'VARCHAR(50)', comment: '用户名', isPrimaryKey: false },
                  { fieldName: 'email', fieldType: 'VARCHAR(100)', comment: '邮箱', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'register.allow.anonymous',
                configValue: 'true',
                description: '是否允许匿名注册'
              }
            ]
          }
        },
        {
          id: 'n-102',
          name: '信息填写',
          nodeType: 'process',
          x: 280,
          y: 150,
          width: 120,
          height: 50,
          connectedTo: ['n-103'],
          detail: {
            codeClasses: [
              {
                className: 'UserInfoValidator',
                packageName: 'com.example.user.validator',
                description: '用户信息校验器'
              }
            ],
            methods: [
              {
                methodName: 'validateUserInfo',
                returnType: 'ValidationResult',
                parameters: 'UserInfoDTO userInfo',
                description: '校验用户注册信息'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-102',
                ruleName: '密码强度规则',
                ruleContent: '密码长度至少8位，必须包含大小写字母和数字'
              },
              {
                ruleId: 'RULE-103',
                ruleName: '邮箱唯一性规则',
                ruleContent: '同一个邮箱只能注册一个账号'
              }
            ],
            permissions: [
              {
                permissionCode: 'USER_QUERY',
                permissionName: '用户查询权限',
                description: '允许查询用户信息'
              }
            ],
            tableModels: [
              {
                tableName: 't_user',
                tableComment: '用户表',
                fields: [
                  { fieldName: 'user_id', fieldType: 'VARCHAR(32)', comment: '用户ID', isPrimaryKey: true },
                  { fieldName: 'password', fieldType: 'VARCHAR(255)', comment: '密码(加密)', isPrimaryKey: false },
                  { fieldName: 'email', fieldType: 'VARCHAR(100)', comment: '邮箱', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'password.min.length',
                configValue: '8',
                description: '密码最小长度'
              }
            ]
          }
        },
        {
          id: 'n-103',
          name: '发送验证邮件',
          nodeType: 'process',
          x: 480,
          y: 150,
          width: 140,
          height: 50,
          connectedTo: ['n-104'],
          detail: {
            codeClasses: [
              {
                className: 'EmailService',
                packageName: 'com.example.notification.email',
                description: '邮件发送服务'
              }
            ],
            methods: [
              {
                methodName: 'sendVerificationEmail',
                returnType: 'boolean',
                parameters: 'String email, String verifyCode',
                description: '发送验证邮件'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-104',
                ruleName: '验证码规则',
                ruleContent: '验证码为6位数字，有效期5分钟'
              }
            ],
            permissions: [
              {
                permissionCode: 'EMAIL_SEND',
                permissionName: '邮件发送权限',
                description: '允许发送邮件'
              }
            ],
            tableModels: [
              {
                tableName: 't_verify_code',
                tableComment: '验证码表',
                fields: [
                  { fieldName: 'id', fieldType: 'VARCHAR(32)', comment: 'ID', isPrimaryKey: true },
                  { fieldName: 'email', fieldType: 'VARCHAR(100)', comment: '邮箱', isPrimaryKey: false },
                  { fieldName: 'code', fieldType: 'VARCHAR(10)', comment: '验证码', isPrimaryKey: false },
                  { fieldName: 'expire_time', fieldType: 'DATETIME', comment: '过期时间', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'email.verify.expire.minutes',
                configValue: '5',
                description: '验证码过期时间(分钟)'
              }
            ]
          }
        },
        {
          id: 'n-104',
          name: '验证结果',
          nodeType: 'decision',
          x: 700,
          y: 150,
          width: 100,
          height: 60,
          connectedTo: ['n-105', 'n-106'],
          detail: {
            codeClasses: [
              {
                className: 'VerificationHandler',
                packageName: 'com.example.user.verify',
                description: '验证码验证处理器'
              }
            ],
            methods: [
              {
                methodName: 'verifyCode',
                returnType: 'boolean',
                parameters: 'String email, String code',
                description: '验证邮箱验证码'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-105',
                ruleName: '验证失败重试规则',
                ruleContent: '连续验证失败3次，需等待10分钟后重试'
              }
            ],
            permissions: [
              {
                permissionCode: 'VERIFY_CODE_USE',
                permissionName: '验证码使用权限',
                description: '允许使用验证码'
              }
            ],
            tableModels: [
              {
                tableName: 't_verify_code',
                tableComment: '验证码表',
                fields: [
                  { fieldName: 'id', fieldType: 'VARCHAR(32)', comment: 'ID', isPrimaryKey: true },
                  { fieldName: 'used', fieldType: 'BIT', comment: '是否已使用', isPrimaryKey: false },
                  { fieldName: 'retry_count', fieldType: 'INT', comment: '重试次数', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'verify.max.retry',
                configValue: '3',
                description: '最大重试次数'
              }
            ]
          }
        },
        {
          id: 'n-105',
          name: '激活账号',
          nodeType: 'process',
          x: 900,
          y: 80,
          width: 120,
          height: 50,
          connectedTo: ['n-107'],
          detail: {
            codeClasses: [
              {
                className: 'UserActivationService',
                packageName: 'com.example.user.service',
                description: '用户账号激活服务'
              }
            ],
            methods: [
              {
                methodName: 'activateUser',
                returnType: 'void',
                parameters: 'String userId',
                description: '激活用户账号'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-106',
                ruleName: '默认角色分配规则',
                ruleContent: '新注册用户默认分配"普通用户"角色'
              }
            ],
            permissions: [
              {
                permissionCode: 'USER_ACTIVATE',
                permissionName: '用户激活权限',
                description: '允许激活用户账号'
              }
            ],
            tableModels: [
              {
                tableName: 't_user_role',
                tableComment: '用户角色关联表',
                fields: [
                  { fieldName: 'id', fieldType: 'VARCHAR(32)', comment: 'ID', isPrimaryKey: true },
                  { fieldName: 'user_id', fieldType: 'VARCHAR(32)', comment: '用户ID', isPrimaryKey: false },
                  { fieldName: 'role_id', fieldType: 'VARCHAR(32)', comment: '角色ID', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'user.default.role',
                configValue: 'ROLE_USER',
                description: '默认角色编码'
              }
            ]
          }
        },
        {
          id: 'n-106',
          name: '验证失败',
          nodeType: 'process',
          x: 900,
          y: 220,
          width: 120,
          height: 50,
          connectedTo: ['n-107'],
          detail: {
            codeClasses: [
              {
                className: 'VerifyFailHandler',
                packageName: 'com.example.user.verify',
                description: '验证失败处理器'
              }
            ],
            methods: [
              {
                methodName: 'incrementRetryCount',
                returnType: 'void',
                parameters: 'String email',
                description: '增加重试次数'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-107',
                ruleName: '失败处理规则',
                ruleContent: '验证失败后允许重新发送验证码'
              }
            ],
            permissions: [
              {
                permissionCode: 'VERIFY_CODE_RESEND',
                permissionName: '重发验证码权限',
                description: '允许重新发送验证码'
              }
            ],
            tableModels: [
              {
                tableName: 't_verify_code',
                tableComment: '验证码表',
                fields: [
                  { fieldName: 'id', fieldType: 'VARCHAR(32)', comment: 'ID', isPrimaryKey: true },
                  { fieldName: 'retry_count', fieldType: 'INT', comment: '重试次数', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'verify.resend.interval.seconds',
                configValue: '60',
                description: '重发验证码间隔(秒)'
              }
            ]
          }
        },
        {
          id: 'n-107',
          name: '结束',
          nodeType: 'end',
          x: 1100,
          y: 150,
          width: 80,
          height: 40,
          connectedTo: [],
          detail: {
            codeClasses: [
              {
                className: 'RegisterCompleteHandler',
                packageName: 'com.example.user.register',
                description: '注册流程完成处理器'
              }
            ],
            methods: [
              {
                methodName: 'sendWelcomeMessage',
                returnType: 'void',
                parameters: 'String userId',
                description: '发送欢迎消息'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-108',
                ruleName: '新用户奖励规则',
                ruleContent: '新用户注册成功赠送100积分'
              }
            ],
            permissions: [
              {
                permissionCode: 'POINTS_GRANT',
                permissionName: '积分发放权限',
                description: '允许发放积分'
              }
            ],
            tableModels: [
              {
                tableName: 't_points_record',
                tableComment: '积分记录表',
                fields: [
                  { fieldName: 'id', fieldType: 'VARCHAR(32)', comment: 'ID', isPrimaryKey: true },
                  { fieldName: 'user_id', fieldType: 'VARCHAR(32)', comment: '用户ID', isPrimaryKey: false },
                  { fieldName: 'points', fieldType: 'INT', comment: '积分数量', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'new.user.welcome.points',
                configValue: '100',
                description: '新用户欢迎积分'
              }
            ]
          }
        }
      ]
    },
    {
      id: 'fc-003',
      name: '商品上架流程',
      description: '商品上架审核流程，包括信息审核、价格审核、库存确认等环节',
      creator: '王五',
      createTime: '2026-04-05 09:15:00',
      nodes: [
        {
          id: 'n-201',
          name: '开始',
          nodeType: 'start',
          x: 100,
          y: 150,
          width: 80,
          height: 40,
          connectedTo: ['n-202'],
          detail: {
            codeClasses: [
              {
                className: 'ProductOnShelfStartHandler',
                packageName: 'com.example.product.onshelf',
                description: '商品上架流程开始处理器'
              }
            ],
            methods: [
              {
                methodName: 'initOnShelfContext',
                returnType: 'OnShelfContext',
                parameters: 'ProductOnShelfRequest request',
                description: '初始化上架流程上下文'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-201',
                ruleName: '商品编码规则',
                ruleContent: '商品编码 = 分类编码(2位) + 时间戳(8位) + 序号(4位)'
              }
            ],
            permissions: [
              {
                permissionCode: 'PRODUCT_ONSHELF_APPLY',
                permissionName: '商品上架申请权限',
                description: '允许提交商品上架申请'
              }
            ],
            tableModels: [
              {
                tableName: 't_product',
                tableComment: '商品表',
                fields: [
                  { fieldName: 'product_id', fieldType: 'VARCHAR(32)', comment: '商品ID', isPrimaryKey: true },
                  { fieldName: 'product_code', fieldType: 'VARCHAR(20)', comment: '商品编码', isPrimaryKey: false },
                  { fieldName: 'product_name', fieldType: 'VARCHAR(200)', comment: '商品名称', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'product.code.prefix',
                configValue: 'PRD',
                description: '商品编码前缀'
              }
            ]
          }
        },
        {
          id: 'n-202',
          name: '信息审核',
          nodeType: 'process',
          x: 280,
          y: 150,
          width: 120,
          height: 50,
          connectedTo: ['n-203'],
          detail: {
            codeClasses: [
              {
                className: 'ProductInfoAuditService',
                packageName: 'com.example.product.audit',
                description: '商品信息审核服务'
              }
            ],
            methods: [
              {
                methodName: 'auditProductInfo',
                returnType: 'AuditResult',
                parameters: 'String productId',
                description: '审核商品基础信息'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-202',
                ruleName: '图片审核规则',
                ruleContent: '商品主图必须是正方形，分辨率不低于800×800'
              },
              {
                ruleId: 'RULE-203',
                ruleName: '敏感词过滤规则',
                ruleContent: '商品名称和描述不能包含敏感词'
              }
            ],
            permissions: [
              {
                permissionCode: 'PRODUCT_AUDIT',
                permissionName: '商品审核权限',
                description: '允许审核商品信息'
              }
            ],
            tableModels: [
              {
                tableName: 't_product_audit',
                tableComment: '商品审核表',
                fields: [
                  { fieldName: 'audit_id', fieldType: 'VARCHAR(32)', comment: '审核ID', isPrimaryKey: true },
                  { fieldName: 'product_id', fieldType: 'VARCHAR(32)', comment: '商品ID', isPrimaryKey: false },
                  { fieldName: 'audit_type', fieldType: 'VARCHAR(50)', comment: '审核类型', isPrimaryKey: false },
                  { fieldName: 'audit_result', fieldType: 'VARCHAR(20)', comment: '审核结果', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'product.image.min.resolution',
                configValue: '800',
                description: '商品图片最小分辨率'
              }
            ]
          }
        },
        {
          id: 'n-203',
          name: '审核结果',
          nodeType: 'decision',
          x: 480,
          y: 150,
          width: 100,
          height: 60,
          connectedTo: ['n-204', 'n-205'],
          detail: {
            codeClasses: [
              {
                className: 'AuditDecisionHandler',
                packageName: 'com.example.product.audit',
                description: '审核结果判断处理器'
              }
            ],
            methods: [
              {
                methodName: 'checkAuditResult',
                returnType: 'AuditStatus',
                parameters: 'String auditId',
                description: '检查审核结果状态'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-204',
                ruleName: '审核退回规则',
                ruleContent: '审核不通过时，需填写具体原因'
              }
            ],
            permissions: [
              {
                permissionCode: 'AUDIT_RESULT_QUERY',
                permissionName: '审核结果查询权限',
                description: '允许查询审核结果'
              }
            ],
            tableModels: [
              {
                tableName: 't_product_audit',
                tableComment: '商品审核表',
                fields: [
                  { fieldName: 'audit_id', fieldType: 'VARCHAR(32)', comment: '审核ID', isPrimaryKey: true },
                  { fieldName: 'audit_reason', fieldType: 'VARCHAR(500)', comment: '审核原因', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'audit.auto.approve',
                configValue: 'false',
                description: '是否自动审核通过'
              }
            ]
          }
        },
        {
          id: 'n-204',
          name: '价格审核',
          nodeType: 'process',
          x: 680,
          y: 80,
          width: 120,
          height: 50,
          connectedTo: ['n-206'],
          detail: {
            codeClasses: [
              {
                className: 'PriceAuditService',
                packageName: 'com.example.product.audit',
                description: '价格审核服务'
              }
            ],
            methods: [
              {
                methodName: 'auditPrice',
                returnType: 'AuditResult',
                parameters: 'String productId, BigDecimal price',
                description: '审核商品价格'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-205',
                ruleName: '价格区间规则',
                ruleContent: '销售价格必须在成本价的1.1倍到5倍之间'
              },
              {
                ruleId: 'RULE-206',
                ruleName: '竞品对比规则',
                ruleContent: '同类商品价格差异超过20%需人工审核'
              }
            ],
            permissions: [
              {
                permissionCode: 'PRICE_AUDIT',
                permissionName: '价格审核权限',
                description: '允许审核商品价格'
              }
            ],
            tableModels: [
              {
                tableName: 't_product_price',
                tableComment: '商品价格表',
                fields: [
                  { fieldName: 'price_id', fieldType: 'VARCHAR(32)', comment: '价格ID', isPrimaryKey: true },
                  { fieldName: 'product_id', fieldType: 'VARCHAR(32)', comment: '商品ID', isPrimaryKey: false },
                  { fieldName: 'sale_price', fieldType: 'DECIMAL(10,2)', comment: '销售价格', isPrimaryKey: false },
                  { fieldName: 'cost_price', fieldType: 'DECIMAL(10,2)', comment: '成本价格', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'price.min.multiplier',
                configValue: '1.1',
                description: '价格最小倍数(相对于成本价)'
              },
              {
                configKey: 'price.max.multiplier',
                configValue: '5.0',
                description: '价格最大倍数(相对于成本价)'
              }
            ]
          }
        },
        {
          id: 'n-205',
          name: '退回修改',
          nodeType: 'process',
          x: 680,
          y: 220,
          width: 120,
          height: 50,
          connectedTo: ['n-208'],
          detail: {
            codeClasses: [
              {
                className: 'AuditRejectHandler',
                packageName: 'com.example.product.audit',
                description: '审核退回处理器'
              }
            ],
            methods: [
              {
                methodName: 'sendRejectNotification',
                returnType: 'void',
                parameters: 'String productId, String reason',
                description: '发送审核退回通知'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-207',
                ruleName: '修改时限规则',
                ruleContent: '审核退回后需在7天内完成修改并重新提交'
              }
            ],
            permissions: [
              {
                permissionCode: 'NOTIFICATION_SEND',
                permissionName: '通知发送权限',
                description: '允许发送通知消息'
              }
            ],
            tableModels: [
              {
                tableName: 't_notification',
                tableComment: '通知消息表',
                fields: [
                  { fieldName: 'notification_id', fieldType: 'VARCHAR(32)', comment: '通知ID', isPrimaryKey: true },
                  { fieldName: 'user_id', fieldType: 'VARCHAR(32)', comment: '接收用户ID', isPrimaryKey: false },
                  { fieldName: 'content', fieldType: 'TEXT', comment: '通知内容', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'audit.revise.days',
                configValue: '7',
                description: '修改时限(天)'
              }
            ]
          }
        },
        {
          id: 'n-206',
          name: '库存确认',
          nodeType: 'process',
          x: 880,
          y: 80,
          width: 120,
          height: 50,
          connectedTo: ['n-207'],
          detail: {
            codeClasses: [
              {
                className: 'StockConfirmationService',
                packageName: 'com.example.product.stock',
                description: '库存确认服务'
              }
            ],
            methods: [
              {
                methodName: 'confirmStock',
                returnType: 'StockStatus',
                parameters: 'String productId, Integer quantity',
                description: '确认商品库存状态'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-208',
                ruleName: '安全库存规则',
                ruleContent: '上架商品库存必须大于安全库存值'
              },
              {
                ruleId: 'RULE-209',
                ruleName: '多仓规则',
                ruleContent: '多仓库商品需确认所有仓库可用库存'
              }
            ],
            permissions: [
              {
                permissionCode: 'STOCK_CONFIRM',
                permissionName: '库存确认权限',
                description: '允许确认商品库存'
              }
            ],
            tableModels: [
              {
                tableName: 't_stock',
                tableComment: '库存表',
                fields: [
                  { fieldName: 'stock_id', fieldType: 'VARCHAR(32)', comment: '库存ID', isPrimaryKey: true },
                  { fieldName: 'product_id', fieldType: 'VARCHAR(32)', comment: '商品ID', isPrimaryKey: false },
                  { fieldName: 'warehouse_id', fieldType: 'VARCHAR(32)', comment: '仓库ID', isPrimaryKey: false },
                  { fieldName: 'available_quantity', fieldType: 'INT', comment: '可用库存', isPrimaryKey: false },
                  { fieldName: 'safe_quantity', fieldType: 'INT', comment: '安全库存', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'stock.safe.default',
                configValue: '10',
                description: '默认安全库存数量'
              }
            ]
          }
        },
        {
          id: 'n-207',
          name: '上架成功',
          nodeType: 'process',
          x: 1080,
          y: 80,
          width: 120,
          height: 50,
          connectedTo: ['n-208'],
          detail: {
            codeClasses: [
              {
                className: 'ProductOnShelfService',
                packageName: 'com.example.product.service',
                description: '商品上架服务'
              }
            ],
            methods: [
              {
                methodName: 'putOnShelf',
                returnType: 'void',
                parameters: 'String productId',
                description: '将商品上架'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-210',
                ruleName: '上架时间规则',
                ruleContent: '可设置定时上架，到指定时间自动上架'
              },
              {
                ruleId: 'RULE-211',
                ruleName: '搜索引擎同步规则',
                ruleContent: '商品上架后需同步到搜索引擎'
              }
            ],
            permissions: [
              {
                permissionCode: 'PRODUCT_ONSHELF',
                permissionName: '商品上架权限',
                description: '允许将商品上架'
              }
            ],
            tableModels: [
              {
                tableName: 't_product',
                tableComment: '商品表',
                fields: [
                  { fieldName: 'product_id', fieldType: 'VARCHAR(32)', comment: '商品ID', isPrimaryKey: true },
                  { fieldName: 'status', fieldType: 'VARCHAR(20)', comment: '商品状态', isPrimaryKey: false },
                  { fieldName: 'on_shelf_time', fieldType: 'DATETIME', comment: '上架时间', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'product.sync.search',
                configValue: 'true',
                description: '是否同步到搜索引擎'
              }
            ]
          }
        },
        {
          id: 'n-208',
          name: '结束',
          nodeType: 'end',
          x: 1280,
          y: 150,
          width: 80,
          height: 40,
          connectedTo: [],
          detail: {
            codeClasses: [
              {
                className: 'OnShelfCompleteHandler',
                packageName: 'com.example.product.onshelf',
                description: '上架流程完成处理器'
              }
            ],
            methods: [
              {
                methodName: 'completeOnShelfFlow',
                returnType: 'void',
                parameters: 'String productId, String result',
                description: '完成上架流程'
              }
            ],
            businessRules: [
              {
                ruleId: 'RULE-212',
                ruleName: '流程记录规则',
                ruleContent: '所有上架流程操作都需记录日志'
              }
            ],
            permissions: [
              {
                permissionCode: 'FLOW_LOG_WRITE',
                permissionName: '流程日志写入权限',
                description: '允许写入流程日志'
              }
            ],
            tableModels: [
              {
                tableName: 't_flow_log',
                tableComment: '流程日志表',
                fields: [
                  { fieldName: 'log_id', fieldType: 'VARCHAR(32)', comment: '日志ID', isPrimaryKey: true },
                  { fieldName: 'flow_code', fieldType: 'VARCHAR(50)', comment: '流程编码', isPrimaryKey: false },
                  { fieldName: 'business_id', fieldType: 'VARCHAR(32)', comment: '业务ID', isPrimaryKey: false },
                  { fieldName: 'action', fieldType: 'VARCHAR(100)', comment: '操作动作', isPrimaryKey: false },
                  { fieldName: 'create_time', fieldType: 'DATETIME', comment: '创建时间', isPrimaryKey: false }
                ]
              }
            ],
            staticConfigs: [
              {
                configKey: 'flow.log.enabled',
                configValue: 'true',
                description: '是否启用流程日志'
              }
            ]
          }
        }
      ]
    }
  ];

  constructor() { }

  getFlowCharts(): Observable<FlowChart[]> {
    return of(this.mockFlowCharts);
  }

  searchFlowCharts(keyword: string): Observable<FlowChart[]> {
    if (!keyword || keyword.trim() === '') {
      return of(this.mockFlowCharts);
    }
    const lowerKeyword = keyword.toLowerCase().trim();
    const result = this.mockFlowCharts.filter(fc =>
      fc.name.toLowerCase().includes(lowerKeyword) ||
      fc.description.toLowerCase().includes(lowerKeyword)
    );
    return of(result);
  }

  getFlowChartById(id: string): Observable<FlowChart | undefined> {
    const result = this.mockFlowCharts.find(fc => fc.id === id);
    return of(result);
  }
}
