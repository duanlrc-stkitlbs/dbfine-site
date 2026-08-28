import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'slate' | 'navy' | 'cleanroom';
  children: React.ReactNode;
}

export function Card({
  variant = 'white',
  className,
  children,
  ...props
}: CardProps) {
  const variants = {
    white: 'bg-white border border-slate-200 shadow-cleanroom',
    slate: 'bg-slate-50 border border-slate-200/80',
    navy: 'bg-navy-950 text-white border border-navy-800 shadow-cleanroom-lg',
    cleanroom: 'bg-white border border-slate-200/80 shadow-cleanroom hover:border-teal-400 hover:shadow-cleanroom-lg transition-all duration-300',
  };

  return (
    <div
      className={twMerge(clsx('rounded-xl p-6 relative overflow-hidden', variants[variant], className))}
      {...props}
    >
      {children}
    </div>
  );
}
