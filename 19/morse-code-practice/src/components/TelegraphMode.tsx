import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, Button, Space, Row, Col, Switch, Divider, Tag, message } from 'antd';
import {
  ReloadOutlined,
  SoundOutlined,
  PauseCircleOutlined,
} from '@ant-design/icons';
import { decodeFromMorse, isDot } from '../utils/morseCode';
import type { MorseSettings } from '../types';

interface TelegraphModeProps {
  settings: MorseSettings;
}

const TelegraphMode: React.FC<TelegraphModeProps> = ({ settings }) => {
  const [inputMorse, setInputMorse] = useState<string>('');
  const [currentLetterMorse, setCurrentLetterMorse] = useState<string>('');
  const [isKeyPressed, setIsKeyPressed] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showMorse, setShowMorse] = useState<boolean>(true);
  const [showDecoded, setShowDecoded] = useState<boolean>(true);
  const [isSignalActive, setIsSignalActive] = useState<boolean>(false);

  const pressStartTime = useRef<number>(0);
  const releaseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const startTone = useCallback(() => {
    const audioContext = initAudioContext();
    
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
    }

    oscillatorRef.current = audioContext.createOscillator();
    gainNodeRef.current = audioContext.createGain();
    
    oscillatorRef.current.connect(gainNodeRef.current);
    gainNodeRef.current.connect(audioContext.destination);
    
    oscillatorRef.current.frequency.value = 800;
    oscillatorRef.current.type = 'sine';
    
    gainNodeRef.current.gain.setValueAtTime(0.5, audioContext.currentTime);
    
    oscillatorRef.current.start();
    setIsSignalActive(true);
  }, [initAudioContext]);

  const stopTone = useCallback(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.exponentialRampToValueAtTime(
        0.01,
        audioContextRef.current.currentTime + 0.1
      );
    }
    
    setTimeout(() => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
        gainNodeRef.current = null;
      }
      setIsSignalActive(false);
    }, 100);
  }, []);

  const clearReleaseTimeout = useCallback(() => {
    if (releaseTimeout.current) {
      clearTimeout(releaseTimeout.current);
      releaseTimeout.current = null;
    }
  }, []);

  const handleKeyDown = useCallback(() => {
    if (isPlaying) return;
    
    clearReleaseTimeout();
    pressStartTime.current = Date.now();
    setIsKeyPressed(true);
    startTone();
  }, [isPlaying, clearReleaseTimeout, startTone]);

  const handleKeyUp = useCallback(() => {
    if (isPlaying) return;
    
    const duration = Date.now() - pressStartTime.current;
    setIsKeyPressed(false);
    stopTone();

    if (isDot(duration, settings)) {
      setCurrentLetterMorse(prev => prev + '.');
    } else {
      setCurrentLetterMorse(prev => prev + '-');
    }

    clearReleaseTimeout();
    releaseTimeout.current = setTimeout(() => {
      if (currentLetterMorse) {
        setInputMorse(prev => (prev ? prev + ' ' + currentLetterMorse : currentLetterMorse));
        setCurrentLetterMorse('');
      }
    }, settings.letterGap);
  }, [isPlaying, settings, stopTone, clearReleaseTimeout, currentLetterMorse]);

  const addWordGap = useCallback(() => {
    if (isPlaying) return;
    
    clearReleaseTimeout();
    
    if (currentLetterMorse) {
      setInputMorse(prev => (prev ? prev + ' ' + currentLetterMorse + '   ' : currentLetterMorse + '   '));
      setCurrentLetterMorse('');
    } else if (inputMorse) {
      setInputMorse(prev => prev + '   ');
    }
  }, [isPlaying, currentLetterMorse, inputMorse, clearReleaseTimeout]);

  const resetInput = useCallback(() => {
    setInputMorse('');
    setCurrentLetterMorse('');
    setIsPlaying(false);
    clearReleaseTimeout();
    stopTone();
  }, [clearReleaseTimeout, stopTone]);

  const playMorseCode = useCallback(async () => {
    const fullMorse = inputMorse + (currentLetterMorse ? ' ' + currentLetterMorse : '');
    if (!fullMorse.trim()) {
      message.warning('请先使用电报键输入摩尔斯电码');
      return;
    }

    setIsPlaying(true);
    const audioContext = initAudioContext();
    
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

    const characters = fullMorse.split('');
    let index = 0;

    while (index < characters.length && isPlaying) {
      const char = characters[index];
      
      if (char === '.') {
        setIsSignalActive(true);
        await playTone(settings.dotDuration);
        setIsSignalActive(false);
        await wait(settings.elementGap);
      } else if (char === '-') {
        setIsSignalActive(true);
        await playTone(settings.dashDuration);
        setIsSignalActive(false);
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
    setIsSignalActive(false);
  }, [inputMorse, currentLetterMorse, settings, isPlaying, initAudioContext]);

  const stopPlaying = useCallback(() => {
    setIsPlaying(false);
    setIsSignalActive(false);
  }, []);

  useEffect(() => {
    return () => {
      clearReleaseTimeout();
      stopTone();
      setIsPlaying(false);
    };
  }, [clearReleaseTimeout, stopTone]);

  const fullMorseCode = inputMorse + (currentLetterMorse ? ' ' + currentLetterMorse : '');
  const decodedText = decodeFromMorse(fullMorseCode);

  return (
    <Card title="电报机模拟模式 - 体验真实的电报操作" className="w-full">
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="电报机操作区" size="small" className="h-full">
            <Space direction="vertical" className="w-full" size="large">
              <div className="flex flex-col items-center">
                <div className="mb-6">
                  <Tag color={isSignalActive ? 'success' : 'default'} className="text-base px-4 py-1">
                    {isSignalActive ? '🔊 信号发送中' : '📻 待机状态'}
                  </Tag>
                </div>

                <div className="relative">
                  <div 
                    className={`w-64 h-40 rounded-lg flex items-center justify-center transition-all duration-100 cursor-pointer select-none
                      ${isKeyPressed 
                        ? 'bg-gray-800 shadow-inner border-4 border-gray-600' 
                        : 'bg-gray-600 shadow-lg border-4 border-gray-500 hover:bg-gray-500'
                      }`}
                    onMouseDown={handleKeyDown}
                    onMouseUp={handleKeyUp}
                    onMouseLeave={() => isKeyPressed && handleKeyUp()}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      handleKeyDown();
                    }}
                    onTouchEnd={handleKeyUp}
                  >
                    <div className="text-center">
                      <div className={`text-6xl mb-2 ${isKeyPressed ? 'text-yellow-400' : 'text-gray-300'}`}>
                        {isKeyPressed ? '⚡' : '🔘'}
                      </div>
                      <div className={`text-lg font-bold ${isKeyPressed ? 'text-yellow-400' : 'text-gray-300'}`}>
                        {isKeyPressed ? '按住中...' : '按住发送'}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        短按 = 点 (·) | 长按 = 划 (—)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-75 ${
                        isKeyPressed ? 'bg-green-500' : 'bg-transparent'
                      }`}
                      style={{ 
                        width: isKeyPressed 
                          ? `${Math.min(100, ((Date.now() - pressStartTime.current) / settings.dotDuration) * 100)}%` 
                          : '0%' 
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>点阈值 ({settings.dotDuration}ms)</span>
                    <span>划阈值 ({settings.dashDuration}ms)</span>
                  </div>
                </div>

                <Space wrap className="w-full justify-center">
                  <Button
                    icon={<SoundOutlined />}
                    onClick={addWordGap}
                    disabled={isPlaying || isKeyPressed}
                    size="large"
                    className="h-12 w-36 text-base font-semibold"
                  >
                    单词间隔
                  </Button>
                  <Button
                    type="primary"
                    icon={isPlaying ? <PauseCircleOutlined /> : <SoundOutlined />}
                    onClick={isPlaying ? stopPlaying : playMorseCode}
                    size="large"
                    className={`h-12 w-28 text-base font-semibold ${
                      isPlaying ? 'bg-red-500 hover:bg-red-600' : ''
                    }`}
                  >
                    {isPlaying ? '停止' : '播放'}
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
              </div>

              <div>
                <h4 className="text-base font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  当前输入的摩尔斯电码
                </h4>
                <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 min-h-24 bg-gray-50 dark:bg-gray-800">
                  {showMorse && (
                    <div className="break-all">
                      {fullMorseCode ? (
                        <span className="font-mono text-2xl text-blue-600 dark:text-blue-400 tracking-wider">
                          {fullMorseCode.split('').map((char, index) => (
                            <span
                              key={index}
                              className={char === ' ' ? 'inline-block w-2' : ''}
                            >
                              {char}
                            </span>
                          ))}
                        </span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 italic">
                          按住电报键输入摩尔斯电码...
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {currentLetterMorse && (
                  <div className="mt-2 text-center">
                    <Tag color="orange" className="text-base px-3 py-1">
                      当前字母: <span className="font-mono font-bold">{currentLetterMorse}</span>
                    </Tag>
                  </div>
                )}
              </div>

              {showDecoded && fullMorseCode && (
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
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="操作说明" size="small">
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">📻 电报机操作方式</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>按住</strong>电报键发送信号</li>
                  <li>• <strong>短按</strong>（快速按下并松开）= 点 (·)</li>
                  <li>• <strong>长按</strong>（按住稍长时间）= 划 (—)</li>
                  <li>• 松开后会自动等待判断是否完成一个字母</li>
                  <li>• 点击「单词间隔」按钮分隔单词</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-lg mb-2 text-blue-700 dark:text-blue-300">⏱️ 当前时间设置</h4>
                <ul className="space-y-1 text-sm text-blue-600 dark:text-blue-400">
                  <li>• 点持续时间: {settings.dotDuration}ms</li>
                  <li>• 划持续时间: {settings.dashDuration}ms</li>
                  <li>• 元素间隔: {settings.elementGap}ms</li>
                  <li>• 字母间隔: {settings.letterGap}ms</li>
                  <li>• 单词间隔: {settings.wordGap}ms</li>
                </ul>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <h4 className="font-semibold text-lg mb-2 text-orange-700 dark:text-orange-300">💡 小技巧</h4>
                <ul className="space-y-1 text-sm text-orange-600 dark:text-orange-400">
                  <li>• 进度条可以帮助你判断按下的时间</li>
                  <li>• 超过点阈值后松开就是「划」</li>
                  <li>• 松开后会自动等待字母间隔时间</li>
                  <li>• 在设置页面可以调整时间参数</li>
                </ul>
              </div>
            </div>
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

export default TelegraphMode;
