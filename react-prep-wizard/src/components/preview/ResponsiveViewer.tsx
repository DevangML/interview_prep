import { useState, useRef, useEffect, ReactNode, MouseEvent as ReactMouseEvent } from 'react';
import { DEVICES, ViewportToolbar, type ZoomOption } from './ViewportToolbar';

export { DEVICES };

interface Props {
  children: ReactNode;
}

export default function ResponsiveViewer({ children }: Props) {
  const [device, setDevice] = useState(DEVICES[1]);
  const [isLandscape, setIsLandscape] = useState(false);
  const [zoom, setZoom] = useState<ZoomOption>('fit');
  const [fluidSize, setFluidSize] = useState({ width: '100%', height: '100%' });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const startDrag = (e: ReactMouseEvent, axis: 'x' | 'y' | 'both') => {
    e.preventDefault();
    setIsDragging(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const currentWrapper = containerRef.current?.querySelector('.responsive-wrapper') as HTMLElement;
    const startWidth = currentWrapper ? currentWrapper.offsetWidth : 800;
    const startHeight = currentWrapper ? currentWrapper.offsetHeight : 600;

    const handleMouseMove = (me: MouseEvent) => {
      const dx = me.clientX - startX;
      const dy = me.clientY - startY;
      setFluidSize({
        width: axis === 'x' || axis === 'both' ? `${Math.max(320, startWidth + dx * 2)}px` : `${startWidth}px`,
        height: axis === 'y' || axis === 'both' ? `${Math.max(480, startHeight + dy * 2)}px` : `${startHeight}px`
      });
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const dWidth = device.type === 'fluid' ? (fluidSize.width === '100%' ? '100%' : parseInt(fluidSize.width)) : (isLandscape ? device.height : device.width);
  const dHeight = device.type === 'fluid' ? (fluidSize.height === '100%' ? '100%' : parseInt(fluidSize.height)) : (isLandscape ? device.width : device.height);

  let computedScale = 1;
  if (device.type !== 'fluid' && zoom === 'fit' && containerSize.width > 0) {
    const padding = 40;
    const scaleX = (containerSize.width - padding) / (dWidth as number);
    const scaleY = (containerSize.height - padding) / (dHeight as number);
    computedScale = Math.min(1, scaleX, scaleY);
  } else if (zoom !== 'fit') {
    computedScale = zoom;
  }

  const isFluid = device.type === 'fluid';

  return (
    <div className="flex flex-col w-full h-full bg-slate-950 text-xs font-sans">
      <ViewportToolbar
        device={device}
        isLandscape={isLandscape}
        zoom={zoom}
        computedScale={computedScale}
        dWidth={dWidth}
        dHeight={dHeight}
        onSelectDevice={setDevice}
        onToggleOrientation={() => setIsLandscape(!isLandscape)}
        onSelectZoom={setZoom}
      />

      <div ref={containerRef} className="flex-1 w-full h-full min-h-0 bg-slate-900/60 overflow-auto flex items-center justify-center p-6 relative select-none">
        <div
          className={`responsive-wrapper relative transition-all duration-150 flex flex-col items-center justify-center ${isFluid ? 'border-2 border-dashed border-sky-500 bg-white' : 'bg-white shadow-2xl rounded-2xl border-8 border-slate-950 overflow-hidden'}`}
          style={{
            width: typeof dWidth === 'number' ? `${dWidth}px` : dWidth,
            height: typeof dHeight === 'number' ? `${dHeight}px` : dHeight,
            transform: `scale(${computedScale})`,
            transformOrigin: 'center center',
            maxWidth: isFluid && fluidSize.width === '100%' ? '100%' : undefined,
            maxHeight: isFluid && fluidSize.height === '100%' ? '100%' : undefined,
          }}
        >
          <div className="w-full h-full pointer-events-auto bg-white flex flex-col overflow-auto">
            {children}
          </div>

          {isFluid && (
            <>
              <div onMouseDown={(e) => startDrag(e, 'x')} className="absolute top-0 right-[-10px] bottom-0 w-3 cursor-ew-resize flex items-center justify-center group z-30">
                <div className="w-1.5 h-8 bg-sky-500 rounded-full group-hover:scale-125 transition-transform" />
              </div>
              <div onMouseDown={(e) => startDrag(e, 'y')} className="absolute left-0 right-0 bottom-[-10px] h-3 cursor-ns-resize flex items-center justify-center group z-30">
                <div className="h-1.5 w-8 bg-sky-500 rounded-full group-hover:scale-125 transition-transform" />
              </div>
              <div onMouseDown={(e) => startDrag(e, 'both')} className="absolute right-[-8px] bottom-[-8px] w-4 h-4 bg-sky-500 rounded-full cursor-nwse-resize hover:scale-125 transition-transform z-30 shadow-md" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
