import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await api.get('/matches');
        setMatches(res.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  if (loading) return <div className="p-12 text-center">Loading...</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl font-light tracking-tight">Discovery</h1>
        <button className="rounded-full bg-neutral-800 px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-700">
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <div key={match._id} className="flex flex-col rounded-2xl bg-neutral-900 p-6 shadow-sm border border-neutral-800 transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium">{match.name}</h3>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                {match.matchScore || 0}% Match
              </span>
            </div>
            <p className="mt-1 text-sm text-neutral-400">{match.role}</p>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {match.skills && match.skills.map(skill => (
                <span key={skill} className="inline-flex items-center rounded bg-neutral-800 px-2 py-1 text-xs text-neutral-300">
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-8 flex gap-3 mt-auto">
              <button 
                onClick={() => navigate(`/workspace/${match._id}`)}
                className="flex-1 rounded-lg bg-neutral-100 px-4 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-300"
              >
                Connect
              </button>
              <button className="flex-1 rounded-lg border border-neutral-700 bg-transparent px-4 py-2.5 text-sm font-medium text-neutral-300 hover:bg-neutral-800">
                Pass
              </button>
            </div>
          </div>
        ))}
        {matches.length === 0 && <div className="text-neutral-500">No matches found.</div>}
      </div>
    </div>
  );
};

export default Dashboard;
