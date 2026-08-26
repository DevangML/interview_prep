import React, { useState } from 'react';
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

export type ZoomOption = 'fit' | 0.5 | 0.75 | 1 | 1.25 | 1.5;

interface Props {
  device: typeof DEVICES[0];
  isLandscape: boolean;
  zoom: ZoomOption;
  computedScale: number;
  dWidth: string | number;
  dHeight: string | number;
  onSelectDevice: (d: typeof DEVICES[0]) => void;
  onToggleOrientation: () => void;
  onSelectZoom: (z: ZoomOption) => void;
}

export function ViewportToolbar({
  device, isLandscape, zoom, computedScale, dWidth, dHeight,
  onSelectDevice, onToggleOrientation, onSelectZoom
}: Props) {
  const [isDeviceMenuOpen, setIsDeviceMenuOpen] = useState(false);
  const [isZoomMenuOpen, setIsZoomMenuOpen] = useState(false);

  return (
    <div className="h-10 shrink-0 bg-[#f1f3f4] border-b border-[#cacdd1] flex items-center px-3 gap-3 shadow-sm z-20 relative text-[13px] font-sans">
      <div className="relative">
        <button
          onClick={() => { setIsDeviceMenuOpen(!isDeviceMenuOpen); setIsZoomMenuOpen(false); }}
          className="flex items-center gap-2 px-2.5 py-1 bg-white border border-[#dadce0] rounded hover:bg-slate-50 cursor-pointer font-medium text-slate-700 shadow-2xs"
        >
          {device.type === 'mobile' && <Smartphone size={13} className="text-slate-500" />}
          {device.type === 'tablet' && <Tablet size={13} className="text-slate-500" />}
          {(device.type === 'desktop' || device.type === 'fluid') && <Monitor size={13} className="text-slate-500" />}
          <span>{device.name}</span>
          <ChevronDown size={13} className="text-slate-400" />
        </button>
        {isDeviceMenuOpen && (
          <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-[#dadce0] rounded-lg shadow-xl py-1 z-30 max-h-96 overflow-y-auto">
            {DEVICES.map((d) => (
              <button
                key={d.id}
                onClick={() => { onSelectDevice(d); setIsDeviceMenuOpen(false); }}
                className="w-full text-left px-3 py-1.5 hover:bg-sky-50 flex items-center justify-between text-xs text-slate-700 cursor-pointer"
              >
                <span>{d.name}</span>
                {device.id === d.id && <Check size={13} className="text-sky-600" />}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 bg-white border border-[#dadce0] px-2 py-0.5 rounded text-xs text-slate-600 font-mono">
        <span>{typeof dWidth === 'number' ? Math.round(dWidth) : dWidth}</span>
        <span className="text-slate-400">×</span>
        <span>{typeof dHeight === 'number' ? Math.round(dHeight) : dHeight}</span>
      </div>

      {device.type !== 'fluid' && (
        <button
          onClick={onToggleOrientation}
          title="Toggle Orientation"
          className="p-1.5 bg-white border border-[#dadce0] rounded hover:bg-slate-50 text-slate-600 cursor-pointer shadow-2xs"
        >
          <RotateCcw size={13} className={isLandscape ? '-scale-x-100' : ''} />
        </button>
      )}

      <div className="relative ml-auto">
        <button
          onClick={() => { setIsZoomMenuOpen(!isZoomMenuOpen); setIsDeviceMenuOpen(false); }}
          className="flex items-center gap-1.5 px-2 py-1 bg-white border border-[#dadce0] rounded hover:bg-slate-50 cursor-pointer text-xs text-slate-700 shadow-2xs"
        >
          <span>{zoom === 'fit' ? `Fit (${Math.round(computedScale * 100)}%)` : `${zoom * 100}%`}</span>
          <ChevronDown size={13} className="text-slate-400" />
        </button>
        {isZoomMenuOpen && (
          <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-[#dadce0] rounded-lg shadow-xl py-1 z-30">
            {(['fit', 0.5, 0.75, 1, 1.25, 1.5] as ZoomOption[]).map((z) => (
              <button
                key={String(z)}
                onClick={() => { onSelectZoom(z); setIsZoomMenuOpen(false); }}
                className="w-full text-left px-3 py-1.5 hover:bg-sky-50 flex items-center justify-between text-xs text-slate-700 cursor-pointer"
              >
                <span>{z === 'fit' ? 'Auto Fit' : `${z * 100}%`}</span>
                {zoom === z && <Check size={13} className="text-sky-600" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
