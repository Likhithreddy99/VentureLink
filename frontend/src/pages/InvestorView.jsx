const mockPitches = [
  { id: 1, title: 'AI Developer Agent', description: 'Next generation coding assistant.', goal: 500000, raised: 320000 },
  { id: 2, title: 'Web3 Marketplace', description: 'Decentralized asset trading.', goal: 1000000, raised: 150000 },
];

const InvestorView = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-light tracking-tight">Deal Flow</h1>
        <p className="mt-2 text-sm text-neutral-400">Discover and invest in verified founder workspaces.</p>
      </div>

      <div className="space-y-6">
        {mockPitches.map(pitch => {
          const progress = (pitch.raised / pitch.goal) * 100;
          return (
            <div key={pitch.id} className="flex flex-col md:flex-row gap-6 rounded-2xl bg-neutral-900 p-8 shadow-sm border border-neutral-800">
              <div className="flex-1">
                <h3 className="text-2xl font-medium mb-2">{pitch.title}</h3>
                <p className="text-neutral-400 mb-6">{pitch.description}</p>
                <div className="flex gap-4">
                  <button className="rounded-lg bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-200 hover:bg-neutral-700">
                    View Pitch Deck
                  </button>
                  <button className="rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-500">
                    Commit Capital
                  </button>
                </div>
              </div>
              
              <div className="w-full md:w-72 bg-neutral-950 rounded-xl p-6 border border-neutral-800/50 flex flex-col justify-center">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-neutral-400">Raised</span>
                  <span className="font-medium">${pitch.raised.toLocaleString()}</span>
                </div>
                <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>{progress.toFixed(0)}%</span>
                  <span>Goal: ${pitch.goal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InvestorView;
