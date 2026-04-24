import { useState, useCallback } from 'react';
import Papa from 'papaparse';
import { Select } from 'antd';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './App.css';

type ChartType = 'line' | 'bar' | 'scatter';

interface DataPoint {
  [key: string]: string | number;
}

function App() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [chartType, setChartType] = useState<ChartType>('line');
  const [xAxis, setXAxis] = useState<string>('');
  const [yAxis, setYAxis] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>('');

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data as DataPoint[];
        
        const validData = parsedData.filter((row) => {
          const values = Object.values(row);
          return values.some((value) => value !== null && value !== undefined && value !== '');
        });
        
        const allColumns = validData.length > 0 ? Object.keys(validData[0] || {}) : [];
        
        setData(validData);
        setColumns(allColumns);
        setXAxis(allColumns[0] || '');
        setYAxis(allColumns.length > 1 ? [allColumns[1]] : []);
      },
    });
  }, []);

  const handleYAxisChange = useCallback((column: string) => {
    setYAxis((prev) => {
      if (prev.includes(column)) {
        return prev.filter((c) => c !== column);
      } else {
        return [...prev, column];
      }
    });
  }, []);

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe', '#00C49F'];

  const renderChart = () => {
    if (!data.length || !xAxis || !yAxis.length) {
      return (
        <div className="chart-placeholder">
          <h3>请先上传 CSV 文件并选择坐标轴</h3>
          <p>支持的 CSV 格式：第一行为表头，后续行为数据</p>
        </div>
      );
    }

    const filteredData = data.filter((row) => {
      const xValue = row[xAxis];
      if (xValue === null || xValue === undefined || xValue === '') {
        return false;
      }
      
      const hasValidYValue = yAxis.some((y) => {
        const yValue = row[y];
        return yValue !== null && yValue !== undefined && yValue !== '';
      });
      
      return hasValidYValue;
    });

    if (!filteredData.length) {
      return (
        <div className="chart-placeholder">
          <h3>没有有效的数据可以显示</h3>
          <p>请检查您的 CSV 文件是否包含有效的数据点</p>
        </div>
      );
    }

    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} />
              <YAxis />
              <Tooltip />
              <Legend />
              {yAxis.map((y, index) => (
                <Line
                  key={y}
                  type="monotone"
                  dataKey={y}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  connectNulls={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} />
              <YAxis />
              <Tooltip />
              <Legend />
              {yAxis.map((y, index) => (
                <Bar
                  key={y}
                  dataKey={y}
                  fill={colors[index % colors.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      case 'scatter':
        if (yAxis.length === 0) return null;
        const yValue = yAxis[0];
        const scatterData = filteredData.filter((row) => {
          const yVal = row[yValue];
          return yVal !== null && yVal !== undefined && yVal !== '';
        });
        
        if (!scatterData.length) {
          return (
            <div className="chart-placeholder">
              <h3>没有有效的散点图数据</h3>
              <p>请确保 X 轴和 Y 轴数据都包含有效值</p>
            </div>
          );
        }
        
        return (
          <ResponsiveContainer width="100%" height={500}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} name={xAxis} />
              <YAxis dataKey={yValue} name={yValue} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              <Scatter
                name={`${xAxis} vs ${yValue}`}
                data={scatterData}
                fill={colors[0]}
              />
            </ScatterChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>CSV 数据可视化工具</h1>
        <p>上传 CSV 文件，选择图表类型，实时生成交互式图表</p>
      </header>

      <main className="app-main">
        <section className="upload-section">
          <div className="upload-area">
            <label htmlFor="file-upload" className="upload-label">
              <span className="upload-icon">📁</span>
              <span className="upload-text">
                {fileName ? `已选择: ${fileName}` : '点击或拖拽上传 CSV 文件'}
              </span>
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="file-input"
            />
          </div>
        </section>

        {data.length > 0 && (
          <section className="controls-section">
            <div className="control-group">
              <label className="control-label">图表类型:</label>
              <Select
                value={chartType}
                onChange={(value) => {
                  setChartType(value as ChartType);
                  if (value === 'scatter' && yAxis.length > 1) {
                    setYAxis([yAxis[0]]);
                  }
                }}
                style={{ width: '100%' }}
                size="large"
                options={[
                  { value: 'line', label: '📈 折线图' },
                  { value: 'bar', label: '📊 柱状图' },
                  { value: 'scatter', label: '⚬ 散点图' },
                ]}
              />
            </div>

            <div className="control-group">
              <label className="control-label">X 轴数据:</label>
              <Select
                value={xAxis}
                onChange={(value) => setXAxis(value)}
                style={{ width: '100%' }}
                size="large"
                options={columns.map((col) => ({ value: col, label: col }))}
              />
            </div>

            <div className="control-group">
              <label className="control-label">
                Y 轴数据 {chartType === 'scatter' ? '(单选)' : '(可多选)'}:
              </label>
              <Select
                value={chartType === 'scatter' ? (yAxis[0] || undefined) : yAxis}
                onChange={(value) => {
                  if (chartType === 'scatter') {
                    setYAxis(value ? [value as string] : []);
                  } else {
                    setYAxis(value as string[]);
                  }
                }}
                mode={chartType === 'scatter' ? undefined : 'multiple'}
                placeholder="请选择 Y 轴数据"
                style={{ width: '100%' }}
                size="large"
                maxTagCount="responsive"
                allowClear
                options={columns
                  .filter((col) => col !== xAxis)
                  .map((col) => ({ value: col, label: col }))}
              />
            </div>
          </section>
        )}

        <section className="chart-section">
          {data.length > 0 ? (
            <div className="chart-container">
              {renderChart()}
            </div>
          ) : (
            <div className="welcome-message">
              <h2>欢迎使用 CSV 数据可视化工具</h2>
              <p>上传您的 CSV 文件开始探索数据</p>
              <div className="example-info">
                <h3>示例 CSV 格式:</h3>
                <pre>
月份,销售额,利润,订单数
一月,12000,3000,150
二月,15000,4500,180
三月,18000,5400,220
四月,14000,4200,170
五月,16000,4800,200
                </pre>
              </div>
            </div>
          )}
        </section>

        {data.length > 0 && (
          <section className="data-preview-section">
            <h3>数据预览 (前 10 行)</h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    {columns.map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 10).map((row, index) => (
                    <tr key={index}>
                      {columns.map((col) => (
                        <td key={col}>{String(row[col])}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="data-count">共 {data.length} 行数据，{columns.length} 列</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
