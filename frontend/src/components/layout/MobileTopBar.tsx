'use client';

import Link from 'next/link';
import { VedaAILogo } from '@/components/layout/Sidebar';
import HeaderActions from '@/components/layout/HeaderActions';

export default function MobileTopBar() {
  return (
    <div className="mx-3 mt-3 bg-white rounded-[20px] px-4 py-3.5 flex items-center justify-between shrink-0">
      <Link href="/" className="flex items-center gap-2.5 no-underline">
        <VedaAILogo />
        <span className="text-[16px] font-bold text-[#111] tracking-tight">VedaAI</span>
      </Link>

      <HeaderActions compact />
    </div>
  );
}
