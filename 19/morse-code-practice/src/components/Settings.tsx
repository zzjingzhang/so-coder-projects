import React from 'react';
import { Card, Slider, Button, Space, Row, Col, Divider, Descriptions } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import type { MorseSettings } from '../types';
import { DEFAULT_SETTINGS } from '../utils/morseCode';

interface SettingsProps {
  settings: MorseSettings;
  onSettingsChange: (settings: MorseSettings) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, onSettingsChange }) => {
  const handleSliderChange = (key: keyof MorseSettings, value: number) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  const resetToDefaults = () => {
    onSettingsChange(DEFAULT_SETTINGS);
  };

  const formatDuration = (value: number) => `${value}ms`;

  return (
    <Card title="时间设置" className="w-full">
      <Row gutter={[32, 24]}>
        <Col xs={24} lg={12}>
          <Card title="信号持续时间" size="small">
            <Space direction="vertical" className="w-full" size="large">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    点 (Dot) 持续时间
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">
                    {formatDuration(settings.dotDuration)}
                  </span>
                </div>
                <Slider
                  min={100}
                  max={500}
                  step={50}
                  value={settings.dotDuration}
                  onChange={(value) => handleSliderChange('dotDuration', value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  建议: 150-250ms，决定了一个「点」的持续时间
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    划 (Dash) 持续时间
                  </span>
                  <span className="text-orange-600 dark:text-orange-400 font-mono font-bold">
                    {formatDuration(settings.dashDuration)}
                  </span>
                </div>
                <Slider
                  min={300}
                  max={1500}
                  step={100}
                  value={settings.dashDuration}
                  onChange={(value) => handleSliderChange('dashDuration', value)}

                />
                <p className="text-xs text-gray-500 mt-1">
                  建议: 450-750ms，通常是点持续时间的3倍
                </p>
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="间隔时间" size="small">
            <Space direction="vertical" className="w-full" size="large">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    元素间隔 (Element Gap)
                  </span>
                  <span className="text-green-600 dark:text-green-400 font-mono font-bold">
                    {formatDuration(settings.elementGap)}
                  </span>
                </div>
                <Slider
                  min={100}
                  max={500}
                  step={50}
                  value={settings.elementGap}
                  onChange={(value) => handleSliderChange('elementGap', value)}

                />
                <p className="text-xs text-gray-500 mt-1">
                  点和划之间的间隔，通常与点的持续时间相同
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    字母间隔 (Letter Gap)
                  </span>
                  <span className="text-purple-600 dark:text-purple-400 font-mono font-bold">
                    {formatDuration(settings.letterGap)}
                  </span>
                </div>
                <Slider
                  min={300}
                  max={1500}
                  step={100}
                  value={settings.letterGap}
                  onChange={(value) => handleSliderChange('letterGap', value)}

                />
                <p className="text-xs text-gray-500 mt-1">
                  字母之间的间隔，通常是点持续时间的3倍
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    单词间隔 (Word Gap)
                  </span>
                  <span className="text-red-600 dark:text-red-400 font-mono font-bold">
                    {formatDuration(settings.wordGap)}
                  </span>
                </div>
                <Slider
                  min={1000}
                  max={3000}
                  step={200}
                  value={settings.wordGap}
                  onChange={(value) => handleSliderChange('wordGap', value)}

                />
                <p className="text-xs text-gray-500 mt-1">
                  单词之间的间隔，通常是点持续时间的7倍
                </p>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Divider className="my-6" />

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card title="当前设置概览" size="small">
            <Descriptions column={2} size="small">
              <Descriptions.Item label="点持续时间">
                <span className="text-blue-600 font-mono">{settings.dotDuration}ms</span>
              </Descriptions.Item>
              <Descriptions.Item label="划持续时间">
                <span className="text-orange-600 font-mono">{settings.dashDuration}ms</span>
              </Descriptions.Item>
              <Descriptions.Item label="元素间隔">
                <span className="text-green-600 font-mono">{settings.elementGap}ms</span>
              </Descriptions.Item>
              <Descriptions.Item label="字母间隔">
                <span className="text-purple-600 font-mono">{settings.letterGap}ms</span>
              </Descriptions.Item>
              <Descriptions.Item label="单词间隔" span={2}>
                <span className="text-red-600 font-mono">{settings.wordGap}ms</span>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="操作" size="small">
            <Space direction="vertical" className="w-full" size="middle">
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                onClick={resetToDefaults}
                size="large"
                className="w-full h-12 text-base font-semibold"
              >
                恢复默认设置
              </Button>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  默认设置值:
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 点: 200ms</li>
                  <li>• 划: 600ms (3倍点)</li>
                  <li>• 元素间隔: 200ms</li>
                  <li>• 字母间隔: 600ms (3倍点)</li>
                  <li>• 单词间隔: 1400ms (7倍点)</li>
                </ul>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Divider className="my-6" />

      <Card title="摩尔斯电码时间规则" size="small">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
              ⏱️ 标准时间比例
            </h4>
            <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
              <li>• 点 (Dot) = 1 个时间单位</li>
              <li>• 划 (Dash) = 3 个时间单位</li>
              <li>• 点/划之间间隔 = 1 个时间单位</li>
              <li>• 字母之间间隔 = 3 个时间单位</li>
              <li>• 单词之间间隔 = 7 个时间单位</li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
              💡 调整建议
            </h4>
            <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
              <li>• 初学者: 增加时间间隔，更容易操作</li>
              <li>• 进阶者: 缩短时间，提高反应速度</li>
              <li>• 保持比例: 划是点的3倍，单词间隔是7倍</li>
              <li>• 根据孩子的学习速度灵活调整</li>
            </ul>
          </div>
        </div>
      </Card>
    </Card>
  );
};

export default Settings;
