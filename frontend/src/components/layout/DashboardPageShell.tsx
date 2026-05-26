import { ReactNode } from 'react';

export default function DashboardPageShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="p-4 md:p-5 max-w-4xl">
      <h1 className="text-[1.35rem] md:text-[1.5rem] font-bold text-[#111]">{title}</h1>
      <p className="text-sm text-[#666] mt-1 mb-6">{description}</p>
      {children}
    </div>
  );
}
