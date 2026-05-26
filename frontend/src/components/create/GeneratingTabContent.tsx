'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';

export default function GeneratingTabContent({ id }: { id: string }) {
  const router = useRouter();
  const [status, setStatus] = useState('Starting the AI assistant...');
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  // Asymptotic progress bar logic
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev; // cap at 95% until completion
        // Gradually slow down as it gets closer to 100
        return prev + (95 - prev) * 0.1;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Socket.io logic
  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const socket = io(backendUrl, {
      withCredentials: true,
    });

    socket.on('connect', () => {
      socket.emit('join_assignment', id);
    });

    socket.on('job:progress', (data: { message: string }) => {
      setStatus(data.message);
    });

    socket.on('job:completed', () => {
      setStatus('Generation complete! Redirecting...');
      setProgress(100);
      setTimeout(() => {
        router.push(`/assignments/${id}/result`);
      }, 1000);
    });

    socket.on('job:failed', (data: { error?: string }) => {
      setFailed(true);
      setProgress(0);
      const err = data?.error || 'Unknown error';
      setErrorDetail(err);
      setStatus('Generation failed');
    });

    return () => {
      socket.disconnect();
    };
  }, [id, router]);

  return (
    <div className="bg-white rounded-[20px] p-5 md:p-8 flex flex-col items-center justify-center min-h-[400px] w-full text-center shadow-sm">
      <div className="w-full max-w-lg flex flex-col items-center gap-6">
        <h2
          className={`text-[1.5rem] font-medium text-[#111] ${failed ? '' : 'animate-pulse'}`}
        >
          {status}
        </h2>

        {failed && errorDetail ? (
          <div className="w-full text-left rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <p className="font-semibold mb-2">What went wrong</p>
            <p className="leading-relaxed">{errorDetail}</p>
            <p className="mt-3 text-red-700">
              Fix: open{' '}
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium"
              >
                Google AI Studio
              </a>
              , create a new API key, put it in <code className="text-xs bg-red-100 px-1 rounded">backend/.env</code> as{' '}
              <code className="text-xs bg-red-100 px-1 rounded">GEMINI_API_KEY</code>, restart the backend, then try again.
            </p>
            <button
              type="button"
              onClick={() => router.push('/assignments/new')}
              className="mt-4 w-full rounded-full bg-black text-white py-2.5 text-sm font-semibold hover:bg-gray-800"
            >
              Back to Create Assignment
            </button>
          </div>
        ) : (
          <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
