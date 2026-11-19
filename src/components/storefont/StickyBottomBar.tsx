import React from 'react';

interface StickyBottomBarProps {
  children: React.ReactNode;
  className?: string;
}

export function StickyBottomBar({ children, className = '' }: StickyBottomBarProps) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-30 md:hidden bg-surface/95 backdrop-blur-md border-t border-hairline px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] ${className}`}
    >
      <div className="max-w-lg mx-auto flex items-center gap-3">
        {children}
      </div>
    </div>
  );
}