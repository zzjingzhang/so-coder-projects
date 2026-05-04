import { useState, useRef, useEffect } from 'react';
import { Button, Slider, Select, Card, Row, Col, Typography, Space, message } from 'antd';
import { CameraOutlined, ReloadOutlined, ZoomInOutlined, ZoomOutOutlined, RotateLeftOutlined, RotateRightOutlined, ArrowUpOutlined, ArrowDownOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import html2canvas from 'html2canvas';
import './CubeVisualizer.css';

const { Title, Text } = Typography;
const { Option } = Select;

const Cube = ({ position, showLabels, size = 80 }) => {
  const [x, y, z] = position;
  const halfSize = size / 2;
  
  const cubeStyle = {
    transform: `translate3d(${x * size}px, ${-y * size}px, ${z * size}px`,
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div className="cube" style={cubeStyle}>
      <div 
        className="cube-face front" 
        style={{ 
          transform: `translateZ(${halfSize}px)`,
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {showLabels && <span className="face-label">前</span>}
      </div>
      <div 
        className="cube-face back" 
        style={{ 
          transform: `rotateY(180deg) translateZ(${halfSize}px)`,
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {showLabels && <span className="face-label">后</span>}
      </div>
      <div 
        className="cube-face right" 
        style={{ 
          transform: `rotateY(90deg) translateZ(${halfSize}px)`,
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {showLabels && <span className="face-label">右</span>}
      </div>
      <div 
        className="cube-face left" 
        style={{ 
          transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {showLabels && <span className="face-label">左</span>}
      </div>
      <div 
        className="cube-face top" 
        style={{ 
          transform: `rotateX(90deg) translateZ(${halfSize}px)`,
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {showLabels && <span className="face-label">上</span>}
      </div>
      <div 
        className="cube-face bottom" 
        style={{ 
          transform: `rotateX(-90deg) translateZ(${halfSize}px)`,
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {showLabels && <span className="face-label">下</span>}
      </div>
    </div>
  );
};

const OrthographicView = ({ cubes, viewType, cubeSize = 60 }) => {
  const getGridCells = () => {
    const gridSize = 3;
    const cells = [];
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        cells.push({ row: i, col: j, hasCube: false });
      }
    }
    
    cubes.forEach(cube => {
      const [x, y, z] = cube;
      let cellIndex;
      
      switch (viewType) {
        case 'front':
          cellIndex = (2 - y) * 3 + (x + 1);
          break;
        case 'left':
          cellIndex = (2 - y) * 3 + (z + 1);
          break;
        case 'top':
          cellIndex = (z + 1) * 3 + (x + 1);
          break;
        default:
          cellIndex = (2 - y) * 3 + (x + 1);
      }
      
      if (cellIndex >= 0 && cellIndex < 9) {
        cells[cellIndex].hasCube = true;
      }
    });
    
    return cells;
  };

  const cells = getGridCells();
  
  const getViewTitle = () => {
    switch (viewType) {
      case 'front': return '正视图';
      case 'left': return '左视图';
      case 'top': return '俯视图';
      default: return '视图';
    }
  };

  return (
    <Card size="small" className="ortho-view-card">
      <div className="text-center mb-2">
        <Text strong className="text-base">{getViewTitle()}</Text>
      </div>
      <div 
        className="ortho-grid" 
        style={{ 
          gridTemplateColumns: `repeat(3, ${cubeSize}px)`,
          gridTemplateRows: `repeat(3, ${cubeSize}px)`,
        }}
      >
        {cells.map((cell, index) => (
          <div 
            key={index} 
            className={`ortho-cell ${cell.hasCube ? 'filled' : ''}`}
            style={{
              width: `${cubeSize}px`,
              height: `${cubeSize}px`,
            }}
          />
        ))}
      </div>
    </Card>
  );
};

const CubeVisualizer = () => {
  const [rotateX, setRotateX] = useState(-20);
  const [rotateY, setRotateY] = useState(-30);
  const [scale, setScale] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const cubeSize = 80;
  
  const [fixedCubes] = useState([
    [0, 0, 0],
    [1, 0, 0],
    [0, 1, 0],
  ]);
  
  const [movableCube, setMovableCube] = useState([0, 0, 1]);
  
  const sceneRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  
  const allCubes = [...fixedCubes, movableCube];
  
  const moveCube = (direction) => {
    const [x, y, z] = movableCube;
    let newPos;
    
    switch (direction) {
      case 'up':
        newPos = [x, Math.min(y + 1, 2), z];
        break;
      case 'down':
        newPos = [x, Math.max(y - 1, 0), z];
        break;
      case 'left':
        newPos = [Math.max(x - 1, -1), y, z];
        break;
      case 'right':
        newPos = [Math.min(x + 1, 1), y, z];
        break;
      case 'forward':
        newPos = [x, y, Math.max(z - 1, -1)];
        break;
      case 'backward':
        newPos = [x, y, Math.min(z + 1, 1)];
        break;
      default:
        newPos = movableCube;
    }
    
    const isOccupied = fixedCubes.some(cube => 
      cube[0] === newPos[0] && cube[1] === newPos[1] && cube[2] === newPos[2]
    );
    
    if (!isOccupied) {
      setMovableCube(newPos);
    }
  };
  
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    
    setRotateY(prev => prev + deltaX * 0.5);
    setRotateX(prev => Math.max(-90, Math.min(90, prev - deltaY * 0.5)));
    
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  
  const handleReset = () => {
    setRotateX(-20);
    setRotateY(-30);
    setScale(1);
    setMovableCube([0, 0, 1]);
  };
  
  const handleScreenshot = async () => {
    if (!sceneRef.current) return;
    
    try {
      const canvas = await html2canvas(sceneRef.current, {
        backgroundColor: '#f0f5ff',
        scale: 2,
      });
      
      const link = document.createElement('a');
      link.download = `cube-visualizer-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      message.success('截图已保存！');
    } catch (error) {
      message.error('截图失败，请重试');
    }
  };
  
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };
  
  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };
  
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, lastMousePos]);
  
  return (
    <div className="cube-visualizer-container min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-6">
          <Title level={2} className="!text-blue-800 !mb-2">
            立方体观察工具
          </Title>
          <Text className="text-lg text-gray-600">
            帮助学生理解立方体的空间视图和观察角度
          </Text>
        </div>
        
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card 
            className="h-full"
            >
              <div className="flex justify-between items-center mb-4">
                <Title level={4} className="!mb-0">3D 立体视图</Title>
                <Space>
                  <Button 
                    icon={<CameraOutlined />}
                    onClick={handleScreenshot}
                    type="primary"
                  >
                    截图
                  </Button>
                  <Button 
                    icon={<ReloadOutlined />}
                    onClick={handleReset}
                  >
                    重置
                  </Button>
                </Space>
              </div>
              
              <div 
                ref={sceneRef}
                className="scene-container"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              >
                <div 
                className="scene"
                  style={{
                    transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {fixedCubes.map((cube, index) => (
                    <Cube 
                      key={`fixed-${index}`} 
                      position={cube} 
                      showLabels={showLabels}
                      size={cubeSize}
                    />
                  ))}
                  <Cube 
                    key="movable" 
                    position={movableCube} 
                    showLabels={showLabels}
                    size={cubeSize}
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <div className="flex items-center gap-2">
                      <Text className="min-w-16">旋转 X:</Text>
                      <Slider
                        min={-90}
                        max={90}
                        value={rotateX}
                        onChange={setRotateX}
                        className="flex-1"
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div className="flex items-center gap-2">
                      <Text className="min-w-16">旋转 Y:</Text>
                      <Slider
                        min={-180}
                        max={180}
                        value={rotateY}
                        onChange={setRotateY}
                        className="flex-1"
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div className="flex items-center gap-2">
                      <Text className="min-w-16">缩放:</Text>
                      <Slider
                        min={0.5}
                        max={2}
                        step={0.1}
                        value={scale}
                        onChange={setScale}
                        className="flex-1"
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div className="flex items-center justify-end gap-2">
                      <Button icon={<ZoomOutOutlined />} onClick={handleZoomOut} />
                      <Button icon={<ZoomInOutlined />} onClick={handleZoomIn} />
                      <Button 
                        onClick={() => setShowLabels(!showLabels)}
                        type={showLabels ? 'primary' : 'default'}
                      >
                        {showLabels ? '隐藏面标签' : '显示面标签'}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          
          <Col xs={24} lg={8}>
            <Row gutter={[0, 16]}>
              <Col span={24}>
                <Card title="可移动立方体位置调整" size="small">
                  <div className="text-center">
                    <div className="mb-4">
                      <Text strong>上下移动:</Text>
                    </div>
                    <div className="flex justify-center mb-2">
                      <Button 
                        icon={<ArrowUpOutlined />}
                        onClick={() => moveCube('up')}
                        className="w-16"
                      />
                    </div>
                    <div className="flex justify-center mb-4">
                      <Button 
                        icon={<ArrowDownOutlined />}
                        onClick={() => moveCube('down')}
                        className="w-16"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <Text strong>左右移动:</Text>
                    </div>
                    <div className="flex justify-center gap-2 mb-4">
                      <Button 
                        icon={<ArrowLeftOutlined />}
                        onClick={() => moveCube('left')}
                        className="w-16"
                      />
                      <Button 
                        icon={<ArrowRightOutlined />}
                        onClick={() => moveCube('right')}
                        className="w-16"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <Text strong>前后移动:</Text>
                    </div>
                    <div className="flex justify-center gap-2">
                      <Button 
                        icon={<RotateLeftOutlined />}
                        onClick={() => moveCube('forward')}
                        className="w-16"
                      >
                        前
                      </Button>
                      <Button 
                        icon={<RotateRightOutlined />}
                        onClick={() => moveCube('backward')}
                        className="w-16"
                      >
                        后
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>
              
              <Col span={24}>
                <Card title="快速视角切换" size="small">
                  <Row gutter={[8, 8]}>
                    <Col span={12}>
                      <Button 
                        block
                        onClick={() => { setRotateX(0); setRotateY(0); }}
                      >
                        正视图
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button 
                        block
                        onClick={() => { setRotateX(0); setRotateY(-90); }}
                      >
                        左视图
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button 
                        block
                        onClick={() => { setRotateX(-90); setRotateY(0); }}
                      >
                        俯视图
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button 
                        block
                        onClick={() => { setRotateX(-20); setRotateY(-30); }}
                      >
                        默认视角
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
              
              <Col span={24}>
                <Card title="颜色说明" size="small">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded" style={{ backgroundColor: '#ff6b6b' }}></div>
                      <Text>前面 (红色)</Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded" style={{ backgroundColor: '#ffa502' }}></div>
                      <Text>后面 (橙色)</Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded" style={{ backgroundColor: '#2ed573' }}></div>
                      <Text>右面 (绿色)</Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded" style={{ backgroundColor: '#1e90ff' }}></div>
                      <Text>左面 (蓝色)</Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded" style={{ backgroundColor: '#ffd700' }}></div>
                      <Text>上面 (黄色)</Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded" style={{ backgroundColor: '#9b59b6' }}></div>
                      <Text>下面 (紫色)</Text>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        
        <div className="mt-6">
          <Title level={4} className="!mb-4">正交视图</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <OrthographicView cubes={allCubes} viewType="front" />
            </Col>
            <Col xs={24} sm={8}>
              <OrthographicView cubes={allCubes} viewType="left" />
            </Col>
            <Col xs={24} sm={8}>
              <OrthographicView cubes={allCubes} viewType="top" />
            </Col>
          </Row>
        </div>
        
        <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
          <Title level={5} className="!mb-2">使用说明</Title>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>拖动 3D 视图区域可以自由旋转立方体</li>
            <li>使用滑块或按钮可以精确控制旋转角度和缩放比例</li>
            <li>点击"截图"按钮可以保存当前视图为图片</li>
            <li>使用右侧控制面板可以移动其中一个立方体的位置</li>
            <li>正视图、左视图、俯视图会根据立方体位置实时更新</li>
            <li>每个面都有颜色和文字标记，帮助识别前后左右上下</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CubeVisualizer;
