'use client';

import { useRouter, usePathname } from 'next/navigation';
import { AssignmentsIcon } from '@/components/icons/NavIcons';
import { ArrowLeft } from 'lucide-react';
import HeaderActions from '@/components/layout/HeaderActions';

// ─── Icons ────────────────────────────────────────────────────────────────────

/** Sparkle / "AI create" icon — shown on the result page title. */
function SparkleIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 19 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.63783 8.63783L6.18377 4H7.13246L8.6784 8.63783L13.3162 10.1838V11.1325L8.6784 12.6784L7.13246 17.3162H6.18377L4.63783 12.6784L0 11.1325V10.1838L4.63783 8.63783Z"
        fill="#888"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.3878 2.38783L14.1838 0H15.1325L15.9284 2.38783L18.3162 3.18377V4.13246L15.9284 4.9284L15.1325 7.31623H14.1838L13.3878 4.9284L11 4.13246V3.18377L13.3878 2.38783Z"
        fill="#888"
      />
    </svg>
  );
}

// ─── Route → NavTitle mapping ─────────────────────────────────────────────────
/**
 * Returns { icon, label } for the breadcrumb shown next to the back button.
 *
 * Rules (from spec):
 *  /assignments               → AssignmentsIcon  + "Assignments"
 *  /assignments/new           → no icon           + "Assignments"
 *  /assignments/[id]/result   → SparkleIcon       + "Create New"
 *  everything else            → SparkleIcon       + "Create New"  (safe default)
 */
function useNavTitle(): { icon: React.ReactNode; label: string } {
  const pathname = usePathname();

  if (pathname === '/') {
    return { icon: <AssignmentsIcon size={16} />, label: 'Home' };
  }
  if (pathname === '/groups') {
    return { icon: null, label: 'My Groups' };
  }
  if (pathname === '/ai-toolkit') {
    return { icon: null, label: "AI Teacher's Toolkit" };
  }
  if (pathname === '/library') {
    return { icon: null, label: 'My Library' };
  }
  if (pathname === '/settings') {
    return { icon: null, label: 'Settings' };
  }

  // Exact match: the /assignments list page
  if (pathname === '/assignments') {
    return {
      icon: <AssignmentsIcon size={16} />,
      label: 'Assignments',
    };
  }

  // /assignments/new — create flow, no icon per spec
  if (pathname === '/assignments/new') {
    return { icon: null, label: 'Assignments' };
  }

  // /assignments/[id]/result
  if (pathname.startsWith('/assignments/') && pathname.endsWith('/result')) {
    return { icon: <SparkleIcon />, label: 'Create New' };
  }

  // Default: sparkle + "Create New" for any other route
  return { icon: <SparkleIcon />, label: 'Create New' };
}

// ─── TopNav ───────────────────────────────────────────────────────────────────
export default function TopNav() {
  const router = useRouter();
  const { icon, label } = useNavTitle();

  return (
    <>
      {/* ── Left: back arrow + dynamic title ────────────────────────────── */}
      <div className="flex items-center gap-3">
        {/* Back button — standard left-arrow, always shown */}
        <button
          id="topnav-back-btn"
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors shrink-0 text-[#444]"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Dynamic breadcrumb: icon (if any) + label */}
        <div className="flex items-center gap-1.5 text-[#555]">
          {icon}
          <span className="text-[13.5px] font-medium text-[#555]">{label}</span>
        </div>
      </div>

      <HeaderActions />
    </>
  );
}