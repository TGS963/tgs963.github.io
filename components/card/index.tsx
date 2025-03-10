import type { ReactNode } from 'react';

  export const Card = ({children, customClassName, enableGlow = false}:{ children?: ReactNode, customClassName?: string, enableGlow?: boolean }) => (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-100/80 to-green-300/80 p-1 backdrop-blur-md frutiger-glow ${enableGlow && 'frutiger-metallic'} ${customClassName}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-green-200/60 backdrop-blur-sm"/>
      <div className="relative z-10 h-full bg-gradient-to-br from-white/80 to-green-100/40 p-6 rounded-xl shadow-lg">
        <div className="text-green-600 frutiger-text-shadow w-full h-full">{children}</div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-green-100/10 to-green-300/20 rounded-2xl frutiger-metallic-overlay"/>
    </div>
  );