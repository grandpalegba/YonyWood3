import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Compass } from 'lucide-react';

interface CentralAstrolabeJoystickProps {
  onRotateDelta: (deltaDeg: number) => void;
  onSetRotationAngle: (angleDeg: number) => void;
  rotationAngle: number;
  onReset: () => void;
}

export const CentralAstrolabeJoystick: React.FC<CentralAstrolabeJoystickProps> = ({
  onRotateDelta,
  onSetRotationAngle,
  rotationAngle,
  onReset
}) => {
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [knobOffset, setKnobOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const centerRef = useRef<HTMLDivElement | null>(null);
  const startPointerAngleRef = useRef<number>(0);
  const startRotationAngleRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const knobOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const MAX_KNOB_RADIUS = 18; // Maximum deflection radius of the central stick

  useEffect(() => {
    knobOffsetRef.current = knobOffset;
  }, [knobOffset]);

  // Continuous subtle spin loop when stick is pulled sideways
  useEffect(() => {
    if (!isInteracting) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      return;
    }

    const loop = () => {
      const { x } = knobOffsetRef.current;
      if (Math.abs(x) > 3) {
        // Continuous rotation speed proportional to horizontal pull
        const speed = (x / MAX_KNOB_RADIUS) * 2.2;
        onRotateDelta(speed);
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isInteracting, onRotateDelta]);

  // Pointer events on the central astrolabe
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsInteracting(true);

    if (centerRef.current) {
      const rect = centerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
      startPointerAngleRef.current = angle;
      startRotationAngleRef.current = rotationAngle;

      // Deflection
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const rad = Math.atan2(dy, dx);
      const clamped = Math.min(dist, MAX_KNOB_RADIUS);
      setKnobOffset({
        x: Math.cos(rad) * clamped,
        y: Math.sin(rad) * clamped
      });
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isInteracting || !centerRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    const rect = centerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // 1. Calculate orbital angle around center (jog-wheel rotation)
    const currentAngle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
    const deltaAngle = currentAngle - startPointerAngleRef.current;
    onSetRotationAngle((startRotationAngleRef.current + deltaAngle) % 360);

    // 2. Calculate knob deflection for visual response
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const rad = Math.atan2(dy, dx);
    const clamped = Math.min(dist, MAX_KNOB_RADIUS);
    setKnobOffset({
      x: Math.cos(rad) * clamped,
      y: Math.sin(rad) * clamped
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsInteracting(false);
    setKnobOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={centerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onDoubleClick={onReset}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 sm:w-20 sm:h-20 rounded-full cursor-grab active:cursor-grabbing touch-none select-none flex items-center justify-center pointer-events-auto group"
      id="central-astrolabe-joystick"
    >
      {/* SOCLE CIRCULAIRE BRONZE / LIN DORE EN RELIEF */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFFDF8] via-[#EFE7D8] to-[#DFD3BE] border-2 border-[#C89B3C] shadow-[0_4px_18px_rgba(139,104,69,0.3)] transition-transform group-hover:scale-105 flex items-center justify-center">
        
        {/* Anneau gradué astrolabe gravé */}
        <div className="absolute inset-1 rounded-full border border-dashed border-[#8B6845]/30 pointer-events-none" />
        
        {/* Repères cardinaux discrets */}
        <div className="absolute w-[1px] h-full bg-[#8B6845]/25 pointer-events-none" />
        <div className="absolute h-[1px] w-full bg-[#8B6845]/25 pointer-events-none" />

        {/* POMMEAU DU JOYSTICK (STICK DORE FLUIDE) */}
        <div
          className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#F5D88C] via-[#C89B3C] to-[#8B6845] border-2 border-[#FFFDF8] shadow-[0_3px_10px_rgba(139,104,69,0.45)] flex items-center justify-center transition-transform pointer-events-none ${
            isInteracting ? 'scale-95 duration-75' : 'duration-300 ease-out'
          }`}
          style={{
            transform: `translate(${knobOffset.x}px, ${knobOffset.y}px)`
          }}
        >
          {/* Cœur de boussole orné */}
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#8B6845] border border-[#F5D88C]/70 flex items-center justify-center shadow-inner">
            <Compass className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F5D88C] transition-transform ${isInteracting ? 'animate-spin' : ''}`} />
          </div>
        </div>

      </div>
    </div>
  );
};
