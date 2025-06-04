'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface UserInfo {
  ip: string;
  device: string;
  browser: string;
  os: string;
  screenSize: string;
  language: string;
  timezone: string;
  gpu: string;
  platform: string;
  cookiesEnabled: string;
  onlineStatus: string;
}

const containerVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      when: "beforeChildren",
      staggerChildren: 0.15
    }
  }
};

const sectionVariants = {
  hidden: { 
    opacity: 0,
    x: -20,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    x: -10,
    y: 10
  },
  visible: { 
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export const Gort = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    ip: '',
    device: '',
    browser: '',
    os: '',
    screenSize: '',
    language: '',
    timezone: '',
    gpu: '',
    platform: '',
    cookiesEnabled: '',
    onlineStatus: ''
  });
  const ref = useRef(null)

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        setUserInfo(prev => ({ ...prev, ip: data.ip }));
      })
      .catch(() => {
        setUserInfo(prev => ({ ...prev, ip: 'Unable to fetch IP' }));
      });

    const ua = navigator.userAgent;
    const browser = getBrowserInfo(ua);
    const os = getOSInfo(ua);
    const device = getDeviceInfo(ua);
    const screenSize = `${window.screen.width}x${window.screen.height}`;
    const language = navigator.language;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const platform = navigator.platform;
    const cookiesEnabled = navigator.cookieEnabled ? 'Enabled' : 'Disabled';
    const onlineStatus = navigator.onLine ? 'Online' : 'Offline';
    const gpu = getGPUInfo();

    setUserInfo(prev => ({
      ...prev,
      browser,
      os,
      device,
      screenSize,
      language,
      timezone,
      platform,
      cookiesEnabled,
      onlineStatus,
      gpu
    }));
  }, []);

  const getBrowserInfo = (ua: string): string => {
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Unknown Browser';
  };

  const getOSInfo = (ua: string): string => {
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Mac')) return 'MacOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
    return 'Unknown OS';
  };

  const getDeviceInfo = (ua: string): string => {
    if (ua.includes('Mobile')) return 'Mobile';
    if (ua.includes('Tablet')) return 'Tablet';
    return 'Desktop';
  };

  const getGPUInfo = (): string => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    if (!gl) return 'Unknown';
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return 'Unknown';
    
    return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'Unknown';
  };

  return (
    <div ref={ref} className="min-h-screen w-full flex flex-col items-center justify-center py-8 md:py-16 px-4 md:px-8 overflow-x-hidden">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-5xl p-4 sm:p-6 bg-purple-900/20 border-2 border-purple-500 rounded-xl backdrop-blur-sm mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <motion.div variants={sectionVariants} className="flex flex-col items-center lg:w-1/3 lg:sticky lg:top-4">
            <motion.img
              src="/gort.png"
              alt="Gort the Capybara"
              className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mb-4"
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              whileHover={{ scale: 1.05, rotate: 5, transition: { duration: 0.3 }}}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <motion.h2 
              className="text-xl sm:text-2xl font-bold text-purple-300 mb-2"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Meet Gort!
            </motion.h2>
            <p className="text-base sm:text-lg text-zinc-400 text-center px-4 lg:px-0">
              This is Gort, he wants to be a hacker. Here&apos;s what he found out about you:
            </p>
          </motion.div>

          <motion.div variants={sectionVariants} className="lg:w-2/3 space-y-4 sm:space-y-6">
            <motion.div variants={sectionVariants}>
              <motion.h3 
                className="text-base sm:text-lg font-semibold text-purple-300 mb-2"
                whileHover={{ scale: 1.02, x: 5, textShadow: "0 0 8px rgb(139, 92, 246)" }}
                transition={{ duration: 0.2 }}
              >
                🌐 Network Details
              </motion.h3>
              <div className="space-y-1 sm:space-y-2">
                <InfoItem label="IP Address" value={userInfo.ip} />
                <InfoItem label="Status" value={userInfo.onlineStatus} />
              </div>
            </motion.div>

            <motion.div variants={sectionVariants}>
              <h3 className="text-base sm:text-lg font-semibold text-purple-300 mb-2">
                💻 Your Device
              </h3>
              <div className="space-y-1 sm:space-y-2">
                <InfoItem label="Type" value={userInfo.device} />
                <InfoItem label="Platform" value={userInfo.platform} />
                <InfoItem label="OS" value={userInfo.os} />
                <InfoItem label="Screen" value={userInfo.screenSize} />
                <InfoItem label="GPU" value={userInfo.gpu} />
              </div>
            </motion.div>

            <motion.div variants={sectionVariants}>
              <h3 className="text-base sm:text-lg font-semibold text-purple-300 mb-2">
                🌐 Browser Info
              </h3>
              <div className="space-y-1 sm:space-y-2">
                <InfoItem label="Name" value={userInfo.browser} />
                <InfoItem label="Language" value={userInfo.language} />
                <InfoItem label="Cookies" value={userInfo.cookiesEnabled} />
              </div>
            </motion.div>

            <motion.div variants={sectionVariants}>
              <h3 className="text-base sm:text-lg font-semibold text-purple-300 mb-2">
                📍 Location
              </h3>
              <div className="space-y-1 sm:space-y-2">
                <InfoItem label="Timezone" value={userInfo.timezone} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <motion.div 
    variants={itemVariants}
    className="flex justify-between items-center py-1 sm:py-1.5 px-2 rounded-lg"
    whileHover={{ x: 5, backgroundColor: "rgba(139, 92, 246, 0.1)", scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.2 }}
  >
    <span className="text-sm sm:text-base text-zinc-400">{label}:</span>
    <motion.span className="text-sm sm:text-base text-purple-300 font-medium ml-4" whileHover={{ color: "#C4B5FD" }}>
      {value || 'N/A'}
    </motion.span>
  </motion.div>
);



