interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  const hoverStyles = hover
    ? 'hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5 cursor-pointer'
    : '';

  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-sm transition-all ${hoverStyles} ${className}`}
    >
      {children}
    </Tag>
  );
}
