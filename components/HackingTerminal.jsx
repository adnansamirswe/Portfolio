'use client';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function HackingTerminal() {
  const [matrixText, setMatrixText] = useState([]);
  const [showTerminal, setShowTerminal] = useState(false);
  const [ipInfo, setIpInfo] = useState({});
  const [showData, setShowData] = useState(false);

  // Matrix-style characters and digits
  const matrixChars = '0123456789ABCDEFabcdef!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const generateMatrixText = () => {
    let lines = [];
    for (let line = 0; line < 4; line++) {
      let result = '';
      for (let i = 0; i < 20; i++) {
        result += matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
      }
      lines.push(result);
    }
    return lines;
  };

  useEffect(() => {
    // Get IP info and real location data using ipinfo.io
    const getIpInfo = async () => {
      try {
        console.log('Fetching IP info...');
        // First get the IP address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const userIP = ipData.ip;
        
        console.log('Got IP:', userIP);
        
        // Then get location data from ipinfo.io with your token
        try {
          const locationResponse = await fetch(`https://ipinfo.io/${userIP}/json?token=01b09b4db75e75`);
          const locationData = await locationResponse.json();
          
          console.log('Location data:', locationData);
          
          setIpInfo({
            ip: userIP,
            city: locationData.city || 'Unknown',
            region: locationData.region || 'Unknown',
            country: locationData.country || 'Unknown',
            timezone: locationData.timezone || 'UTC',
            // Extract clean ISP name from org field (remove AS number)
            isp: locationData.org ? locationData.org.replace(/^AS\d+\s+/, '') : 'Unknown ISP',
            postal: locationData.postal || 'N/A',
            loc: locationData.loc || '0,0',
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
          });
        } catch (locationError) {
          console.error('Location API failed:', locationError);
          // Fallback to IP only
          setIpInfo({
            ip: userIP,
            city: 'Location Hidden',
            region: 'Protected',
            country: 'Secured',
            timezone: 'Local',
            isp: 'Network Protected',
            postal: 'N/A',
            loc: '0,0',
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
          });
        }
      } catch (error) {
        console.error('IP API failed:', error);
        // Generate realistic looking IP as fallback
        const generateRandomIP = () => {
          return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
        };
        
        setIpInfo({
          ip: generateRandomIP(),
          city: 'Unknown City',
          region: 'Unknown Region',
          country: 'Unknown',
          timezone: 'UTC',
          isp: 'Unknown Network',
          postal: 'N/A',
          loc: '0,0',
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
        });
      }
    };

    getIpInfo();

    // Start the matrix animation after 1 second
    const timer = setTimeout(() => {
      setShowTerminal(true);
      
      // Matrix animation for 3 seconds
      let animationCount = 0;
      const maxAnimations = 15; // 15 cycles of matrix text
      
      const matrixInterval = setInterval(() => {
        setMatrixText(generateMatrixText());
        animationCount++;
        
        if (animationCount >= maxAnimations) {
          clearInterval(matrixInterval);
          setTimeout(() => {
            setShowData(true);
          }, 500);
        }
      }, 200); // Change every 200ms for fast matrix effect
      
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-1 right-4 z-50 hidden lg:block">
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="p-1 min-w-max"
          >
            {/* Matrix Animation - 4 Lines */}
            {!showData && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-1"
              >
                <div className="space-y-0">
                  {matrixText.map((line, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-red-neon text-xs font-mono tracking-wider">
                        {line}
                      </span>
                    </div>
                  ))}
                  <motion.span
                    className="text-red-neon text-xs"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    |
                  </motion.span>
                </div>
              </motion.div>
            )}

            {/* Simplified Data Display */}
            {showData && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-1"
              >
                {/* IP Address */}
                <div className="flex items-center gap-2">
                  <span className="text-white/70 text-xs font-mono">IP:</span>
                  <span className="text-red-neon text-xs font-mono">
                    {ipInfo.ip}
                  </span>
                </div>
                
                {/* Location */}
                <div className="flex items-center gap-2">
                  <span className="text-white/70 text-xs font-mono">LOC:</span>
                  <span className="text-cyan-400 text-xs font-mono">
                    {ipInfo.city}, {ipInfo.country}
                  </span>
                </div>
                
                {/* ISP */}
                <div className="flex items-center gap-2">
                  <span className="text-white/70 text-xs font-mono">ISP:</span>
                  <span className="text-blue-400 text-xs font-mono">
                    {ipInfo.isp}
                  </span>
                </div>
                
                {/* GPS Coordinates */}
                <div className="flex items-center gap-2">
                  <span className="text-white/70 text-xs font-mono">GPS:</span>
                  <span className="text-purple-400 text-xs font-mono">
                    {ipInfo.loc}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
