const fs = require('fs');
let c = fs.readFileSync('src/components/preview/ResponsiveViewer.tsx', 'utf8');

const oldFluid = `{device.type === 'fluid' ? (
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
        ) : (`;

const newFluid = `{device.type === 'fluid' ? (
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
        ) : (`

c = c.replace(oldFluid, newFluid);
fs.writeFileSync('src/components/preview/ResponsiveViewer.tsx', c);
