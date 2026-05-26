import Link from 'next/link';
import DashboardPageShell from '@/components/layout/DashboardPageShell';

const DEMO_GROUPS = [
  { id: 'g1', name: 'Class 10 — Section A', students: 42, subject: 'Mathematics' },
  { id: 'g2', name: 'Class 9 — Science Batch', students: 38, subject: 'Science' },
  { id: 'g3', name: 'Class 8 — Hindi Group', students: 35, subject: 'Hindi' },
];

export default function GroupsPage() {
  return (
    <DashboardPageShell
      title="My Groups"
      description="Organize students into groups and assign work to each class."
    >
      <ul className="flex flex-col gap-3">
        {DEMO_GROUPS.map((g) => (
          <li
            key={g.id}
            className="assignment-card flex items-center justify-between gap-4 p-4"
          >
            <div>
              <p className="font-bold text-[#111]">{g.name}</p>
              <p className="text-sm text-[#666] mt-1">
                {g.students} students · {g.subject}
              </p>
            </div>
            <Link
              href="/assignments"
              className="text-sm font-semibold text-[#111] hover:underline shrink-0"
            >
              View assignments
            </Link>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mt-6 px-5 py-2.5 rounded-full bg-[#141414] text-white text-sm font-semibold hover:bg-[#333] transition-colors border-none cursor-pointer"
      >
        + Create new group
      </button>
    </DashboardPageShell>
  );
}
