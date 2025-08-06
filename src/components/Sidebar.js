import React from 'react';
import {
  Plus,
  Search,
  Image,
  Clock4,
  Play,
  CircleUserRound,
} from 'lucide-react';
import logo from '../images/logo.png';

const Sidebar = ({ setMessages, setSidebarOpen }) => {
  return (
    <div className="flex flex-col h-screen w-[260px] min-w-[260px] bg-[#f7f7f8] border-r border-gray-200 text-sm">
      {/* Top logo and square button */}
      <div className="flex items-center justify-between px-3 pt-4 pb-2">
        <button onClick={() => setMessages([])} className="flex items-center">
          <img src={logo} alt="Logo" className="w-[20px] h-[20px]" />
        </button>
        <button 
          onClick={() => setSidebarOpen(false)} 
          className="hover:bg-gray-100 p-1 rounded-md"
          aria-label="Close sidebar"
        >
          <img src="/images/sidebar_toggle.svg" alt="Toggle Sidebar" className="w-[16px] h-[16px]" />
        </button>
      </div>

      {/* Navigation links */}
      <div className="flex flex-col px-3 pt-2 gap-1">
        <button onClick={() => setMessages([])} className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md">
          <Plus className="w-[18px] h-[18px]" strokeWidth={1.5} />
          <span>New chat</span>
        </button>
        <button className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md">
          <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
          <span>Search chats</span>
        </button>
        <button className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md">
          <Image className="w-[18px] h-[18px]" strokeWidth={1.5} />
          <span>Library</span>
        </button>
      </div>


      {/* Bottom links */}
      <div className="flex flex-col px-3 gap-1 mt-4">
        <button className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md">
          <img src="/images/codex.png" alt="Codex" className="w-[22px] h-[22px]" />
          <span>Codex</span>
        </button>
        <button className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md">
          <img src="/images/sora.png" alt="Sora" className="w-[18px] h-[18px]" />
          <span>Sora</span>
        </button>
        <button className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md">
          <img src="/images/gpts.png" alt="GPTs" className="w-[18px] h-[18px]" />
          <span>GPTs</span>
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer */}
      <div className="px-3 pb-3 mt-4">
        <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md">
          <span>View plans</span>
        </button>
        <p className="text-xs text-gray-500 px-1 pt-1">
          Unlimited access, team features, and more
        </p>
      </div>
    </div>
  );
};

export default Sidebar;


