import AppLayout from '@/components/layout/AppLayout';
import Link from 'next/link';

export default function Home() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">Welcome to GOLEGO</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xl">
          Build, create, and solve challenges in 3D.
        </p>
        <div className="flex gap-4">
          <Link 
            href="/sandbox"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Start Building (Sandbox)
          </Link>
          <Link 
            href="/challenge"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
          >
            View Challenges
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}

