import React from 'react';
import { Provider } from 'react-redux';
import 'css/style.css';

import store from './App.store';
// Import pages
import Dashboard from 'components/Dashboard';
import Header from 'components/Header';

function App() {
  return (
    <Provider store={store}>
      <div className="flex h-screen overflow-hidden">
        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header>Dashboard.</Header>
          <main>
            <Dashboard />
          </main>
        </div>
      </div>
    </Provider>
  );
}

export default App;
