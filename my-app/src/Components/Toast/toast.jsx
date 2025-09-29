import { useEffect, useState } from 'react';
import { FiCheck, FiX, FiInfo, FiAlertCircle, FiShoppingCart } from 'react-icons/fi';

const Toast = ({ message, type = 'info', onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    
    setIsVisible(true);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.max(prev - 3.33, 0)); 
    }, 100);

    
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); 
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return <FiCheck className="w-6 h-6" />;
      case 'error': return <FiX className="w-6 h-6" />;
      case 'warning': return <FiAlertCircle className="w-6 h-6" />;
      case 'cart': return <FiShoppingCart className="w-6 h-6" />;
      default: return <FiInfo className="w-6 h-6" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success': 
        return {
          bg: 'bg-cyan-500',
          border: 'border-cyan-600',
          progress: 'bg-cyan-300',
          iconBg: 'bg-cyan-600'
        };
      case 'error': 
        return {
          bg: 'bg-red-500', 
          border: 'border-red-600',
          progress: 'bg-red-300',
          iconBg: 'bg-red-600'
        };
      case 'warning': 
        return {
          bg: 'bg-orange-500',
          border: 'border-orange-600',
          progress: 'bg-orange-300',
          iconBg: 'bg-orange-600'
        };
      case 'cart':
        return {
          bg: 'bg-purple-500',
          border: 'border-purple-600',
          progress: 'bg-purple-300',
          iconBg: 'bg-purple-600'
        };
      default: 
        return {
          bg: 'bg-blue-500',
          border: 'border-blue-600',
          progress: 'bg-blue-300',
          iconBg: 'bg-blue-600'
        };
    }
  };

  const styles = getStyles();

  return (
    <>
      {/* Backdrop Blur Effect */}
      {isVisible && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300" />
      )}
      
      {/* Toast Container */}
      <div className={`fixed top-15  right-5 z-50 transform transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        <div className={`${styles.bg} text-white p-4 rounded-2xl shadow-2xl border-l-4 ${styles.border} flex items-center space-x-4 min-w-[350px] max-w-md relative overflow-hidden backdrop-blur-lg bg-opacity-90`}>
          
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 h-1 w-full">
            <div 
              className={`h-full ${styles.progress} transition-all duration-100 ease-linear`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Icon with Circle Background */}
          <div className={`${styles.iconBg} p-3 rounded-full flex items-center justify-center`}>
            <div className="animate-bounce-in">
              {getIcon()}
            </div>
          </div>

          {/* Message */}
          <div className="flex-1">
            <span className="font-semibold text-lg block">{message}</span>
          
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="hover:bg-white/20 rounded-full p-2 transition-all duration-200 hover:scale-110"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Toast;