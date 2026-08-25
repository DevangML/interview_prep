import { useState, useRef, useEffect, ReactNode, MouseEvent as ReactMouseEvent } from 'react';
import { RotateCcw, Monitor, Smartphone, Tablet, ChevronDown, Check } from 'lucide-react';

export const DEVICES = [
  { id: 'responsive', name: 'Responsive', width: '100%', height: '100%', type: 'fluid' },
  { id: 'iphone-se', name: 'iPhone SE', width: 375, height: 667, type: 'mobile' },
  { id: 'iphone-xr', name: 'iPhone XR', width: 414, height: 896, type: 'mobile' },
  { id: 'iphone-14-pro', name: 'iPhone 14 Pro Max', width: 430, height: 932, type: 'mobile' },
  { id: 'pixel-7', name: 'Pixel 7', width: 412, height: 915, type: 'mobile' },
  { id: 'samsung-s20', name: 'Samsung Galaxy S20 Ultra', width: 412, height: 915, type: 'mobile' },
  { id: 'ipad-mini', name: 'iPad Mini', width: 768, height: 1024, type: 'tablet' },
  { id: 'ipad-air', name: 'iPad Air', width: 820, height: 1180, type: 'tablet' },
  { id: 'surface-pro', name: 'Surface Pro 7', width: 912, height: 1368, type: 'tablet' },
  { id: 'nest-hub', name: 'Nest Hub', width: 1024, height: 600, type: 'tablet' },
  { id: 'desktop-1280', name: 'Desktop (720p)', width: 1280, height: 720, type: 'desktop' },
  { id: 'desktop-sm', name: 'Desktop (1440p)', width: 1440, height: 900, type: 'desktop' },
  { id: 'desktop-lg', name: 'Desktop (1080p)', width: 1920, height: 1080, type: 'desktop' },
];

interface Props {
  children: ReactNode;
}

export default function ResponsiveViewer({ children }: Props) {
  const [device, setDevice] = useState(DEVICES[1]); // Default to iPhone SE
  const [isLandscape, setIsLandscape] = useState(false);
  const [zoom, setZoom] = useState<'fit' | 0.5 | 0.75 | 1 | 1.25 | 1.5>('fit');
  
  
  const [fluidSize, setFluidSize] = useState({ width: '100%', height: '100%' });
  const [isDragging, setIsDragging] = useState(false);
  
  // Drag handler for responsive mode
  const startDrag = (e: ReactMouseEvent, axis: 'x' | 'y' | 'both') => {
    e.preventDefault();
    setIsDragging(true);
    const startX = e.clientX;
    const startY = e.clientY;
    
    // Convert current sizes to pixels if they are percentages
    const currentWrapper = containerRef.current?.querySelector('.responsive-wrapper') as HTMLElement;
    const startWidth = currentWrapper ? currentWrapper.offsetWidth : 800;
    const startHeight = currentWrapper ? currentWrapper.offsetHeight : 600;

    const handleMouseMove = (me: MouseEvent) => {
      const dx = me.clientX - startX;
      const dy = me.clientY - startY;
      setFluidSize({
        width: axis === 'x' || axis === 'both' ? `${Math.max(320, startWidth + dx * 2)}px` : `${startWidth}px`, // dx * 2 because it's centered
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

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isDeviceMenuOpen, setIsDeviceMenuOpen] = useState(false);
  const [isZoomMenuOpen, setIsZoomMenuOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const dWidth = device.type === 'fluid' ? '100%' : (isLandscape ? device.height : device.width) as number;
  const dHeight = device.type === 'fluid' ? '100%' : (isLandscape ? device.width : device.height) as number;

  let computedScale = 1;
  if (device.type !== 'fluid' && zoom === 'fit' && containerSize.width > 0) {
    const padding = 40;
    const scaleX = (containerSize.width - padding) / (dWidth as number);
    const scaleY = (containerSize.height - padding) / (dHeight as number);
    computedScale = Math.min(1, scaleX, scaleY); // Don't scale up beyond 100% in fit mode
  } else if (zoom !== 'fit') {
    computedScale = zoom;
  }

  return (
    <div className="flex flex-col w-full h-full bg-[#f1f3f4] text-[13px] font-sans">
      {/* DevTools Toolbar */}
      <div className="h-10 shrink-0 bg-[#f1f3f4] border-b border-[#cacdd1] flex items-center px-3 gap-3 shadow-sm z-20 relative">
        
        {/* Device Selector */}
        <div className="relative">
          <button 
            onClick={() => setIsDeviceMenuOpen(!isDeviceMenuOpen)}
            className="flex items-center gap-1.5 hover:bg-[#e1e3e5] px-2 py-1 rounded transition-colors text-[#202124] font-medium"
          >
            {device.type === 'mobile' ? <Smartphone size={14} className="text-[#5f6368]" /> : device.type === 'tablet' ? <Tablet size={14} className="text-[#5f6368]" /> : <Monitor size={14} className="text-[#5f6368]" />}
            {device.name}
            <ChevronDown size={14} className="text-[#5f6368]" />
          </button>
          
          {isDeviceMenuOpen && (
            <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-[#cacdd1] shadow-lg rounded py-1 z-50 max-h-[60vh] overflow-y-auto">
              {DEVICES.map(d => (
                <button
                  key={d.id}
                  onClick={() => { setDevice(d); setIsDeviceMenuOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#f1f3f4] flex items-center justify-between text-[#202124]"
                >
                  <span className="truncate">{d.name}</span>
                  {device.id === d.id && <Check size={14} className="text-blue-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-px h-4 bg-[#cacdd1]"></div>

        {/* Dimensions */}
        {device.type === 'fluid' ? (
          <div className="flex items-center text-[#5f6368] font-mono gap-1 text-[12px]">
            <span className="w-12 text-center bg-transparent cursor-default">Responsive</span>
          </div>
        ) : (
          <div className="flex items-center text-[#5f6368] font-mono gap-1 text-[12px]">
            <input 
              type="text" 
              value={dWidth}
              readOnly
              className="w-12 text-center bg-transparent border border-transparent hover:border-[#cacdd1] rounded cursor-default"
            />
            <span>×</span>
            <input 
              type="text" 
              value={dHeight}
              readOnly
              className="w-12 text-center bg-transparent border border-transparent hover:border-[#cacdd1] rounded cursor-default"
            />
          </div>
        )}

        {/* Rotate */}
        {device.type !== 'fluid' && (
          <button
            title="Rotate"
            onClick={() => setIsLandscape(!isLandscape)}
            className="p-1.5 hover:bg-[#e1e3e5] rounded text-[#5f6368] transition-colors"
          >
            <RotateCcw size={14} className={isLandscape ? "-rotate-90 transition-transform" : "transition-transform"} />
          </button>
        )}

        <div className="w-px h-4 bg-[#cacdd1]"></div>

        {/* Zoom */}
        {device.type !== 'fluid' && (
          <div className="relative">
            <button 
              onClick={() => setIsZoomMenuOpen(!isZoomMenuOpen)}
              className="flex items-center gap-1.5 hover:bg-[#e1e3e5] px-2 py-1 rounded transition-colors text-[#202124]"
            >
              {zoom === 'fit' ? 'Fit' : `${Math.round(zoom * 100)}%`}
              <ChevronDown size={14} className="text-[#5f6368]" />
            </button>
            
            {isZoomMenuOpen && (
              <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-[#cacdd1] shadow-lg rounded py-1 z-50">
                {(['fit', 0.5, 0.75, 1, 1.25, 1.5] as const).map(z => (
                  <button
                    key={z}
                    onClick={() => { setZoom(z); setIsZoomMenuOpen(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#f1f3f4] flex items-center justify-between text-[#202124]"
                  >
                    <span>{z === 'fit' ? 'Fit to window' : `${z * 100}%`}</span>
                    {zoom === z && <Check size={14} className="text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
      </div>

      {/* Viewport Area */}
      {/* Background is a checkerboard pattern common in devtools/design tools */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto relative bg-[#e5e5e5] flex items-center justify-center p-4"
        style={{
          backgroundImage: 'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%, #ddd), linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%, #ddd)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px'
        }}
        onClick={() => {
          if (isDeviceMenuOpen) setIsDeviceMenuOpen(false);
          if (isZoomMenuOpen) setIsZoomMenuOpen(false);
        }}
      >
        {device.type === 'fluid' ? (
          <div 
            className="responsive-wrapper relative flex-shrink-0"
            style={{
              width: fluidSize.width,
              height: fluidSize.height,
              maxWidth: 'calc(100% - 15px)',
              maxHeight: 'calc(100% - 15px)',
              transition: isDragging ? 'none' : 'width 0.2s ease, height 0.2s ease',
              marginRight: '15px',
              marginBottom: '15px'
            }}
          >
            <div className="w-full h-full bg-white shadow-2xl ring-1 ring-black/10 relative">
              {children}
              {isDragging && <div className="absolute inset-0 z-50 cursor-crosshair" />}
            </div>
            
            {/* Right handle */}
            <div 
              onMouseDown={(e) => startDrag(e, 'x')}
              className="absolute top-0 -right-[15px] w-[15px] h-full cursor-ew-resize bg-[#e5e5e5] hover:bg-[#d4d4d4] flex items-center justify-center border-l border-[#c0c0c0] transition-colors z-20"
            >
              <div className="flex flex-col gap-1">
                 <div className="w-1 h-1 bg-gray-400 rounded-full" />
                 <div className="w-1 h-1 bg-gray-400 rounded-full" />
                 <div className="w-1 h-1 bg-gray-400 rounded-full" />
              </div>
            </div>

            {/* Bottom handle */}
            <div 
              onMouseDown={(e) => startDrag(e, 'y')}
              className="absolute -bottom-[15px] left-0 w-full h-[15px] cursor-ns-resize bg-[#e5e5e5] hover:bg-[#d4d4d4] flex items-center justify-center border-t border-[#c0c0c0] transition-colors z-20"
            >
              <div className="flex gap-1">
                 <div className="w-1 h-1 bg-gray-400 rounded-full" />
                 <div className="w-1 h-1 bg-gray-400 rounded-full" />
                 <div className="w-1 h-1 bg-gray-400 rounded-full" />
              </div>
            </div>

            {/* Corner handle */}
            <div 
              onMouseDown={(e) => startDrag(e, 'both')}
              className="absolute -bottom-[15px] -right-[15px] w-[15px] h-[15px] cursor-nwse-resize bg-[#e5e5e5] hover:bg-[#d4d4d4] border-t border-l border-[#c0c0c0] transition-colors z-30"
            />
          </div>
        ) : (
          <div 
            className="relative flex-shrink-0"
            style={{
              width: (dWidth as number) * computedScale,
              height: (dHeight as number) * computedScale,
              transition: 'width 0.2s ease-out, height 0.2s ease-out'
            }}
          >
            <div 
              className="absolute top-0 left-0 bg-white shadow-xl ring-1 ring-black/5"
              style={{
                width: dWidth,
                height: dHeight,
                transform: `scale(${computedScale})`,
                transformOrigin: 'top left',
                transition: 'transform 0.2s ease-out'
              }}
            >
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
