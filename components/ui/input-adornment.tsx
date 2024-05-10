import React from 'react';
import { cn } from '@/lib/utils';

interface InputAdornmentProps extends React.HTMLAttributes<HTMLDivElement> {
  adornment: React.ReactNode;
  pointerEvents?: 'auto' | 'none';
  position: 'start' | 'end';
}

const positionConfig = {
  start: 'left-6',
  end: 'right-6',
};

export default function InputAdornment({
  adornment,
  pointerEvents = 'auto',
  position,
  ...props
}: InputAdornmentProps) {
  return (
    <div
      className={cn(
        `absolute ${positionConfig[position]} ${
          pointerEvents === 'auto'
            ? 'pointer-events-auto'
            : 'pointer-events-none'
        } z-10 select-none`
      )}
      {...props}
    >
      {adornment}
    </div>
  );
}
