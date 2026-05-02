import React, { useState } from 'react';
import { Input, Button, Card, Row, Col, message, ConfigProvider } from 'antd';
import { CalculatorOutlined, ReloadOutlined, CloseOutlined } from '@ant-design/icons';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [monthlyRate, setMonthlyRate] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [apr, setApr] = useState('');
  const [loanTerm, setLoanTerm] = useState('');

  const formatNumber = (num) => {
    if (num === '' || num === null || num === undefined) return '';
    const value = parseFloat(num);
    if (isNaN(value)) return '';
    return value.toFixed(2);
  };

  const parseNumber = (str) => {
    if (str === '' || str === null || str === undefined) return null;
    const value = parseFloat(str);
    return isNaN(value) ? null : value;
  };

  const calculate = () => {
    const P = parseNumber(loanAmount);
    const M = parseNumber(monthlyPayment);
    const mr = parseNumber(monthlyRate);
    const ar = parseNumber(annualRate);
    const a = parseNumber(apr);
    const n = parseNumber(loanTerm);

    if (ar !== null && mr === null) {
      setMonthlyRate(formatNumber(ar / 12));
    } else if (mr !== null && ar === null) {
      setAnnualRate(formatNumber(mr * 12));
    }

    if (a !== null && (ar === null || mr === null)) {
      setAnnualRate(formatNumber(a));
      setMonthlyRate(formatNumber(a / 12));
    } else if ((ar !== null || mr !== null) && a === null) {
      const rate = ar !== null ? ar : (mr !== null ? mr * 12 : null);
      if (rate !== null) {
        setApr(formatNumber(rate));
      }
    }

    const currentMr = parseNumber(monthlyRate) || (ar !== null ? ar / 12 : null) || (a !== null ? a / 12 : null);
    const currentN = n;

    if (P !== null && currentMr !== null && currentN !== null && M === null) {
      const r = currentMr / 100;
      const payment = P * (r * Math.pow(1 + r, currentN)) / (Math.pow(1 + r, currentN) - 1);
      setMonthlyPayment(formatNumber(payment));
      message.success('月供计算完成！');
    } else if (M !== null && currentMr !== null && currentN !== null && P === null) {
      const r = currentMr / 100;
      const principal = M * (Math.pow(1 + r, currentN) - 1) / (r * Math.pow(1 + r, currentN));
      setLoanAmount(formatNumber(principal));
      message.success('贷款总额计算完成！');
    } else if (P !== null && M !== null && currentN !== null && currentMr === null) {
      const r = M / P;
      let rate = r;
      for (let i = 0; i < 100; i++) {
        const f = (P * rate * Math.pow(1 + rate, currentN)) / (Math.pow(1 + rate, currentN) - 1) - M;
        const fPrime = (P * Math.pow(1 + rate, currentN) * (rate * currentN * Math.pow(1 + rate, currentN - 1) + Math.pow(1 + rate, currentN) - 1)) / Math.pow(Math.pow(1 + rate, currentN) - 1, 2) - (P * rate * currentN * Math.pow(1 + rate, currentN - 1) * (Math.pow(1 + rate, currentN) - 1)) / Math.pow(Math.pow(1 + rate, currentN) - 1, 2);
        if (Math.abs(f) < 0.0001) break;
        rate = rate - f / fPrime;
      }
      setMonthlyRate(formatNumber(rate * 100));
      setAnnualRate(formatNumber(rate * 1200));
      setApr(formatNumber(rate * 1200));
      message.success('利率计算完成！');
    } else {
      message.warning('请输入足够的参数进行计算。至少需要：贷款总额+利率+期限 或 月供+利率+期限');
    }
  };

  const reset = () => {
    setLoanAmount('');
    setMonthlyPayment('');
    setMonthlyRate('');
    setAnnualRate('');
    setApr('');
    setLoanTerm('');
    message.info('已重置所有输入');
  };

  const closeApp = () => {
    if (window.confirm('确定要关闭程序吗？')) {
      window.close();
    }
  };

  const inputStyle = {
    height: '48px',
    fontSize: '16px',
    background: '#ffffff',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    color: '#1e293b',
    fontWeight: '500',
  };

  const labelStyle = {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '15px',
    marginBottom: '8px',
    display: 'block',
    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
  };

  const cardStyle = {
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    border: '3px solid rgba(99, 102, 241, 0.5)',
    borderRadius: '24px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(99, 102, 241, 0.2)',
  };

  const infoBoxStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '20px',
    backdropFilter: 'blur(10px)',
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: '#ffffff',
          colorTextPlaceholder: '#94a3b8',
          borderRadius: 10,
        },
      }}
    >
      <div 
        className="min-h-screen flex items-center justify-center p-6"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
              animationDuration: '4s',
            }}
          ></div>
          <div 
            className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
              animationDuration: '5s',
              animationDelay: '1s',
            }}
          ></div>
          <div 
            className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
              animationDuration: '6s',
              animationDelay: '2s',
            }}
          ></div>
        </div>

        <Card
          className="relative w-full max-w-4xl"
          style={cardStyle}
          title={
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <h1 
                style={{
                  fontSize: '42px',
                  fontWeight: '800',
                  background: 'linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6, #60a5fa)',
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0 0 8px 0',
                  animation: 'gradient 5s ease infinite',
                  textShadow: 'none',
                }}
              >
                贷款计算器
              </h1>
              <p 
                style={{
                  color: '#e2e8f0',
                  fontSize: '18px',
                  margin: '0',
                  fontWeight: '500',
                }}
              >
                智能金融计算工具
              </p>
            </div>
          }
          headStyle={{
            borderBottom: '3px solid rgba(99, 102, 241, 0.4)',
            padding: '24px 32px',
            background: 'transparent',
          }}
          bodyStyle={{
            padding: '32px',
          }}
        >
          <Row gutter={[24, 28]}>
            <Col xs={24} md={12}>
              <div>
                <label style={labelStyle}>
                  <span style={{ marginRight: '8px' }}>💰</span>
                  贷款总额 (元)
                </label>
                <Input
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="请输入贷款总额，如：100000"
                  prefix="¥"
                  style={{
                    ...inputStyle,
                    borderColor: '#818cf8',
                    boxShadow: '0 0 0 3px rgba(129, 140, 248, 0.2)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#6366f1';
                    e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#818cf8';
                    e.target.style.boxShadow = '0 0 0 3px rgba(129, 140, 248, 0.2)';
                  }}
                />
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div>
                <label style={labelStyle}>
                  <span style={{ marginRight: '8px' }}>📅</span>
                  月供金额 (元)
                </label>
                <Input
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                  placeholder="请输入月供金额，如：3000"
                  prefix="¥"
                  style={{
                    ...inputStyle,
                    borderColor: '#22d3ee',
                    boxShadow: '0 0 0 3px rgba(34, 211, 238, 0.2)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#06b6d4';
                    e.target.style.boxShadow = '0 0 0 4px rgba(6, 182, 212, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#22d3ee';
                    e.target.style.boxShadow = '0 0 0 3px rgba(34, 211, 238, 0.2)';
                  }}
                />
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div>
                <label style={labelStyle}>
                  <span style={{ marginRight: '8px' }}>📊</span>
                  月息 (%)
                </label>
                <Input
                  value={monthlyRate}
                  onChange={(e) => setMonthlyRate(e.target.value)}
                  placeholder="请输入月利率，如：0.5"
                  suffix="%"
                  style={{
                    ...inputStyle,
                    borderColor: '#4ade80',
                    boxShadow: '0 0 0 3px rgba(74, 222, 128, 0.2)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#22c55e';
                    e.target.style.boxShadow = '0 0 0 4px rgba(34, 197, 94, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#4ade80';
                    e.target.style.boxShadow = '0 0 0 3px rgba(74, 222, 128, 0.2)';
                  }}
                />
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div>
                <label style={labelStyle}>
                  <span style={{ marginRight: '8px' }}>📈</span>
                  年息 (%)
                </label>
                <Input
                  value={annualRate}
                  onChange={(e) => setAnnualRate(e.target.value)}
                  placeholder="请输入年利率，如：6.0"
                  suffix="%"
                  style={{
                    ...inputStyle,
                    borderColor: '#facc15',
                    boxShadow: '0 0 0 3px rgba(250, 204, 21, 0.2)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#eab308';
                    e.target.style.boxShadow = '0 0 0 4px rgba(234, 179, 8, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#facc15';
                    e.target.style.boxShadow = '0 0 0 3px rgba(250, 204, 21, 0.2)';
                  }}
                />
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div>
                <label style={labelStyle}>
                  <span style={{ marginRight: '8px' }}>🎯</span>
                  综合年利率 (APR %)
                </label>
                <Input
                  value={apr}
                  onChange={(e) => setApr(e.target.value)}
                  placeholder="请输入综合年利率，如：6.5"
                  suffix="%"
                  style={{
                    ...inputStyle,
                    borderColor: '#f472b6',
                    boxShadow: '0 0 0 3px rgba(244, 114, 182, 0.2)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ec4899';
                    e.target.style.boxShadow = '0 0 0 4px rgba(236, 72, 153, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#f472b6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(244, 114, 182, 0.2)';
                  }}
                />
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div>
                <label style={labelStyle}>
                  <span style={{ marginRight: '8px' }}>⏰</span>
                  贷款期限 (月)
                </label>
                <Input
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  placeholder="请输入贷款期限，如：36"
                  suffix="月"
                  style={{
                    ...inputStyle,
                    borderColor: '#fb923c',
                    boxShadow: '0 0 0 3px rgba(251, 146, 60, 0.2)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#f97316';
                    e.target.style.boxShadow = '0 0 0 4px rgba(249, 115, 22, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#fb923c';
                    e.target.style.boxShadow = '0 0 0 3px rgba(251, 146, 60, 0.2)';
                  }}
                />
              </div>
            </Col>
          </Row>

          <div 
            style={{
              marginTop: '40px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              type="primary"
              size="large"
              icon={<CalculatorOutlined style={{ fontSize: '20px' }} />}
              onClick={calculate}
              style={{
                height: '56px',
                padding: '0 40px',
                fontSize: '18px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                border: 'none',
                borderRadius: '14px',
                boxShadow: '0 8px 25px rgba(99, 102, 241, 0.5), 0 0 20px rgba(99, 102, 241, 0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(99, 102, 241, 0.6), 0 0 30px rgba(99, 102, 241, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.5), 0 0 20px rgba(99, 102, 241, 0.3)';
              }}
            >
              开始计算
            </Button>

            <Button
              size="large"
              icon={<ReloadOutlined style={{ fontSize: '20px' }} />}
              onClick={reset}
              style={{
                height: '56px',
                padding: '0 40px',
                fontSize: '18px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
                border: 'none',
                borderRadius: '14px',
                color: 'white',
                boxShadow: '0 8px 25px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(6, 182, 212, 0.6), 0 0 30px rgba(6, 182, 212, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3)';
              }}
            >
              重置
            </Button>

            <Button
              size="large"
              icon={<CloseOutlined style={{ fontSize: '20px' }} />}
              onClick={closeApp}
              style={{
                height: '56px',
                padding: '0 40px',
                fontSize: '18px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #ef4444 0%, #f43f5e 100%)',
                border: 'none',
                borderRadius: '14px',
                color: 'white',
                boxShadow: '0 8px 25px rgba(239, 68, 68, 0.5), 0 0 20px rgba(239, 68, 68, 0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(239, 68, 68, 0.6), 0 0 30px rgba(239, 68, 68, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.5), 0 0 20px rgba(239, 68, 68, 0.3)';
              }}
            >
              关闭程序
            </Button>
          </div>

          <div style={{ marginTop: '40px', ...infoBoxStyle }}>
            <h3 
              style={{
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '20px',
                margin: '0 0 16px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span>💡</span>
              使用说明
            </h3>
            <ul style={{ 
              color: '#e2e8f0', 
              fontSize: '15px', 
              lineHeight: '2',
              margin: '0',
              paddingLeft: '24px',
              fontWeight: '500',
            }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>计算月供：</strong>输入【贷款总额】、【利率】、【贷款期限】
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>计算贷款总额：</strong>输入【月供金额】、【利率】、【贷款期限】
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>计算利率：</strong>输入【贷款总额】、【月供金额】、【贷款期限】
              </li>
              <li>
                <strong>月息和年息：</strong>输入其中一个，另一个会在计算时自动换算
              </li>
            </ul>
          </div>
        </Card>

        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .ant-input::placeholder {
            color: #94a3b8 !important;
            font-weight: 400;
          }
          
          .ant-input-affix-wrapper .ant-input-prefix,
          .ant-input-affix-wrapper .ant-input-suffix {
            color: #64748b !important;
            font-weight: 600;
          }
          
          .ant-btn-primary:hover,
          .ant-btn-primary:focus {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #9333ea 100%) !important;
          }
        `}</style>
      </div>
    </ConfigProvider>
  );
};

export default LoanCalculator;
