import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { haptic } from './HapticEngine';

export interface BottomSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  initialDetent?: 'peek' | 'full';
  children: React.ReactNode;
  footer?: React.ReactNode;
  showHandle?: boolean;
}

export default function BottomSheetModal({
  isOpen,
  onClose,
  title,
  subtitle,
  initialDetent = 'full',
  children,
  footer,
  showHandle = true,
}: BottomSheetModalProps) {
  const [detent, setDetent] = useState<'peek' | 'full'>(initialDetent);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startYRef = useRef(0);
  const currentYRef = useRef(0);
  const startTimeRef = useRef(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setDetent(initialDetent);
      setDragY(0);
      haptic.impactLight();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialDetent]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
    currentYRef.current = e.touches[0].clientY;
    startTimeRef.current = Date.now();
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startYRef.current;
    currentYRef.current = currentY;

    if (deltaY > 0) {
      // Dragging downward
      setDragY(deltaY);
    } else {
      // Dragging upward with rubber-band resistance (0.3 coefficient)
      setDragY(deltaY * 0.3);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const deltaY = currentYRef.current - startYRef.current;
    const elapsed = Math.max(1, Date.now() - startTimeRef.current);
    const velocity = (deltaY / elapsed) * 1000; // px/s

    // Velocity threshold or displacement threshold
    if (velocity > 600 || deltaY > 180) {
      // Fling down or pulled down -> dismiss
      haptic.impactMedium();
      onClose();
    } else if (velocity < -400 || deltaY < -60) {
      // Pulled up -> snap to full
      haptic.selection();
      setDetent('full');
      setDragY(0);
    } else if (deltaY > 60 && detent === 'full') {
      // Settle down to peek
      haptic.selection();
      setDetent('peek');
      setDragY(0);
    } else {
      // Spring back
      setDragY(0);
    }
  };

  if (!isOpen) return null;

  const heightClass = detent === 'peek' ? 'h-[50vh]' : 'h-[88vh]';

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        onClick={() => {
          haptic.impactLight();
          onClose();
        }}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      {/* Spring Sheet */}
      <div
        ref={sheetRef}
        style={{
          transform: `translateY(${Math.max(0, dragY)}px)`,
          transition: isDragging ? 'none' : 'transform 0.32s cubic-bezier(0.32, 0.72, 0, 1), height 0.28s ease',
        }}
        className={`relative z-10 w-full ${heightClass} bg-slate-900 border-t border-slate-700/80 rounded-t-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100 safe-area-bottom`}
      >
        {/* Drag Handle Zone */}
        {showHandle && (
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-full pt-3 pb-2 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none"
          >
            <div className="w-12 h-1.5 rounded-full bg-slate-600 active:bg-slate-400 transition-colors" />
          </div>
        )}

        {/* Sheet Header */}
        {(title || subtitle) && (
          <div className="px-4 py-2 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="min-w-0 pr-2">
              {title && <h3 className="text-sm font-bold text-white tracking-tight truncate">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-400 truncate">{subtitle}</p>}
            </div>
            <button
              onClick={() => {
                haptic.impactLight();
                onClose();
              }}
              className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Sheet Scrollable Body */}
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-4 overscroll-contain">
          {children}
        </div>

        {/* Sheet Footer */}
        {footer && <div className="p-3 bg-slate-900/90 border-t border-slate-800 shrink-0">{footer}</div>}
      </div>
    </div>
  );
}
