import React from 'react';

function WelcomeBanner() {
  return (
    <div className="relative bg-indigo-200 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-1">Good afternoon, Acme Inc. 👋</h1>
      <p>Here is what’s happening with your projects today:</p>
    </div>
  );
}

export default WelcomeBanner;
