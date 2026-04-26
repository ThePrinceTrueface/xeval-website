import { motion } from 'motion/react';

export const RubyLogo = ({ className = "w-48 h-48", animated = true, rotate = 0, fadeBottom = false, opacity = 1 }: { className?: string; animated?: boolean; rotate?: number; fadeBottom?: boolean; opacity?: number }) => {
  const glowVariants = {
    animate: { 
      scale: [1, 1.15, 1],
      opacity: [0.2, 0.4, 0.2]
    }
  };

  const logoVariants = {
    animate: { 
      y: [0, -12, 0],
      filter: [
        'drop-shadow(0 0 10px rgba(34, 197, 94, 0.2))',
        'drop-shadow(0 0 25px rgba(34, 197, 94, 0.5))',
        'drop-shadow(0 0 10px rgba(34, 197, 94, 0.2))'
      ]
    }
  };

  const shadowVariants = {
    animate: { 
      scale: [1, 0.8, 1],
      opacity: [0.2, 0.1, 0.2]
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}>
      {/* Outer Glow - The "faint illumination" mentioned */}
      {!fadeBottom && (
        <motion.div 
          animate={animated ? glowVariants.animate : { opacity: 0.3 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-accent-green/20 blur-[60px] rounded-full"
        />
      )}

      <motion.div 
        animate={animated ? logoVariants.animate : { y: 0 }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className={`relative z-10 w-full h-full flex items-center justify-center ${fadeBottom ? '[mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)]' : ''}`}
        style={{ opacity }}
      >
        <img 
          src="https://i.ibb.co/mFYL2tTw/logo.png" 
          alt="Xeval Logo" 
          className="w-4/5 h-4/5 object-contain"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Ground Shadow */}
      {animated && !fadeBottom && (
        <motion.div 
          animate={shadowVariants.animate}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-8 w-1/2 h-4 bg-black/60 blur-xl rounded-full"
        />
      )}
    </div>
  );
};
