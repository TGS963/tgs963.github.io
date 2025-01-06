import { useEffect, useState } from 'react';

interface FloatingCircle {
  id: number;
  bottom: number;
  left: number;
  size: number;
  animationDelay: number;
}

const FloatingCircles = () => {
  const [circles, setCircles] = useState<FloatingCircle[]>([]);

  useEffect(() => {
    const generateCircles = () => {
      const newCircles = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        bottom: -50,
        left: Math.random() * 100,
        size: 2000,
        animationDelay: Math.random() * 3
      }));
      setCircles(newCircles);
    };

    generateCircles();
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {circles.map((circle) => (
        <div
          key={circle.id}
          className="absolute rounded-full bg-green-300/40 backdrop-blur-sm animate-float"
          style={{
            bottom: `${circle.bottom}%`,
            left: `${circle.left}%`,
            width: `${circle.size}px`,
            background: 'radial-gradient(circle at center, rgba(166, 255, 170, 0.2) 90%, rgba(255,255,255,0) 80%)',
            height: `${circle.size}px`,
            animationDelay: `${circle.animationDelay}s`,
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
          }}
        />
      ))}
    </div>
  );
};

export default FloatingCircles;