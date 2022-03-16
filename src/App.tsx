import React from 'react';
import { SWRConfig } from 'swr';
import 'css/style.css';

// Import pages
import Dashboard from 'components/Dashboard';
import Header from 'components/Header';

const fetcher = (resource, init) => fetch(import.meta.env.VITE_API_BASE_URL + resource, init).then((res) => res.json());

function App() {
  return (
    <SWRConfig
      value={{
        fetcher,
        refreshInterval: 3000,
      }}
    >
      <div className="flex h-screen overflow-hidden">
        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header>Dashboard Inc.</Header>
          <main>
            <Dashboard />
          </main>
        </div>
      </div>
    </SWRConfig>
  );
}

export default App;
