import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, Button, Input, Space, Row, Col, Switch, Divider, message } from 'antd';
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
  DeleteOutlined,
  ScissorOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { decodeFromMorse, encodeToMorse } from '../utils/morseCode';

interface SimpleModeProps {
  settings: {
    dotDuration: number;
    dashDuration: number;
    elementGap: number;
    letterGap: number;
    wordGap: number;
  };
}

const SimpleMode: React.FC<SimpleModeProps> = ({ settings }) => {
  const [inputMorse, setInputMorse] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const [showMorse, setShowMorse] = useState<boolean>(true);
  const [showDecoded, setShowDecoded] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(-1);
  const isPlayingRef = useRef<boolean>(false);

  const decodedText = decodeFromMorse(inputMorse);
  const encodedMorse = encodeToMorse(inputText);

  const addDot = useCallback(() => {
    setInputMorse(prev => (prev ? prev + ' .' : '.'));
  }, []);

  const addDash = useCallback(() => {
    setInputMorse(prev => (prev ? prev + ' -' : '-'));
  }, []);

  const addLetterGap = useCallback(() => {
    setInputMorse(prev => prev + ' ');
  }, []);

  const addWordGap = useCallback(() => {
    setInputMorse(prev => prev + '   ');
  }, []);

  const resetInput = useCallback(() => {
    setInputMorse('');
    setInputText('');
    setIsPlaying(false);
    isPlayingRef.current = false;
    setCurrentCharIndex(-1);
  }, []);

  const playMorseCode = useCallback(async () => {
    const morseToPlay = inputText ? encodeToMorse(inputText) : inputMorse;
    if (!morseToPlay.trim()) {
      message.warning('请先输入摩尔斯电码或文字');
      return;
    }

    setIsPlaying(true);
    isPlayingRef.current = true;
    setCurrentCharIndex(0);

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const playTone = (duration: number) => {
      return new Promise<void>((resolve) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration / 1000);
        
        setTimeout(resolve, duration);
      });
    };

    const wait = (duration: number) => {
      return new Promise<void>((resolve) => setTimeout(resolve, duration));
    };

    const characters = morseToPlay.split('');
    let index = 0;

    while (index < characters.length && isPlayingRef.current) {
      const char = characters[index];
      
      if (char === '.') {
        setCurrentCharIndex(index);
        await playTone(settings.dotDuration);
        await wait(settings.elementGap);
      } else if (char === '-') {
        setCurrentCharIndex(index);
        await playTone(settings.dashDuration);
        await wait(settings.elementGap);
      } else if (char === ' ') {
        if (index + 2 < characters.length && 
            characters[index + 1] === ' ' && 
            characters[index + 2] === ' ') {
          await wait(settings.wordGap);
          index += 2;
        } else {
          await wait(settings.letterGap);
        }
      }
      
      index++;
    }

    setIsPlaying(false);
    isPlayingRef.current = false;
    setCurrentCharIndex(-1);
    audioContext.close();
  }, [inputMorse, inputText, settings]);

  const stopPlaying = useCallback(() => {
    setIsPlaying(false);
    isPlayingRef.current = false;
  }, []);

  useEffect(() => {
    return () => {
      setIsPlaying(false);
    };
  }, []);

  const renderMorseWithHighlight = (morse: string) => {
    return morse.split('').map((char, index) => (
      <span
        key={index}
        className={`font-mono text-2xl tracking-wider transition-colors duration-150 ${
          index === currentCharIndex
            ? 'text-red-500 font-bold scale-125 inline-block'
            : 'text-blue-600 dark:text-blue-400'
        }`}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <Card title="简单模式 - 摩尔斯电码输入练习" className="w-full">
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="摩尔斯电码输入区" size="small" className="h-full">
            <Space direction="vertical" className="w-full" size="large">
              <div>
                <Space wrap size="middle" className="w-full justify-center">
                  <Button
                    type="primary"
                    size="large"
                    icon={<PlayCircleOutlined />}
                    onClick={addDot}
                    disabled={isPlaying}
                    className="h-16 w-28 text-base font-semibold"
                  >
                    点 (.)
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    icon={<PauseCircleOutlined />}
                    onClick={addDash}
                    disabled={isPlaying}
                    className="h-16 w-28 text-base font-semibold bg-orange-500 hover:bg-orange-600 border-orange-500"
                  >
                    划 (-)
                  </Button>
                  <Button
                    size="large"
                    icon={<ScissorOutlined />}
                    onClick={addLetterGap}
                    disabled={isPlaying}
                    className="h-16 w-28 text-base font-semibold"
                  >
                    字母间隔
                  </Button>
                  <Button
                    size="large"
                    icon={<ClockCircleOutlined />}
                    onClick={addWordGap}
                    disabled={isPlaying}
                    className="h-16 w-28 text-base font-semibold"
                  >
                    单词间隔
                  </Button>
                </Space>
              </div>

              <div>
                <h4 className="text-base font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  输入的摩尔斯电码
                </h4>
                <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 min-h-20 bg-gray-50 dark:bg-gray-800">
                  {showMorse && (
                    <div className="break-all">
                      {inputMorse ? renderMorseWithHighlight(inputMorse) : (
                        <span className="text-gray-400 dark:text-gray-500 italic">
                          点击上方按钮输入摩尔斯电码...
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {showDecoded && inputMorse && (
                <div>
                  <h4 className="text-base font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    解码结果
                  </h4>
                  <div className="border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4 min-h-16 bg-blue-50 dark:bg-blue-900/20">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {decodedText || '(无法解码)'}
                    </span>
                  </div>
                </div>
              )}

              <Space className="w-full justify-center">
                <Button
                  type="primary"
                  icon={isPlaying ? <DeleteOutlined /> : <PlayCircleOutlined />}
                  onClick={isPlaying ? stopPlaying : playMorseCode}
                  size="large"
                  className={`h-12 w-32 text-base font-semibold ${
                    isPlaying ? 'bg-red-500 hover:bg-red-600' : ''
                  }`}
                >
                  {isPlaying ? '停止播放' : '播放'}
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={resetInput}
                  size="large"
                  className="h-12 w-24 text-base font-semibold"
                >
                  重置
                </Button>
              </Space>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="文字转摩尔斯电码" size="small">
            <Space direction="vertical" className="w-full" size="large">
              <div>
                <h4 className="text-base font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  输入文字
                </h4>
                <Input.TextArea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value.toUpperCase())}
                  placeholder="请输入字母和数字（自动转换为大写）..."
                  rows={3}
                  disabled={isPlaying}
                  className="text-lg"
                />
              </div>

              {inputText && (
                <div>
                  <h4 className="text-base font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    转换后的摩尔斯电码
                  </h4>
                  <div className="border-2 border-green-200 dark:border-green-800 rounded-lg p-4 min-h-16 bg-green-50 dark:bg-green-900/20">
                    <span className="font-mono text-xl text-green-600 dark:text-green-400 break-all">
                      {encodedMorse}
                    </span>
                  </div>
                </div>
              )}
            </Space>
          </Card>

          <Divider className="my-4" />

          <Card title="显示设置" size="small">
            <Space direction="vertical" className="w-full" size="middle">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  显示输入的摩尔斯电码
                </span>
                <Switch checked={showMorse} onChange={setShowMorse} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  显示解码结果
                </span>
                <Switch checked={showDecoded} onChange={setShowDecoded} />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default SimpleMode;
