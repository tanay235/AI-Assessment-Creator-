import Link from 'next/link';
import DashboardPageShell from '@/components/layout/DashboardPageShell';

export default function HomePage() {
  return (
    <DashboardPageShell
      title="Home"
      description="Welcome to VedaAI — create and manage AI-powered assessments for your students."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/assignments/new"
          className="assignment-card p-5 no-underline hover:shadow-md transition-shadow block"
        >
          <p className="font-bold text-[#111]">Create Assignment</p>
          <p className="text-sm text-[#666] mt-2">Generate a new question paper with AI.</p>
        </Link>
        <Link
          href="/assignments"
          className="assignment-card p-5 no-underline hover:shadow-md transition-shadow block"
        >
          <p className="font-bold text-[#111]">View Assignments</p>
          <p className="text-sm text-[#666] mt-2">See all assignments and download papers.</p>
        </Link>
      </div>
    </DashboardPageShell>
  );
}
