import React from 'react';
import 'css/style.css';


// Import pages
import Dashboard from 'components/Dashboard';
import Header from 'components/Header';

function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header />

        <main>
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;
