import React from 'react';

const Header: React.FC = ({ children }) => (
  <header className="sticky top-0 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 z-30">
    <div className="flex items-center justify-between h-16 -mb-px">
      <div className="flex text-2xl text-slate-800 font-bold">{children}</div>
    </div>
  </header>
);

export default Header;
