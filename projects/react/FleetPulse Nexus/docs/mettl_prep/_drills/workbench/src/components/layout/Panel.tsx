import type { ReactNode } from 'react';

interface Props {
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export default function Panel({ title, children, actions, className = '' }: Props) {
  return (
    <section className={`bg-white border border-gray-200 rounded-xl flex flex-col min-h-0 overflow-hidden ${className}`}>
      <div className="px-3 py-2 border-b border-gray-200 bg-gray-50/60 flex items-center gap-2 shrink-0">
        <span className="text-[0.66rem] font-bold tracking-wider uppercase text-gray-500">
          {title}
        </span>
        <span className="flex-1" />
        {actions}
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        {children}
      </div>
    </section>
  );
}
