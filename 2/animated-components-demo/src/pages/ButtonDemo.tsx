import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Page from '../components/Page';
import AnimatedButton from '../components/AnimatedButton';
import type { ButtonState } from '../components/AnimatedButton';
import LogoTitle from '../components/LogoTitle';

const ButtonDemo: React.FC = () => {
  const [button1State, setButton1State] = useState<ButtonState>('idle');
  const [button2State, setButton2State] = useState<ButtonState>('idle');

  const simulateAsyncOperation = (
    setState: React.Dispatch<React.SetStateAction<ButtonState>>,
    shouldSucceed: boolean = true
  ) => {
    setState('loading');
    setTimeout(() => {
      setState(shouldSucceed ? 'success' : 'error');
      setTimeout(() => {
        setState('idle');
      }, 2000);
    }, 1500);
  };

  const stateCards = [
    {
      state: 'idle' as ButtonState,
      title: 'Idle State',
      description: 'The default state of the button, ready for interaction',
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      textColor: 'text-indigo-700',
    },
    {
      state: 'loading' as ButtonState,
      title: 'Loading State',
      description: 'Shows a spinner animation while waiting for an operation to complete',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
    },
    {
      state: 'success' as ButtonState,
      title: 'Success State',
      description: 'Displays a checkmark with scale animation when operation succeeds',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700',
    },
    {
      state: 'error' as ButtonState,
      title: 'Error State',
      description: 'Shakes with an X icon when an operation fails',
      color: 'from-rose-500 to-pink-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      textColor: 'text-rose-700',
    },
  ];

  return (
    <Page title="Button States">
      <div className="space-y-8">
        <LogoTitle
          title="Interactive Button States"
          subtitle="Experience smooth transitions between idle, loading, success, and error states"
          size="md"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">Success Path</h3>
            <p className="text-sm text-gray-500 mb-4">
              Click to see the button go through loading → success → idle states
            </p>
            <div className="flex items-center gap-4">
              <AnimatedButton
                state={button1State}
                onClick={() => simulateAsyncOperation(setButton1State, true)}
                loadingText="Processing..."
                successText="Done!"
              >
                Click Me
              </AnimatedButton>
              <span className="text-sm text-gray-400">
                Current: <span className="font-medium text-gray-600">{button1State}</span>
              </span>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">Error Path</h3>
            <p className="text-sm text-gray-500 mb-4">
              Click to see the button go through loading → error → idle states
            </p>
            <div className="flex items-center gap-4">
              <AnimatedButton
                state={button2State}
                onClick={() => simulateAsyncOperation(setButton2State, false)}
                loadingText="Processing..."
                errorText="Failed!"
              >
                Try Error
              </AnimatedButton>
              <span className="text-sm text-gray-400">
                Current: <span className="font-medium text-gray-600">{button2State}</span>
              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">All States Preview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stateCards.map((card, index) => (
              <motion.div
                key={card.state}
                className={`${card.bgColor} ${card.borderColor} border rounded-2xl p-5`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className={`font-bold ${card.textColor}`}>{card.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{card.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {card.state === 'idle' && (
                      <AnimatedButton state="idle" onClick={() => {}}>
                        Idle
                      </AnimatedButton>
                    )}
                    {card.state === 'loading' && (
                      <AnimatedButton state="loading" onClick={() => {}}>
                        Loading
                      </AnimatedButton>
                    )}
                    {card.state === 'success' && (
                      <AnimatedButton state="success" onClick={() => {}}>
                        Success
                      </AnimatedButton>
                    )}
                    {card.state === 'error' && (
                      <AnimatedButton state="error" onClick={() => {}}>
                        Error
                      </AnimatedButton>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Animation Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Color Transition</h4>
                <p className="text-sm text-gray-500">Smooth background color changes between states</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Scale Animation</h4>
                <p className="text-sm text-gray-500">Icon scale with spring animation on success</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-rose-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Shake Effect</h4>
                <p className="text-sm text-gray-500">Horizontal shake animation on error state</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Page>
  );
};

export default ButtonDemo;
