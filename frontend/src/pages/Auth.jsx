import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import api from '../lib/axios';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isLogin) {
        res = await api.post('/auth/login', { email, password });
      } else {
        res = await api.post('/auth/register', { name, email, password, role });
      }
      login(res.data, res.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Authentication failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-neutral-900 p-8 shadow-2xl border border-neutral-800">
        <div>
          <h2 className="text-center text-3xl font-light tracking-tight">VentureLink</h2>
          <p className="mt-2 text-center text-sm text-neutral-400">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            {!isLogin && (
              <div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                  placeholder="Full Name"
                />
              </div>
            )}
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                placeholder="Password"
              />
            </div>
            {!isLogin && (
              <div>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 text-neutral-400"
                  required
                >
                  <option value="" disabled>Select Role</option>
                  <option value="technical_founder">Technical Founder</option>
                  <option value="business_founder">Business Founder</option>
                  <option value="investor">Investor</option>
                </select>
              </div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-neutral-100 px-4 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-300"
            >
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>
        <div className="text-center text-sm">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
