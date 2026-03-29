interface DisclaimerBoxProps {
  title: string;
  children: React.ReactNode;
}

export function DisclaimerBox({ title, children }: DisclaimerBoxProps) {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-5">
      <p className="text-xs font-extrabold text-amber-800 uppercase tracking-wider mb-2">
        {title}
      </p>
      <div className="text-xs text-slate-600 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
