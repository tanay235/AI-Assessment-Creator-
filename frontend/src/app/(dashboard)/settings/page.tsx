'use client';

import { useState } from 'react';
import DashboardPageShell from '@/components/layout/DashboardPageShell';
import { useSessionStore } from '@/store/useSessionStore';

export default function SettingsPage() {
  const { userName, login } = useSessionStore();
  const [name, setName] = useState(userName);
  const [school, setSchool] = useState('Delhi Public School');
  const [city, setCity] = useState('Bokaro Steel City');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    login(name.trim() || 'John Doe');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardPageShell
      title="Settings"
      description="Manage your profile and preferences."
    >
      <form onSubmit={handleSave} className="assignment-card p-5 md:p-6 max-w-lg flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-[#111]">Display name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-[#e0e0e0] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#111]/20"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-[#111]">School</span>
          <input
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="rounded-lg border border-[#e0e0e0] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#111]/20"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-[#111]">City</span>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-lg border border-[#e0e0e0] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#111]/20"
          />
        </label>
        <button
          type="submit"
          className="self-start px-6 py-2.5 rounded-full bg-[#141414] text-white text-sm font-semibold hover:bg-[#333] border-none cursor-pointer"
        >
          Save changes
        </button>
        {saved && (
          <p className="text-sm text-green-700 font-medium">Settings saved successfully.</p>
        )}
      </form>
    </DashboardPageShell>
  );
}
