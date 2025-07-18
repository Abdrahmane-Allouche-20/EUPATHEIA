import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ 
  size = 'md', 
  text = '', 
  fullScreen = false 
}) => {
  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center'
    : 'flex items-center justify-center';

  return (
    <div className={containerClasses}>
      <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-green-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
};

// Alternative minimal loading component
export const SimpleLoading: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Button loading state
export const ButtonLoading: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => (
  <div className="flex items-center space-x-2">
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
    <span>{text}</span>
  </div>
);

export default Loading;