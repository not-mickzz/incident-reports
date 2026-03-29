interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'emerald' | 'red' | 'amber' | 'purple' | 'cyan' | 'slate';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  red: 'bg-red-50 text-red-600 border-red-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  slate: 'bg-slate-100 text-slate-600 border-slate-200',
};

export function Badge({ children, variant = 'blue', size = 'sm', className = '' }: BadgeProps) {
  const sizeStyles = size === 'sm'
    ? 'text-[10px] px-2 py-0.5'
    : 'text-[10px] px-2.5 py-1';

  return (
    <span
      className={`font-bold uppercase tracking-wider rounded-full border inline-flex items-center ${variantStyles[variant]} ${sizeStyles} ${className}`}
    >
      {children}
    </span>
  );
}

interface MitreBadgeProps {
  technique: string;
}

export function MitreBadge({ technique }: MitreBadgeProps) {
  return (
    <span className="text-[10px] font-mono px-2 py-0.5 bg-red-50 text-red-600 rounded border border-red-200">
      {technique}
    </span>
  );
}
