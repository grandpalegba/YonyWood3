import React, { useRef, useCallback } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface VerticalZoomSliderProps {
  zoomLevel: number;
  onZoomChange: (newZoom: number) => void;
  minZoom?: number;
  maxZoom?: number;
}

export const VerticalZoomSlider: React.FC<VerticalZoomSliderProps> = ({
  zoomLevel,
  onZoomChange,
  minZoom = 0.65,
  maxZoom = 1.45
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  // Convert zoom to percentage (0 = minZoom, 1 = maxZoom)
  const normalized = Math.max(0, Math.min(1, (zoomLevel - minZoom) / (maxZoom - minZoom)));

  const updateFromPointer = useCallback((clientY: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    // Invert Y: top is maxZoom (1.0), bottom is minZoom (0.0)
    const ratio = 1 - Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    const targetZoom = minZoom + ratio * (maxZoom - minZoom);
    onZoomChange(targetZoom);
  }, [minZoom, maxZoom, onZoomChange]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    updateFromPointer(e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    updateFromPointer(e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
  };

  const stepZoom = (delta: number) => {
    onZoomChange(Math.max(minZoom, Math.min(maxZoom, zoomLevel + delta)));
  };

  const resetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    onZoomChange(1.0);
  };

  return (
    <div 
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center bg-[#FFFDF8]/95 backdrop-blur-md p-1.5 sm:p-2 rounded-full border border-[#E4DDCC] shadow-lg touch-none select-none transition-all duration-200 hover:border-[#C89B3C]"
      id="vertical-zoom-slider"
    >
      {/* Bouton Zoom In */}
      <button
        type="button"
        onClick={() => stepZoom(0.1)}
        onDoubleClick={resetZoom}
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#8B6845] hover:text-[#C89B3C] hover:bg-[#F5F1E8] transition-colors cursor-pointer"
        aria-label="Zoomer"
      >
        <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>

      {/* Rail vertical du curseur */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-7 h-28 sm:h-36 flex items-center justify-center cursor-ns-resize py-2 my-1"
      >
        {/* Ligne centrale du rail */}
        <div className="w-1.5 h-full rounded-full bg-[#E4DDCC] relative overflow-hidden">
          {/* Remplissage doré selon le niveau de zoom */}
          <div 
            className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#8B6845] to-[#C89B3C] rounded-full transition-all duration-75"
            style={{ height: `${normalized * 100}%` }}
          />
        </div>

        {/* Curseur mobile (Thumb tactile doré) */}
        <div
          className="absolute w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FFFDF8] border-2 border-[#C89B3C] shadow-[0_2px_8px_rgba(139,104,69,0.35)] flex items-center justify-center transition-all duration-75 pointer-events-none"
          style={{
            bottom: `calc(${normalized * 100}% - 10px)`
          }}
        >
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#C89B3C]" />
        </div>
      </div>

      {/* Bouton Zoom Out */}
      <button
        type="button"
        onClick={() => stepZoom(-0.1)}
        onDoubleClick={resetZoom}
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#8B6845] hover:text-[#C89B3C] hover:bg-[#F5F1E8] transition-colors cursor-pointer"
        aria-label="Dézoomer"
      >
        <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
};
