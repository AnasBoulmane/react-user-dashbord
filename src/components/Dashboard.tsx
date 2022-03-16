import React from 'react';
import useSWR from 'swr';
import WelcomeBanner from './WelcomeBanner';
import DataTable from './DataTable';
import Card from './Card';

function Dashboard() {
  const { data: customers, error } = useSWR('/data');
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Welcome banner */}
      <WelcomeBanner />

      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <h2 className="text-2xl md:text-3xl text-slate-800 font-bold ">Customers ✨</h2>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Add view button */}
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
            <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="xs:block ml-2">Add User</span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6">
        {/* Card (Customers) */}
        <Card title="Customers">
          {!customers && <div className="text-center">loading...</div>}
          {error && <div className="text-center">error</div>}
          {customers && (
            <DataTable
              data={customers}
              columns={[
                {
                  name: 'Id',
                  selector: (row) => row.id,
                },
                {
                  name: 'Name',
                  selector: (row) => row.name,
                },
                {
                  name: 'Username',
                  selector: (row) => row.username,
                },
                {
                  name: 'City',
                  selector: (row) => row.address.city,
                },
                {
                  name: 'Email',
                  selector: (row) => row.email,
                },
              ]}
            />
          )}
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
