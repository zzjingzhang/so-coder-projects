import React, { useState } from 'react';

interface WaveInputProps {
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const WaveInput: React.FC<WaveInputProps> = ({ type, label, value, onChange, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const renderLabel = () => {
    const letters = label.split('');
    return letters.map((letter, index) => (
      <span
        key={index}
        className="inline-block"
        style={{
          animationDelay: `${index * 60}ms`,
          animation: isActive ? `waveLetter 0.6s ease-out ${index * 60}ms forwards` : 'none',
          transform: isActive ? 'translateY(-6px)' : 'translateY(0)',
          color: isActive ? '#8b5cf6' : '#64748b',
          transition: 'transform 0.3s ease, color 0.3s ease',
        }}
      >
        {letter === ' ' ? '\u00A0' : letter}
      </span>
    ));
  };

  return (
    <div className="relative mb-6">
      <div
        className="absolute left-4 transition-all duration-300 pointer-events-none"
        style={{
          top: isActive ? '8px' : '50%',
          transform: isActive ? 'translateY(0)' : 'translateY(-50%)',
          fontSize: isActive ? '11px' : '15px',
        }}
      >
        {renderLabel()}
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={isActive ? placeholder : ''}
        className={`w-full px-4 text-base text-gray-800 bg-white border-2 rounded-lg outline-none transition-all duration-300 ${
          isFocused
            ? 'border-purple-500 shadow-lg shadow-purple-100'
            : 'border-gray-200 hover:border-gray-300'
        }`}
        style={{
          paddingTop: isActive ? '28px' : '16px',
          paddingBottom: isActive ? '8px' : '16px',
        }}
      />
    </div>
  );
};

export default WaveInput;
