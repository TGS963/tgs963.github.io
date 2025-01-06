import { useEffect, useState } from 'react';

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  animationDelay: number;
}

const Stars = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1,
        animationDelay: Math.random() * 5
      }));
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full dark:bg-green-300 bg-green-500 animate-twinkle"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.animationDelay}s`
          }}
        />
      ))}
    </div>
  );
};

export default Stars;