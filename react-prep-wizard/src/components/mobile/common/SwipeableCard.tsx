import React, { useRef, useState } from 'react';
import { Check, Trash2, Star, Archive } from 'lucide-react';
import { haptic } from './HapticEngine';

export interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  leftActionLabel?: string;
  rightActionLabel?: string;
  leftIcon?: React.ElementType;
  rightIcon?: React.ElementType;
  threshold?: number;
  className?: string;
  onClick?: () => void;
}

export default function SwipeableCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  leftActionLabel = 'Complete',
  rightActionLabel = 'Delete',
  leftIcon: LeftIcon = Check,
  rightIcon: RightIcon = Trash2,
  threshold = 80,
  className = '',
  onClick,
}: SwipeableCardProps) {
  const [offsetX, setOffsetX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const hasTriggeredHapticRef = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = e.touches[0].clientX;
    setIsSwiping(true);
    hasTriggeredHapticRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startXRef.current;
    currentXRef.current = currentX;

    // Resistance dampening if swiping in unsupported direction
    if ((deltaX > 0 && !onSwipeRight) || (deltaX < 0 && !onSwipeLeft)) {
      setOffsetX(deltaX * 0.2);
    } else {
      setOffsetX(deltaX);
    }

    if (Math.abs(deltaX) > threshold && !hasTriggeredHapticRef.current) {
      haptic.impactMedium();
      hasTriggeredHapticRef.current = true;
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    setIsSwiping(false);
    const deltaX = currentXRef.current - startXRef.current;

    if (deltaX > threshold && onSwipeRight) {
      haptic.success();
      onSwipeRight();
    } else if (deltaX < -threshold && onSwipeLeft) {
      haptic.impactLight();
      onSwipeLeft();
    }
    setOffsetX(0);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl select-none">
      {/* Background Left / Right Action Reveals */}
      <div className="absolute inset-0 flex items-center justify-between px-4 font-bold text-xs">
        {onSwipeRight && (
          <div
            className={`flex items-center gap-1.5 transition-opacity ${
              offsetX > 30 ? 'opacity-100 text-emerald-400' : 'opacity-0'
            }`}
          >
            <LeftIcon size={18} />
            <span>{leftActionLabel}</span>
          </div>
        )}
        {onSwipeLeft && (
          <div
            className={`flex items-center gap-1.5 ml-auto transition-opacity ${
              offsetX < -30 ? 'opacity-100 text-rose-400' : 'opacity-0'
            }`}
          >
            <span>{rightActionLabel}</span>
            <RightIcon size={18} />
          </div>
        )}
      </div>

      {/* Foreground Swipeable Body */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={onClick}
        style={{
          transform: `translateX(${offsetX}px)`,
          transition: isSwiping ? 'none' : 'transform 0.28s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
        className={`relative z-10 bg-slate-900 border border-slate-800 rounded-2xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
