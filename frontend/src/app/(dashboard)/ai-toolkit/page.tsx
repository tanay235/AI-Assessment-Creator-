import Link from 'next/link';
import DashboardPageShell from '@/components/layout/DashboardPageShell';

const TOOLS = [
  {
    title: 'Question Paper Generator',
    desc: 'Build full exams with MCQs, short answers, and answer keys.',
    href: '/assignments/new',
  },
  {
    title: 'Rubric Builder',
    desc: 'Define marking criteria for long-answer questions.',
    href: '/assignments',
  },
  {
    title: 'Lesson Summary',
    desc: 'Turn chapter notes into student-friendly summaries.',
    href: '/library',
  },
];

export default function AiToolkitPage() {
  return (
    <DashboardPageShell
      title="AI Teacher's Toolkit"
      description="Quick tools to help you plan lessons and assessments faster."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className="assignment-card p-5 no-underline hover:shadow-md transition-shadow block"
          >
            <p className="font-bold text-[#111]">{tool.title}</p>
            <p className="text-sm text-[#666] mt-2 leading-relaxed">{tool.desc}</p>
            <span className="inline-block mt-3 text-xs font-semibold text-[#555]">Open →</span>
          </Link>
        ))}
      </div>
    </DashboardPageShell>
  );
}
