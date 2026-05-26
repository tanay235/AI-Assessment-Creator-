import Link from 'next/link';
import DashboardPageShell from '@/components/layout/DashboardPageShell';

const LIBRARY_ITEMS = [
  { title: 'NCERT Science — Class 9', type: 'PDF', updated: '20 May 2026' },
  { title: 'Math Formula Sheet', type: 'PDF', updated: '18 May 2026' },
  { title: 'Sample Question Bank', type: 'Document', updated: '15 May 2026' },
];

export default function LibraryPage() {
  return (
    <DashboardPageShell
      title="My Library"
      description="Store and reuse teaching materials for your assignments."
    >
      <ul className="flex flex-col gap-3">
        {LIBRARY_ITEMS.map((item) => (
          <li
            key={item.title}
            className="assignment-card flex items-center justify-between p-4 gap-3"
          >
            <div>
              <p className="font-bold text-[#111]">{item.title}</p>
              <p className="text-sm text-[#888] mt-1">
                {item.type} · Updated {item.updated}
              </p>
            </div>
            <button
              type="button"
              className="text-sm font-semibold text-[#111] px-3 py-1.5 rounded-lg border border-[#e0e0e0] bg-white hover:bg-[#f5f5f5] cursor-pointer shrink-0"
            >
              Open
            </button>
          </li>
        ))}
      </ul>
      <p className="text-sm text-[#777] mt-6">
        Tip: Upload PDFs when{' '}
        <Link href="/assignments/new" className="font-semibold text-[#111] underline">
          creating an assignment
        </Link>{' '}
        to base questions on your material.
      </p>
    </DashboardPageShell>
  );
}
