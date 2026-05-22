import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import WarRoom from './pages/WarRoom';
import InvestorView from './pages/InvestorView';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workspace/:id" element={<WarRoom />} />
          <Route path="/invest" element={<InvestorView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
