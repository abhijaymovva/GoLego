import AppLayout from '@/components/layout/AppLayout';

export default function ChallengePage() {
  return (
    <AppLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Daily Challenges</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stub Card */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition">
            <div className="h-32 bg-gray-100 rounded mb-4 flex items-center justify-center text-gray-400">
              [Preview Image]
            </div>
            <h3 className="font-bold text-lg mb-2">Build a Bridge</h3>
            <p className="text-gray-600 text-sm mb-4">
              Construct a bridge that can span 10 units without supports in the middle.
            </p>
            <button disabled className="px-4 py-2 bg-gray-300 text-gray-600 rounded cursor-not-allowed">
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

