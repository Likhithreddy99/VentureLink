import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import useAuthStore from '../store/useAuthStore';

const WarRoom = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState(null);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);
    
    newSocket.emit('joinRoom', id);
    
    newSocket.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => newSocket.close();
  }, [id]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() && socket) {
      const newMsg = { id: Date.now(), text: inputValue, sender: user?._id || 'me' };
      socket.emit('sendMessage', { room: id, message: newMsg });
      setMessages([...messages, newMsg]);
      setInputValue('');
    }
  };

  return (
    <div className="flex h-screen bg-neutral-950">
      <div className="flex-1 p-8 border-r border-neutral-800 flex flex-col">
        <h2 className="text-2xl font-light tracking-tight mb-8">Workspace Kanban</h2>
        <div className="flex-1 grid grid-cols-3 gap-6">
          {['To Do', 'In Progress', 'Done'].map(col => (
            <div key={col} className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
              <h3 className="text-sm font-medium text-neutral-400 mb-4">{col}</h3>
              <div className="h-24 bg-neutral-800/50 rounded-lg border border-neutral-700/50 mb-3 p-3">
                <div className="h-2 w-1/3 bg-neutral-700 rounded mb-2"></div>
                <div className="h-2 w-full bg-neutral-700 rounded mb-1"></div>
                <div className="h-2 w-2/3 bg-neutral-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-96 flex flex-col bg-neutral-900/50">
        <div className="p-6 border-b border-neutral-800">
          <h2 className="text-lg font-medium">Team Chat</h2>
          <p className="text-xs text-emerald-500">Connected</p>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex flex-col gap-1 ${msg.sender === (user?._id || 'me') ? 'items-end' : 'items-start'}`}>
              <span className="text-xs text-neutral-500">{msg.sender === (user?._id || 'me') ? 'Me' : 'Partner'}</span>
              <div className={`px-4 py-2 rounded-2xl text-sm ${msg.sender === (user?._id || 'me') ? 'bg-neutral-100 text-neutral-900 rounded-tr-sm' : 'bg-neutral-800 rounded-tl-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="p-4 border-t border-neutral-800">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="w-full rounded-full border border-neutral-800 bg-neutral-950 px-5 py-3 text-sm focus:border-neutral-500 focus:outline-none"
          />
        </form>
      </div>
    </div>
  );
};

export default WarRoom;
