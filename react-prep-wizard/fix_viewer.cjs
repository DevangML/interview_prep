const fs = require('fs');

let c = fs.readFileSync('src/components/preview/ResponsiveViewer.tsx', 'utf8');

const importReplacement = `import { useState, useRef, useEffect, ReactNode, MouseEvent as ReactMouseEvent } from 'react';
import { RotateCcw, Monitor, Smartphone, Tablet, ChevronDown, Check } from 'lucide-react';`;

c = c.replace(/import { useState, useRef, useEffect, ReactNode } from 'react';\nimport { RotateCcw, Monitor, Smartphone, Tablet, ChevronDown, Check } from 'lucide-react';/, importReplacement);

// Add custom width/height state for responsive mode
const stateAdditions = `
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
        width: axis === 'x' || axis === 'both' ? \`\${Math.max(320, startWidth + dx * 2)}px\` : \`\${startWidth}px\`, // dx * 2 because it's centered
        height: axis === 'y' || axis === 'both' ? \`\${Math.max(480, startHeight + dy * 2)}px\` : \`\${startHeight}px\`
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
`;

c = c.replace(/const containerRef = useRef<HTMLDivElement>\(null\);/, stateAdditions + '\n  const containerRef = useRef<HTMLDivElement>(null);');

// When fluid, the toolbar should show the current pixel size of the wrapper if it's dragging or if it's been customized
const dimensionsCodeOld = `{device.type !== 'fluid' && (
          <div className="flex items-center text-[#5f6368] font-mono gap-1 text-[12px]">`;
const dimensionsCodeNew = `{device.type === 'fluid' ? (
          <div className="flex items-center text-[#5f6368] font-mono gap-1 text-[12px]">
            <span className="w-12 text-center bg-transparent cursor-default">Responsive</span>
          </div>
        ) : (
          <div className="flex items-center text-[#5f6368] font-mono gap-1 text-[12px]">`;
c = c.replace(dimensionsCodeOld, dimensionsCodeNew);

const dimensionsEndOld = `</div>
        )}

        {/* Rotate */}`;
const dimensionsEndNew = `</div>
        )}

        {/* Rotate */}`;
// Actually let's just leave dimensions empty for fluid for now, since it says "Responsive".
// Wait, if I just replace device.type !== 'fluid' it's fine.

// Now fix the DOM tree in the render area
const viewportOld = `<div 
          className={\`relative bg-white shadow-xl \${device.type !== 'fluid' ? 'ring-1 ring-black/5' : ''}\`}
          style={{
            width: device.type === 'fluid' ? '100%' : dWidth,
            height: device.type === 'fluid' ? '100%' : dHeight,
            transform: device.type === 'fluid' ? 'none' : \`scale(\${computedScale})\`,
            transformOrigin: 'center center',
            transition: 'transform 0.2s ease-out, width 0.3s ease, height 0.3s ease'
          }}
        >
          {children}
        </div>`;

const viewportNew = `{device.type === 'fluid' ? (
          <div 
            className="responsive-wrapper relative bg-white shadow-2xl ring-1 ring-black/10 flex-shrink-0"
            style={{
              width: fluidSize.width,
              height: fluidSize.height,
              maxWidth: '100%',
              maxHeight: '100%',
              transition: isDragging ? 'none' : 'width 0.2s ease, height 0.2s ease'
            }}
          >
            {children}
            {/* Right handle */}
            <div 
              onMouseDown={(e) => startDrag(e, 'x')}
              className="absolute top-0 right-0 w-3 h-full cursor-ew-resize hover:bg-blue-500/20 z-10 flex items-center justify-center group"
            >
              <div className="w-1 h-8 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {/* Bottom handle */}
            <div 
              onMouseDown={(e) => startDrag(e, 'y')}
              className="absolute bottom-0 left-0 w-full h-3 cursor-ns-resize hover:bg-blue-500/20 z-10 flex items-center justify-center group"
            >
              <div className="w-8 h-1 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {/* Corner handle */}
            <div 
              onMouseDown={(e) => startDrag(e, 'both')}
              className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize hover:bg-blue-500/40 z-20"
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
                transform: \`scale(\${computedScale})\`,
                transformOrigin: 'top left',
                transition: 'transform 0.2s ease-out'
              }}
            >
              {children}
            </div>
          </div>
        )}`;

c = c.replace(viewportOld, viewportNew);

fs.writeFileSync('src/components/preview/ResponsiveViewer.tsx', c);
